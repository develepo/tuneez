"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTuneit } from "@/context/TuneitContext";
import { PromptInput } from "@/components/upload/PromptInput";
import { MediaFrame } from "@/components/layout/MediaFrame";

export default function UploadedPage() {
  const router = useRouter();

  const {
    media,
    mediaUrl,
    mediaType,
    prompt,
    destination,
    setPrompt,
    setDestination,
    clearMedia,
    generateRecommendations,
  } = useTuneit();

  const [isFindingSongs, setIsFindingSongs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!media || !mediaUrl || !mediaType) {
      router.replace("/");
    }
  }, [media, mediaUrl, mediaType, router]);

  if (!media || !mediaUrl || !mediaType) {
    return null;
  }

  const handleChange = () => {
    clearMedia();
    router.push("/");
  };

  const handleFindSongs = async () => {
    if (isFindingSongs) return;

    setError(null);
    setIsFindingSongs(true);

    try {
      await generateRecommendations();
      router.push("/recommendations");
    } catch (err) {
      console.error("Recommendation error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsFindingSongs(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F8F6] px-5 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col">

        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleChange}
            className="text-sm font-medium text-neutral-700 transition-opacity hover:opacity-60"
          >
            Change
          </button>

          <div className="text-lg font-semibold tracking-tight text-[#111111]">
            Tuneez
          </div>

          <div className="w-[52px]" />
        </header>

        {/* Media preview */}
        <div className="mt-6 flex justify-center">
          <MediaFrame>
            {mediaType === "video" ? (
              <video
                src={mediaUrl}
                className="h-full w-full object-cover"
                controls
                playsInline
              />
            ) : (
              <img
                src={mediaUrl}
                alt="Selected post"
                className="h-full w-full object-cover"
              />
            )}
          </MediaFrame>
        </div>

        {/* Prompt */}
        <section className="mt-8">
          <h1 className="text-xl font-semibold tracking-tight text-[#111111]">
            What should it feel like?
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Give Tuneez a little direction, or leave it blank.
          </p>

          <div className="mt-4">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
            />
          </div>
        </section>

        {/* Story / Reel */}
        <section className="mt-6">
          <p className="mb-2 text-sm font-medium text-[#111111]">
            Where are you posting?
          </p>

          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-neutral-100 p-1">

            <button
              type="button"
              onClick={() => setDestination("story")}
              className={[
                "rounded-xl py-3 text-sm font-medium transition-all",
                destination === "story"
                  ? "bg-white text-[#E1306C] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700",
              ].join(" ")}
            >
              Story
            </button>

            <button
              type="button"
              onClick={() => setDestination("reel")}
              className={[
                "rounded-xl py-3 text-sm font-medium transition-all",
                destination === "reel"
                  ? "bg-white text-[#E1306C] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700",
              ].join(" ")}
            >
              Reel
            </button>

          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm leading-5 text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Find songs */}
        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={handleFindSongs}
            disabled={isFindingSongs}
            className="flex w-full items-center justify-center rounded-2xl bg-[#E1306C] py-4 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFindingSongs ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Finding songs...
              </span>
            ) : (
              "Find songs"
            )}
          </button>
        </div>

      </div>
    </main>
  );
}