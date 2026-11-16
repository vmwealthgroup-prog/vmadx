# VMADX

Independent algorithmic trading research and execution platform.

## Product scope
- ADX strategy only.
- Kotak Neo broker only.
- Paper trading first.
- Live trading disabled until validation and explicit authorization.

## Architecture
- Frontend: Next.js, React, TypeScript.
- Backend: Python FastAPI.
- Database: PostgreSQL.
- Migrations: Alembic.

## Core product modules
- Public landing page.
- Secure login and registration.
- User dashboard.
- ADX strategy configuration and signals.
- Kotak Neo connection management.
- Paper orders, positions and P&L.
- Risk management and audit logs.
- Backtesting and performance reports.

## Engineering rules
- VMADX is an independent codebase.
- Existing repositories are reference sources only.
- Reuse individual components only after inspection.
- Never copy an entire existing project.
- Preserve VMADX code and Git history.
- Never commit secrets or broker credentials.
- Live order execution must remain disabled by default.
- Test before deployment.
