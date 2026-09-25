"use client";

import type {
  Destination,
  Recommendation,
} from "@/lib/types";

type RecommendationCardProps = {
  recommendation: Recommendation;
  rank: number;
  colors: string[];
  onDestinationSelect?: (
    destination: Destination
  ) => void;
};

export function RecommendationCard({
  recommendation,
  rank,
  colors,
  onDestinationSelect,
}: RecommendationCardProps) {
  const primary = colors[0] || "#8b5cf6";
  const secondary = colors[1] || "#ec4899";
  const tertiary = colors[2] || "#f97316";

  return (
    <article className="group flex items-center gap-4 rounded-[1.5rem] border border-white/70 bg-white/65 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg">
      
      {/* Album artwork */}
      <div
        className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl"
        style={{
          background: `linear-gradient(
            135deg,
            ${primary},
            ${secondary},
            ${tertiary}
          )`,
        }}
      >
        {recommendation.artworkUrl ? (
          <img
            src={recommendation.artworkUrl}
            alt={`${recommendation.title} artwork`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="relative text-xl text-white">
            ♪
          </span>
        )}
      </div>

      {/* Song information */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs text-neutral-400">
            #{rank}
          </span>

          {recommendation.signals.trend === "rising" && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                color: primary,
                backgroundColor: `${primary}15`,
              }}
            >
              RISING
            </span>
          )}
        </div>

        <h3 className="truncate font-medium text-black">
          {recommendation.title}
        </h3>

        <p className="truncate text-sm text-neutral-400">
          {recommendation.artist}
        </p>

        {recommendation.explanation && (
          <p className="mt-2 hidden text-xs leading-5 text-neutral-400 sm:block">
            {recommendation.explanation}
          </p>
        )}
      </div>

      {/* Vibe fit */}
      <div className="hidden min-w-[70px] text-center sm:block">
        <p
          className="text-sm font-semibold"
          style={{ color: primary }}
        >
          {recommendation.signals.vibeFit}
        </p>

        <p className="mt-0.5 text-[10px] uppercase tracking-wider text-neutral-400">
          vibe fit
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col gap-2">
        <button
          type="button"
          onClick={() => {
            onDestinationSelect?.("story");
          }}
          className="rounded-full px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
          style={{
            background: `linear-gradient(
              100deg,
              ${primary},
              ${secondary}
            )`,
          }}
        >
          Story
        </button>

        <button
          type="button"
          onClick={() => {
            onDestinationSelect?.("reel");
          }}
          className="rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-xs font-medium text-black transition hover:border-neutral-400 hover:bg-white"
        >
          Reel
        </button>
      </div>
    </article>
  );
}
