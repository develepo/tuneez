type VibeTagsProps = {
labels: string[];
colors: string[];
};

export function VibeTags({
labels,
colors,
}: VibeTagsProps) {
const icons = ["✦", "◌", "⌁", "○", "✧"];

return (
<div className="flex flex-wrap gap-2">
{labels.map((label, index) => {
const color =
colors[index % colors.length] ??
"#8b5cf6";

    return (
      <span
        key={`${label}-${index}`}
        className="rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur"
      >
        <span
          className="mr-1"
          style={{ color }}
        >
          {icons[index % icons.length]}
        </span>

        {label}
      </span>
    );
  })}
</div>
);
}