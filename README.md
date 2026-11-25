# DevPilot AI

DevPilot AI is an autonomous software engineering workspace. This repository currently contains the Phase 1 service foundation only.

## Local development

Prerequisites: Node.js 22.18+, pnpm 9+, Python 3.11+, Docker.

```powershell
pnpm install
pnpm typecheck
pnpm build
docker compose up --build
```

The API health endpoint is available at `http://localhost:4000/health`. The AI service health endpoint is available at `http://localhost:8000/health`.

## Stop local services

Run this in PowerShell from any directory:

```powershell
Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue |
  Where-Object { $_.LocalPort -in 3000,4000,8000,27017,6379 } |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
```

If MongoDB is registered as a Windows service and cannot be stopped normally, open PowerShell as Administrator and run:

```powershell
Stop-Service -Name MongoDB
```

## Service boundaries

- `apps/web`: Next.js user interface.
- `apps/api`: Express application API and future authorization/realtime boundary.
- `services/ai-orchestrator`: FastAPI/LangGraph orchestration service.
- `packages/contracts`: Shared TypeScript contracts.

Authentication, GitHub mutations, model calls, sandbox execution, and pull-request creation are intentionally not implemented in Phase 1.
