import pytest
from fastapi import HTTPException
from backend.app.core import live_guard

def test_live_trading_is_blocked_by_default(monkeypatch):
    monkeypatch.setattr(live_guard.settings, "live_trading_enabled", False)

    with pytest.raises(HTTPException) as exc:
        live_guard.require_live_trading_permission()

    assert exc.value.status_code == 403
    assert "Live trading is disabled" in exc.value.detail
