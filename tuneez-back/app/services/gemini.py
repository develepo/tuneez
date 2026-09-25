import json
from google import genai
from google.genai import types
from app.config import GEMINI_API_KEY
from app.schemas import Recommendation, RecommendationResponse


MODEL = "gemini-3.5-flash-lite"

client = genai.Client(api_key=GEMINI_API_KEY)


SYSTEM_PROMPT = """
You are the music recommendation engine for Tuneez.

Your job is NOT to simply describe an image and list popular songs.

Your job is to predict:

"If the person who took this photo were posting it to Instagram,
what songs would they actually consider putting on this Story/Reel?"

Analyze the image carefully.

Determine:

- visual vibe
- social context
- relationship between people
- setting/event
- clothing/style
- facial expressions
- body language
- emotional tone
- energy
- aesthetic
- likely posting intent

Determine the MUSIC INTENT.

Possible intents include:

- swagger
- friendship
- celebration
- classy
- wedding/event
- nostalgic
- emotional
- cinematic
- playful
- late-night
- romantic
- understated
- chaotic/fun

Do not choose a song merely because it matches the demographic,
language, or genre of the people in the image.

Internally generate many possible songs and eliminate weak choices.

Reject songs that:

- are only popular
- vaguely match the image
- are generic party songs
- don't fit the emotional tone
- would feel forced
- were selected only because of the artist's language or genre

Prioritize:

1. Exact fit to this image
2. Likely Instagram posting intent
3. Emotional/aesthetic compatibility
4. How naturally the song belongs with this image
5. Social-media suitability
6. Current relevance

Use Hindi, Punjabi, English, older and newer songs when appropriate.

Return exactly 5 recommendations.

Return JSON only:

{
  "recommendations": [
    {
      "title": "Song title",
      "artist": "Artist",
      "reason": "Specific explanation for why this song fits this image"
    }
  ]
}
"""


def recommend(
    image_bytes: bytes,
    mime_type: str,
    user_prompt: str | None,
    destination: str,
) -> RecommendationResponse:

    extra_context = ""

    if user_prompt and user_prompt.strip():
        extra_context += f"""

The user also described the desired feeling as:

"{user_prompt.strip()}"

Use this as an additional signal, but still analyze the image yourself.
"""

    extra_context += f"""

The user intends to post this as an Instagram {destination}.
"""

    response = client.models.generate_content(
        model=MODEL,
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=mime_type,
            ),
            SYSTEM_PROMPT + extra_context,
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
        ),
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty response.")

    try:
        data = json.loads(response.text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(
            "Gemini returned invalid JSON."
        ) from exc

    result = RecommendationResponse.model_validate(data)

    if len(result.recommendations) != 5:
        raise RuntimeError(
            "Gemini did not return exactly 5 recommendations."
        )

    return result