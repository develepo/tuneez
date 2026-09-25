from pydantic import BaseModel, Field


class Recommendation(BaseModel):
    title: str
    artist: str
    reason: str


class RecommendationResponse(BaseModel):
    recommendations: list[Recommendation] = Field(min_length=5, max_length=5)