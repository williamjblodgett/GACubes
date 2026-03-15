"use client";

import { Copy } from "lucide-react";

export default function CopyAddressButton({ address }: { address: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(address)}
      className="flex items-center gap-2 px-5 py-3 bg-surface-secondary text-foreground border border-border rounded-xl text-sm font-medium hover:bg-border transition-colors"
    >
      <Copy size={16} />
      Copy Address
    </button>
  );
}
