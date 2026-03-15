"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity ${className}`}
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
}
