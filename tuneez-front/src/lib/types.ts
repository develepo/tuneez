export type Destination = "story" | "reel";
export type MediaType = "image" | "video";

export type VibeAnalysis = {
  labels: string[];
  mood: string[];
  aesthetic: string[];
  energy: number;
  colors: string[];
};
export type RecommendationSignal = {
  vibeFit: number;
  trend: "rising" | "stable" | "declining";
};

export type Recommendation = {
    id: string;
    title: string;
    artist: string;
    artworkUrl: string;
    previewUrl?: string;
    explanation: string;
    signals: RecommendationSignal;
};

export type RecommendationResponse = {
    requestId: string;
    analysis: VibeAnalysis;
    recommendations: Recommendation[];
};

export type MediaSelection = {
    file: File;
    previewUrl: string;
    type: MediaType;
};
