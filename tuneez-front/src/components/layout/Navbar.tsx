"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";

type NavbarProps = {
  accentColor?: string;
};

export function Navbar({
  accentColor = "#E1306C",
}: NavbarProps) {
  return (
    <nav className="relative z-20 mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
      <Link href="/" aria-label="tuneit home">
        <Logo color={accentColor} />
      </Link>

      <Link
        href="/login"
        className="text-sm font-medium text-[#E1306C] transition hover:opacity-70"
      >
        Sign in
      </Link>
    </nav>
  );
}
