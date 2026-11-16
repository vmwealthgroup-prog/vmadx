from __future__ import annotations

from math import isfinite


def calculate_adx(candles: list[dict], period: int = 14) -> list[dict]:
    """Calculate Wilder ADX, +DI and -DI from chronological OHLC candles."""
    if period < 2:
        raise ValueError("ADX period must be at least 2.")
    if len(candles) < 2 * period:
        raise ValueError(f"At least {2 * period} candles are required.")

    highs, lows, closes = [], [], []

    for index, candle in enumerate(candles):
        try:
            high = float(candle["high"])
            low = float(candle["low"])
            close = float(candle["close"])
        except (KeyError, TypeError, ValueError):
            raise ValueError(f"Invalid OHLC data at candle {index}.") from None

        if not all(isfinite(v) for v in (high, low, close)):
            raise ValueError(f"Non-finite OHLC value at candle {index}.")
        if high < low or close < low or close > high:
            raise ValueError(f"Invalid OHLC range at candle {index}.")

        highs.append(high)
        lows.append(low)
        closes.append(close)

    count = len(candles)
    tr = [0.0] * count
    plus_dm = [0.0] * count
    minus_dm = [0.0] * count

    for i in range(1, count):
        up_move = highs[i] - highs[i - 1]
        down_move = lows[i - 1] - lows[i]

        plus_dm[i] = up_move if up_move > down_move and up_move > 0 else 0.0
        minus_dm[i] = down_move if down_move > up_move and down_move > 0 else 0.0

        tr[i] = max(
            highs[i] - lows[i],
            abs(highs[i] - closes[i - 1]),
            abs(lows[i] - closes[i - 1]),
        )

    smooth_tr = sum(tr[1:period + 1])
    smooth_plus = sum(plus_dm[1:period + 1])
    smooth_minus = sum(minus_dm[1:period + 1])

    dx_values: dict[int, float] = {}
    indicator_values: dict[int, dict] = {}

    for i in range(period, count):
        if i > period:
            smooth_tr = smooth_tr - smooth_tr / period + tr[i]
            smooth_plus = smooth_plus - smooth_plus / period + plus_dm[i]
            smooth_minus = smooth_minus - smooth_minus / period + minus_dm[i]

        if smooth_tr == 0:
            plus_di = minus_di = 0.0
        else:
            plus_di = 100.0 * smooth_plus / smooth_tr
            minus_di = 100.0 * smooth_minus / smooth_tr

        denominator = plus_di + minus_di
        dx = (
            100.0 * abs(plus_di - minus_di) / denominator
            if denominator else 0.0
        )
        dx_values[i] = dx
        indicator_values[i] = {
            "plus_di": plus_di,
            "minus_di": minus_di,
        }

    first_adx_index = 2 * period - 1
    if first_adx_index >= count:
        raise ValueError("Not enough candles to calculate the first ADX value.")

    adx = sum(dx_values[i] for i in range(period, first_adx_index + 1)) / period
    results = []

    for i in range(first_adx_index, count):
        if i > first_adx_index:
            adx = ((adx * (period - 1)) + dx_values[i]) / period

        results.append({
            "index": i,
            "timestamp": candles[i].get("timestamp"),
            "plus_di": indicator_values[i]["plus_di"],
            "minus_di": indicator_values[i]["minus_di"],
            "adx": adx,
        })

    return results


def analyze_adx(
    candles: list[dict],
    period: int = 14,
    threshold: float = 15.0,
) -> dict:
    if not isfinite(threshold) or not 0 < threshold <= 100:
        raise ValueError("ADX threshold must be greater than 0 and at most 100.")

    values = calculate_adx(candles, period)
    latest = values[-1]
    previous = values[-2] if len(values) > 1 else None

    crossed_above = (
        previous is not None
        and previous["adx"] <= threshold
        and latest["adx"] > threshold
    )

    signal = "NONE"
    reason = "ADX has not crossed above the configured threshold."

    if crossed_above and latest["plus_di"] > latest["minus_di"]:
        signal = "BUY"
        reason = "ADX crossed above threshold with +DI above -DI."
    elif crossed_above and latest["minus_di"] > latest["plus_di"]:
        signal = "SELL"
        reason = "ADX crossed above threshold with -DI above +DI."
    elif crossed_above:
        reason = "ADX crossed above threshold, but directional indicators are equal."

    return {
        "signal": signal,
        "reason": reason,
        "period": period,
        "threshold": threshold,
        "latest": latest,
        "previous": previous,
        "execution_mode": "paper",
        "order_placed": False,
    }
