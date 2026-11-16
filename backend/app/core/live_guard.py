from fastapi import HTTPException, status
from backend.app.core.config import settings

def require_live_trading_permission() -> None:
    if not settings.live_trading_enabled:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Live trading is disabled by VMADX safety settings."
        )
