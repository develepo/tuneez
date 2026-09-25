from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import RecommendationResponse
from app.services.gemini import recommend


app = FastAPI(
    title="Tuneez API",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MAX_FILE_SIZE = 100 * 1024 * 1024

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}


@app.get("/")
async def root():
    return {
        "name": "Tuneez API",
        "status": "ok",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
    }
# http://127.0.0.1:3000/recommend

@app.post(
    "/recommend",
    response_model=RecommendationResponse,
)
async def create_recommendations(
    media: UploadFile = File(...),
    prompt: str = Form(""),
    destination: str = Form("story"),
):
    if destination not in {"story", "reel"}:
        raise HTTPException(
            status_code=400,
            detail="Destination must be 'story' or 'reel'.",
        )

    if media.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=(
                "Only JPEG, PNG and WebP images are supported "
                "right now."
            ),
        )

    image_bytes = await media.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty.",
        )

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File is too large.",
        )

    try:
        result = recommend(
            image_bytes=image_bytes,
            mime_type=media.content_type,
            user_prompt=prompt,
            destination=destination,
        )

        return result

    except Exception as exc:
        print("Recommendation error:", repr(exc))

        raise HTTPException(
            status_code=500,
            detail="Failed to generate recommendations.",
        ) from exc
