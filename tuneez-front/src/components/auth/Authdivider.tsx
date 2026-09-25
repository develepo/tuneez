export function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-neutral-200" />

      <span className="text-xs text-neutral-400">
        OR
      </span>

      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}