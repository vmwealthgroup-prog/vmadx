from pydantic import BaseModel, ConfigDict, Field, model_validator


class OHLC(BaseModel):
    model_config = ConfigDict(extra="forbid", allow_inf_nan=False)

    timestamp: str | None = None
    high: float = Field(gt=0)
    low: float = Field(gt=0)
    close: float = Field(gt=0)

    @model_validator(mode="after")
    def validate_price_range(self):
        if self.high < self.low or not self.low <= self.close <= self.high:
            raise ValueError("Expected high >= close >= low.")
        return self


class ADXAnalysisRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    candles: list[OHLC] = Field(min_length=4, max_length=2000)
    period: int = Field(default=14, ge=2, le=100)
    threshold: float = Field(default=15.0, gt=0, le=100)

    @model_validator(mode="after")
    def validate_candle_count(self):
        if len(self.candles) < 2 * self.period:
            raise ValueError(
                f"At least {2 * self.period} candles are required "
                "for the selected ADX period."
            )
        return self
