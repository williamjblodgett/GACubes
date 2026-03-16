"use client";

import { Share2 } from "lucide-react";
import { useToast } from "./Toast";

interface ShareButtonProps {
  listing: { id: string; name: string; city: string };
  size?: number;
  className?: string;
}

export default function ShareButton({ listing, size = 13, className = "" }: ShareButtonProps) {
  const { showToast } = useToast();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const url = `${window.location.origin}/listing/${listing.id}`;
    const text = `Check out ${listing.name} in ${listing.city}, GA on GACubes`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: listing.name, text, url });
        return;
      } catch {
        // user cancelled or share failed, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Could not copy link");
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`transition-colors text-muted hover:text-foreground ${className}`}
      aria-label="Share listing"
    >
      <Share2 size={size} />
    </button>
  );
}
