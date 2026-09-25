import type { Metadata } from "next";
import "./globals.css";
import { TuneitProvider } from "@/context/TuneitContext";

export const metadata: Metadata = {
  title: "Tuneez - Find the song that fits your post",
  description: "Find the song that fits your post.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TuneitProvider>{children}</TuneitProvider>
      </body>
    </html>
  );
}
