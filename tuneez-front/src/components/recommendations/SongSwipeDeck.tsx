"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import type { Recommendation } from "@/context/TuneitContext";

type Props = {
  destination: "story" | "reel";
  mediaUrl: string;
  mediaType: "image" | "video";
  recommendations: Recommendation[];
  onBack: () => void;
  onStartOver: () => void;
};

const SWIPE_THRESHOLD = 120;

export function SongSwipeDeck({
  destination,
  mediaUrl,
  mediaType,
  recommendations,
  onBack,
  onStartOver,
}: Props) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const x = useMotionValue(0);

  const rotate = useTransform(
    x,
    [-350, 0, 350],
    [-10, 0, 10],
  );

  const cardOpacity = useTransform(
    x,
    [-350, -150, 0, 150, 350],
    [0.4, 1, 1, 1, 0.4],
  );

  const recommendation = recommendations[index];

  /*
   * Temporary.
   * Later this will come from your song resolver.
   */
  const audioUrl = "";

  /*
   * Reset audio when changing cards.
   */
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [index]);

  /*
   * Track audio progress.
   */
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      if (
        !audio.duration ||
        !Number.isFinite(audio.duration)
      ) {
        return;
      }

      setProgress(
        (audio.currentTime / audio.duration) * 100,
      );
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener(
        "timeupdate",
        updateProgress,
      );
    };
  }, [index]);

  if (!recommendation) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#F8F8F6] px-5">
        <button
          onClick={onStartOver}
          className="rounded-full bg-[#E1306C] px-6 py-3 text-sm font-semibold text-white"
        >
          Start over
        </button>
      </main>
    );
  }

  /*
   * Go to the next recommendation.
   */
  const next = () => {
    if (index < recommendations.length - 1) {
      setIndex((value) => value + 1);
    } else {
      onStartOver();
    }
  };

  /*
   * Play / pause.
   */
  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio || !audioUrl) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  /*
   * Tinder-style swipe.
   */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: {
      offset: {
        x: number;
        y: number;
      };
    },
  ) => {
    if (Math.abs(info.offset.x) < SWIPE_THRESHOLD) {
      return;
    }

    next();
  };

  /*
   * Seek through the song.
   */
  const handleProgressClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const audio = audioRef.current;

    if (
      !audio ||
      !audio.duration ||
      !Number.isFinite(audio.duration)
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const percentage =
      (event.clientX - rect.left) / rect.width;

    const clamped = Math.max(
      0,
      Math.min(1, percentage),
    );

    audio.currentTime =
      clamped * audio.duration;

    setProgress(clamped * 100);
  };

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#F8F8F6] px-3 py-3 sm:px-5 sm:py-5">
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col sm:min-h-[calc(100dvh-2.5rem)]">

        {/* HEADER */}

        <header className="flex h-10 shrink-0 items-center justify-between px-1">
          <button
            onClick={onBack}
            className="flex min-h-10 items-center gap-2 px-1 text-sm font-medium text-black"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <span className="text-xs font-medium text-neutral-400">
            {index + 1} / {recommendations.length}
          </span>
        </header>

        {/* 9:16 CARD AREA */}

        <div className="flex min-h-0 flex-1 items-center justify-center py-2 sm:py-4">

          <div className="relative w-full max-w-[430px] aspect-[9/16] max-h-[calc(100dvh-6rem)]">

            <AnimatePresence mode="wait">
              <motion.div
                key={`${recommendation.title}-${index}`}
                style={{
                  x,
                  rotate,
                  opacity: cardOpacity,
                  touchAction: "pan-y",
                }}
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.7}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                initial={{
                  scale: 0.96,
                  opacity: 0,
                  x: 60,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -220,
                }}
                transition={{
                  duration: 0.22,
                }}
                className="absolute inset-0 overflow-hidden rounded-[26px] bg-black shadow-2xl sm:rounded-[30px]"
              >

                {/* MEDIA */}

                <div className="relative h-full w-full">

                  {mediaType === "video" ? (
                    <video
                      src={mediaUrl}
                      className="h-full w-full object-cover"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt="Your post"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  )}

                  {/* BOTTOM GRADIENT */}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/70 to-transparent" />

                  {/* SONG CONTENT */}

                  <div className="absolute inset-x-0 bottom-0 p-5 pb-5 text-white sm:p-6">

                    {/* DESTINATION */}

                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">
                      Your {destination}
                    </p>

                    {/* TITLE */}

                    <h1 className="mt-1.5 line-clamp-2 text-[23px] font-semibold leading-tight sm:text-[25px]">
                      {recommendation.title}
                    </h1>

                    {/* ARTIST */}

                    <p className="mt-1 text-sm text-white/65">
                      {recommendation.artist}
                    </p>

                    {/* PROGRESS BAR */}

                    <div className="mt-4">
                      <div
                        onPointerDown={(event) =>
                          event.stopPropagation()
                        }
                        onClick={handleProgressClick}
                        className="h-5 cursor-pointer touch-none py-2"
                      >
                        <div className="relative h-[3px] w-full rounded-full bg-white/25">

                          <div
                            className="absolute left-0 top-0 h-full rounded-full bg-white"
                            style={{
                              width: `${progress}%`,
                            }}
                          />

                          <div
                            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white"
                            style={{
                              left: `calc(${progress}% - 5px)`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-0.5 flex justify-between text-[9px] text-white/40">
                        <span>0:00</span>
                        <span>—</span>
                      </div>
                    </div>

                    {/* PLAY + ADD BUTTON */}

                    <div className="mt-3 flex gap-3">

                      {/* PLAY */}

                      <button
                        onPointerDown={(event) =>
                          event.stopPropagation()
                        }
                        onClick={(event) => {
                          event.stopPropagation();
                          togglePlayback();
                        }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform active:scale-95"
                        aria-label={
                          isPlaying
                            ? "Pause"
                            : "Play"
                        }
                      >
                        {isPlaying ? (
                          <Pause
                            size={18}
                            fill="currentColor"
                          />
                        ) : (
                          <Play
                            size={18}
                            fill="currentColor"
                            className="ml-0.5"
                          />
                        )}
                      </button>

                      {/* ADD TO STORY / REEL */}

                      <button
                        onPointerDown={(event) =>
                          event.stopPropagation()
                        }
                        onClick={(event) => {
                          event.stopPropagation();

                          /*
                           * Temporary:
                           * move to the next recommendation.
                           *
                           * Later this becomes the actual
                           * "Add to Story/Reel" action.
                           */
                          next();
                        }}
                        className="h-12 min-w-0 flex-1 rounded-full bg-[#E1306C] px-4 text-sm font-semibold text-white shadow-lg transition-transform active:scale-[0.98]"
                      >
                        Add to{" "}
                        {destination === "story"
                          ? "Story"
                          : "Reel"}
                      </button>

                    </div>
                  </div>

                </div>

                {/* AUDIO */}

                {audioUrl && (
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                )}

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* SWIPE HINT */}

        <div className="flex h-8 shrink-0 items-center justify-center">
          <p className="text-[11px] text-neutral-400">
            Swipe for another song
          </p>
        </div>

      </div>
    </main>
  );
}