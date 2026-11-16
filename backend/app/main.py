from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.app.api.auth import router as auth_router
from backend.app.core.config import settings
from backend.app.db.session import close_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await close_db()


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan,
)

app.include_router(auth_router)


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "application": settings.app_name,
        "execution_mode": "paper",
        "live_trading_enabled": False,
    }
