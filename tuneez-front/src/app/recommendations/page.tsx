"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SongSwipeDeck } from "@/components/recommendations/SongSwipeDeck";
import { useTuneit } from "@/context/TuneitContext";

export default function RecommendationsPage() {
  const router = useRouter();

  const {
    mediaUrl,
    mediaType,
    destination,
    recommendations,
    isLoadingRecommendations,
    recommendationError,
  } = useTuneit();

  useEffect(() => {
    if (!mediaUrl || !mediaType) {
      router.replace("/");
    }
  }, [mediaUrl, mediaType, router]);

  if (!mediaUrl || !mediaType) {
    return null;
  }

  if (isLoadingRecommendations) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F8F6]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-[#E1306C]" />

          <p className="mt-4 text-sm text-neutral-500">
            Finding your songs...
          </p>
        </div>
      </main>
    );
  }

  if (recommendationError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F8F6] px-5">
        <div className="w-full max-w-md text-center">
          <h1 className="text-xl font-semibold">
            Something went wrong.
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            {recommendationError}
          </p>

          <button
            onClick={() => router.push("/uploaded")}
            className="mt-6 rounded-full bg-[#E1306C] px-6 py-3 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <SongSwipeDeck
      destination={destination}
      mediaUrl={mediaUrl}
      mediaType={mediaType}
      recommendations={recommendations}
      onBack={() => router.push("/uploaded")}
      onStartOver={() => router.push("/")}
    />
  );
}