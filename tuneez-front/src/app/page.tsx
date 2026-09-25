"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PostUploader } from "@/components/upload/PostUploader";
import { useTuneit } from "@/context/TuneitContext";

export default function HomePage() {
  const router = useRouter();
  const { setMedia } = useTuneit();

  const handleMediaSelect = (file: File) => {
    setMedia(file);
    router.push("/uploaded");
  };

  return (
    <main className="min-h-screen bg-[#F8F8F6]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E1306C]" />
            <span className="text-lg font-semibold tracking-[-0.05em] text-[#111111]">Tuneez</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center py-8">
          <h1 className="mb-6 text-2xl font-semibold tracking-[-0.04em] text-[#111111]">
            What are you posting?
          </h1>
          <PostUploader onChange={handleMediaSelect} />
          <p className="mt-4 text-center text-xs text-[#737373]">only images up to 100 MB</p>
        </div>
      </div>
    </main>
  );
}
