"use client";

type PromptInputProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

export function PromptInput({
  value,
  onChange,
  maxLength = 180,
}: PromptInputProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <textarea
        id="song-prompt"
        value={value}
        maxLength={maxLength}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. nostalgic, late night, preferably Hindi..."
        className="w-full resize-none bg-transparent px-5 py-4 text-sm leading-6 outline-none placeholder:text-neutral-400"
      />

      <div className="flex justify-end border-t border-neutral-100 px-5 py-2.5">
        <span className="text-[10px] text-neutral-300">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}