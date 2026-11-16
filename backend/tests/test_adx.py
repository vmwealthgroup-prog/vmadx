import pytest

from backend.app.strategies.adx import analyze_adx, calculate_adx


def rising_candles(count=40):
    return [
        {
            "timestamp": f"bar-{i}",
            "high": 102.0 + i,
            "low": 100.0 + i,
            "close": 101.0 + i,
        }
        for i in range(count)
    ]


def breakout_candles():
    candles = [
        {
            "timestamp": f"bar-{i}",
            "high": 101.0,
            "low": 99.0,
            "close": 100.0,
        }
        for i in range(6)
    ]

    # The final candle creates the upward directional movement.
    candles.append({
        "timestamp": "bar-6",
        "high": 103.0,
        "low": 101.0,
        "close": 102.0,
    })
    return candles


def test_adx_calculates_directional_indicators():
    result = calculate_adx(rising_candles(), period=3)

    assert result
    assert result[-1]["plus_di"] > result[-1]["minus_di"]
    assert result[-1]["adx"] == pytest.approx(100.0)


def test_adx_analysis_returns_buy_on_threshold_cross():
    result = analyze_adx(breakout_candles(), period=3, threshold=15)

    assert result["signal"] == "BUY"
    assert result["execution_mode"] == "paper"
    assert result["order_placed"] is False


def test_adx_rejects_insufficient_candles():
    with pytest.raises(ValueError, match="At least"):
        calculate_adx(rising_candles(5), period=3)


def test_adx_rejects_invalid_ohlc():
    candles = rising_candles()
    candles[5] = {"high": 10, "low": 12, "close": 11}

    with pytest.raises(ValueError, match="Invalid OHLC"):
        calculate_adx(candles, period=3)


def test_adx_rejects_invalid_threshold():
    with pytest.raises(ValueError, match="threshold"):
        analyze_adx(rising_candles(), period=3, threshold=0)


def test_adx_analysis_returns_sell_on_downward_threshold_cross():
    candles = [
        {
            "timestamp": f"bar-{i}",
            "high": 101.0,
            "low": 99.0,
            "close": 100.0,
        }
        for i in range(6)
    ]

    candles.append({
        "timestamp": "bar-6",
        "high": 99.0,
        "low": 97.0,
        "close": 98.0,
    })

    result = analyze_adx(candles, period=3, threshold=15)

    assert result["signal"] == "SELL"
    assert result["latest"]["minus_di"] > result["latest"]["plus_di"]
    assert result["execution_mode"] == "paper"
    assert result["order_placed"] is False


def test_adx_does_not_repeat_signal_without_new_threshold_cross():
    result = analyze_adx(rising_candles(), period=3, threshold=15)

    assert result["latest"]["adx"] > 15
    assert result["previous"]["adx"] > 15
    assert result["signal"] == "NONE"
    assert result["order_placed"] is False
