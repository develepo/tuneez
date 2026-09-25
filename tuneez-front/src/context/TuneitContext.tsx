"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Destination = "story" | "reel";

export type Recommendation = {
  title: string;
  artist: string;
  reason: string;
};

type TuneitContextValue = {
  media: File | null;
  mediaUrl: string | null;
  mediaType: "image" | "video" | null;

  prompt: string;
  destination: Destination;

  recommendations: Recommendation[];
  isLoadingRecommendations: boolean;
  recommendationError: string | null;

  setMedia: (file: File) => void;
  setPrompt: (value: string) => void;
  setDestination: (value: Destination) => void;

  generateRecommendations: () => Promise<void>;

  clearMedia: () => void;
};

const TuneitContext =
  createContext<TuneitContextValue | null>(null);

export function TuneitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [media, setMediaState] =
    useState<File | null>(null);

  const [mediaUrl, setMediaUrl] =
    useState<string | null>(null);

  const [prompt, setPrompt] = useState("");

  const [destination, setDestination] =
    useState<Destination>("story");

  const [recommendations, setRecommendations] =
    useState<Recommendation[]>([]);

  const [
    isLoadingRecommendations,
    setIsLoadingRecommendations,
  ] = useState(false);

  const [
    recommendationError,
    setRecommendationError,
  ] = useState<string | null>(null);

  const mediaType =
    media?.type.startsWith("video/")
      ? "video"
      : media?.type.startsWith("image/")
        ? "image"
        : null;

  useEffect(() => {
    if (!media) {
      setMediaUrl(null);
      return;
    }

    const url = URL.createObjectURL(media);

    setMediaUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [media]);

  const setMedia = (file: File) => {
    setMediaState(file);
    setRecommendations([]);
    setRecommendationError(null);
  };

  const clearMedia = () => {
    setMediaState(null);
    setMediaUrl(null);
    setRecommendations([]);
    setRecommendationError(null);
    setPrompt("");
  };

  const generateRecommendations = async () => {
    if (!media) {
      throw new Error("No media selected.");
    }

    if (mediaType !== "image") {
      throw new Error(
        "Video recommendations are not enabled yet.",
      );
    }

    setIsLoadingRecommendations(true);
    setRecommendationError(null);
    setRecommendations([]);

    try {
      const formData = new FormData();

      formData.append("media", media);
      formData.append("prompt", prompt);
      formData.append("destination", destination);

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "http://127.0.0.1:8000";

      const response = await fetch(
        `${baseUrl}/recommend`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Failed to generate recommendations.",
        );
      }

      setRecommendations(data.recommendations);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setRecommendationError(message);

      throw error;
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const value = useMemo(
    () => ({
      media,
      mediaUrl,
      mediaType,

      prompt,
      destination,

      recommendations,
      isLoadingRecommendations,
      recommendationError,

      setMedia,
      setPrompt,
      setDestination,

      generateRecommendations,
      clearMedia,
    }),
    [
      media,
      mediaUrl,
      mediaType,
      prompt,
      destination,
      recommendations,
      isLoadingRecommendations,
      recommendationError,
    ],
  );

  return (
    <TuneitContext.Provider value={value}>
      {children}
    </TuneitContext.Provider>
  );
}

export function useTuneit() {
  const context = useContext(TuneitContext);

  if (!context) {
    throw new Error(
      "useTuneit must be used inside TuneitProvider.",
    );
  }

  return context;
}