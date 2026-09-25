import type { ReactNode } from "react";
import Link from "next/link";

type AuthShellProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  mode: "login" | "signup";
};

export function AuthShell({
  children,
  title,
  subtitle,
  mode,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-8">
      <div className="mx-auto w-full max-w-md">
        {/* Logo */}
        <div className="mb-16">
          <Link
            href="/"
            aria-label="tuneit home"
            className="inline-flex items-center"
          >
            <span className="text-xl font-semibold tracking-[-0.05em]">
              tuneit
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">
            {title}
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            {subtitle}
          </p>
        </div>

        {/* Form */}
        {children}

        {/* Switch */}
        <div className="mt-8 text-center text-sm text-neutral-500">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-black underline-offset-4 hover:underline"
              >
                Create one
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-black underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </>
          )}
        </div>

        <p className="mt-8 text-center text-[11px] leading-5 text-neutral-400">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </main>
  );
}