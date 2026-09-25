export function RecommendationSkeleton() {
return (
<div className="space-y-3" aria-live="polite">
{[1, 2, 3, 4].map((item) => (
<div key={item} className="flex animate-pulse items-center gap-4 rounded-[1.5rem] border border-white/70 bg-white/60 p-4" >
<div className="h-16 w-16 shrink-0 rounded-xl bg-neutral-200" />

      <div className="flex-1">
        <div className="h-3 w-16 rounded bg-neutral-200" />
        <div className="mt-3 h-4 w-32 rounded bg-neutral-200" />
        <div className="mt-2 h-3 w-24 rounded bg-neutral-200" />
      </div>

      <div className="hidden h-8 w-20 rounded-full bg-neutral-200 sm:block" />
    </div>
  ))}
</div>);}