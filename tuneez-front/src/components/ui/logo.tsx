"use client";

type LogoProps = {
  color?: string;
};

export function Logo({
  color = "#8b5cf6",
}: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-full transition-colors duration-500"
        style={{ backgroundColor: color }}
      />

      <span className="text-xl font-semibold tracking-[-0.05em]">
        miseet
      </span>
    </div>
  );
}
