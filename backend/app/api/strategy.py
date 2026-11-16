from fastapi import APIRouter, HTTPException

from backend.app.schemas.adx import ADXAnalysisRequest
from backend.app.strategies.adx import analyze_adx

router = APIRouter(prefix="/api/strategy", tags=["Strategy"])


@router.post("/adx/analyze")
async def analyze_adx_strategy(request: ADXAnalysisRequest):
    """Analyze supplied closed candles. This endpoint never places orders."""
    try:
        result = analyze_adx(
            candles=[candle.model_dump() for candle in request.candles],
            period=request.period,
            threshold=request.threshold,
        )
        return result
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
