from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from app.config import get_groq_api_key, get_groq_model
from app.providers import generate_text

app = FastAPI(title="DevPilot AI Orchestrator", version="0.1.0")


class ChatRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=100_000)
    system_prompt: str = "You are a helpful software engineering assistant."


class ChatResponse(BaseModel):
    provider: str = "groq"
    model: str
    content: str


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "ai-orchestrator"}


@app.get("/ready")
def ready() -> dict[str, str]:
    return {"status": "ready", "service": "ai-orchestrator"}


@app.get("/provider")
def provider_status() -> dict[str, str | bool]:
    try:
        get_groq_api_key()
        configured = True
    except RuntimeError:
        configured = False
    return {
        "provider": "groq",
        "model": get_groq_model(),
        "configured": configured,
    }


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        content = generate_text(request.prompt, request.system_prompt)
        return ChatResponse(model=get_groq_model(), content=content)
    except (RuntimeError, ValueError) as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=502, detail=f"Groq request failed: {error}") from error
