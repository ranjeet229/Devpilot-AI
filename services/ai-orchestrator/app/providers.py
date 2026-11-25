from groq import Groq

from app.config import get_groq_api_key, get_groq_model


def generate_text(prompt: str, system_prompt: str = "You are a helpful software engineering assistant.") -> str:
    if not prompt.strip():
        raise ValueError("Prompt cannot be empty")

    client = Groq(api_key=get_groq_api_key())
    completion = client.chat.completions.create(
        model=get_groq_model(),
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        temperature=0.2,
    )

    content = completion.choices[0].message.content
    if not content:
        raise RuntimeError("Groq returned an empty completion")
    return content
