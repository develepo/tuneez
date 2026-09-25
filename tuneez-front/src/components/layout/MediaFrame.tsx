"use client";

import type { ReactNode } from "react";

type MediaFrameProps = {
  children: ReactNode;
  className?: string;
};

export function MediaFrame({
  children,
  className = "",
}: MediaFrameProps) {
  return (
    <div
      className={`relative aspect-[9/16] w-full max-w-[390px] overflow-hidden rounded-[34px] bg-black shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}
