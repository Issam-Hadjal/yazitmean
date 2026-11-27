from fastapi import FastAPI

app = FastAPI(
    title="YazItMean API",
    description="Backend API for the YazItMean conversation intelligence platform.",
    version="0.1.0",
)


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "yazitmean-api",
    }
