"use client";

import { useRef, useState } from "react";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ACCENT = "#E1306C";

type PostUploaderProps = {
  onChange: (file: File) => void;
};

export function PostUploader({
  onChange,
}: PostUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  function selectFile(file?: File) {
    if (!file) return;

    setError("");

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setError("Choose a photo.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The file must be smaller than 100MB.");
      return;
    }

    onChange(file);
  }

  function openPicker() {
    inputRef.current?.click();
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={openPicker}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            selectFile(event.dataTransfer.files?.[0]);
          }}
          className={`group relative flex aspect-[9/16] w-full max-w-[390px] flex-col items-center justify-center overflow-hidden rounded-[34px] border bg-white transition-all duration-200 ${
            dragging
              ? "border-[#E1306C] bg-[#E1306C]/[0.03] shadow-[0_0_0_4px_rgba(225,48,108,0.08)]"
              : "border-black/10 hover:border-black/20 hover:shadow-xl"
          }`}
        >
          {/* subtle brand details */}
          <div
            className={`absolute left-[12%] top-[15%] h-20 w-20 rounded-[26px] rotate-[-12deg] transition-transform duration-500 ${
              dragging
                ? "scale-110 rotate-[-5deg]"
                : "group-hover:scale-105 group-hover:rotate-[-7deg]"
            }`}
            style={{
              backgroundColor: "rgba(225,48,108,0.07)",
            }}
          />

          <div
            className={`absolute right-[13%] top-[22%] h-12 w-12 rounded-full transition-transform duration-500 ${
              dragging
                ? "scale-125"
                : "group-hover:scale-110"
            }`}
            style={{
              backgroundColor: "rgba(225,48,108,0.10)",
            }}
          />

          <div
            className={`absolute bottom-[15%] right-[14%] h-24 w-24 rounded-full rotate-[14deg] transition-transform duration-500 ${
              dragging
                ? "scale-110"
                : "group-hover:scale-105"
            }`}
            style={{
              backgroundColor: "rgba(225,48,108,0.05)",
            }}
          />

          <div
            className={`absolute bottom-[22%] left-[17%] h-10 w-10 rounded-xl rotate-[-20deg] transition-transform duration-500 ${
              dragging ? "scale-110" : ""
            }`}
            style={{
              backgroundColor: "rgba(225,48,108,0.08)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-8 text-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full text-[38px] font-light text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
              style={{
                backgroundColor: ACCENT,
              }}
            >
              +
            </div>

            <p className="mt-6 text-sm font-medium text-[#111111]">
              + Add a photo
            </p>

            <p className="mt-2 max-w-[220px] text-xs leading-5 text-neutral-400">
              Drop it here or choose one from your device
            </p>
          </div>
        </button>
      </div>

      {error && (
        <p className="mt-3 text-center text-xs text-red-500">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(event) => {
          selectFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
}
