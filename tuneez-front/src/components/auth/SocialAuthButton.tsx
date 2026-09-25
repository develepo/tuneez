"use client";

type Provider = "google" | "apple";

type SocialAuthButtonProps = {
  provider: Provider;
  onClick?: () => void;
};

export function SocialAuthButton({
  provider,
  onClick,
}: SocialAuthButtonProps) {
  const isGoogle = provider === "google";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-neutral-200 bg-white px-5 text-sm font-medium transition hover:border-neutral-400 hover:shadow-sm"
    >
      {isGoogle ? (
        <span className="text-lg font-semibold">
          G
        </span>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.7 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2 .9 0 1.6-.6 2.9-.6s1.7.6 2.8.6c1.2 0 1.9-1 2.6-2 .8-1.1 1.1-2.3 1.1-2.4-.1 0-2.1-.8-2.1-3.2zm-2.2-6.5c.6-.8 1-1.8.9-2.8-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.5 2.7-1.2z" />
        </svg>
      )}

      Continue with {isGoogle ? "Google" : "Apple"}
    </button>
  );
}