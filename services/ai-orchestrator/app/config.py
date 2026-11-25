import os
from pathlib import Path

from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[3]
load_dotenv(PROJECT_ROOT / ".env")


def get_groq_api_key() -> str:
    value = os.getenv("GROQ_API_KEY", "").strip()
    if not value:
        raise RuntimeError("GROQ_API_KEY is not configured")
    return value


def get_groq_model() -> str:
    return os.getenv("GROQ_MODEL", "openai/gpt-oss-20b").strip()
