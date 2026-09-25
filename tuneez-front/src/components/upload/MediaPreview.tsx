"use client";

import { Button } from "@/components/ui/button";
import type { MediaSelection } from "@/lib/types";

type MediaPreviewProps = {
media: MediaSelection;
onRemove: () => void;
};

export function MediaPreview({
media,
onRemove,
}: MediaPreviewProps) {
return (
<div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-xl backdrop-blur">
<div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-neutral-100">
{media.type === "video" ? (
<video src={media.previewUrl} controls playsInline className="relative max-h-[520px] max-w-full rounded-xl object-contain shadow-2xl" />
) : (
<img src={media.previewUrl} alt="Selected post" className="relative max-h-[520px] max-w-full rounded-xl object-contain shadow-2xl" />
)}
</div>

  <div className="flex items-center justify-between gap-4 border-t border-white/70 p-5">
    <div className="min-w-0">
      <p className="truncate text-sm font-medium">
        {media.file.name}
      </p>

      <p className="mt-1 text-xs text-neutral-400">
        {(media.file.size / 1024 / 1024).toFixed(2)} MB
      </p>
    </div>

    <Button
      type="button"
      variant="ghost"
      onClick={onRemove}
      className="px-2 py-1"
    >
      Change
    </Button>
  </div>
</div>);}