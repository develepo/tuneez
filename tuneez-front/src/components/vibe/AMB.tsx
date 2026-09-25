type AmbientBackgroundProps = {
colors: string[];
};

export function AmbientBackground({
colors,
}: AmbientBackgroundProps) {
const [primary, secondary, tertiary] = colors;

return (
<div
aria-hidden="true"
className="pointer-events-none fixed inset-0 -z-10 opacity-70 blur-3xl transition-all duration-1000"
style={{
background: `           radial-gradient(
            circle at 20% 20%,
            ${primary ?? "#8b5cf6"}55 0%,
            transparent 35%
          ),
          radial-gradient(
            circle at 80% 30%,
            ${secondary ?? "#ec4899"}44 0%,
            transparent 35%
          ),
          radial-gradient(
            circle at 50% 90%,
            ${tertiary ?? "#f97316"}38 0%,
            transparent 40%
          )
        `,
}}
/>
);
}
