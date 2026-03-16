export default function ListingCardSkeleton() {
  return (
    <div className="border border-border rounded-2xl px-4 py-3 bg-surface animate-pulse">
      {/* Row 1: Name */}
      <div className="flex items-center justify-between gap-2">
        <div className="h-4 bg-surface-secondary rounded w-2/3" />
        <div className="h-5 bg-surface-secondary rounded-full w-14" />
      </div>
      {/* Row 2: Address */}
      <div className="h-3 bg-surface-secondary rounded w-4/5 mt-2" />
      {/* Row 3: Tags */}
      <div className="flex gap-1.5 mt-3">
        <div className="h-4 bg-surface-secondary rounded-full w-16" />
        <div className="h-4 bg-surface-secondary rounded-full w-10" />
      </div>
      {/* Row 4: Actions */}
      <div className="flex gap-3 mt-3 pt-2 border-t border-border">
        <div className="h-3 bg-surface-secondary rounded w-16" />
        <div className="h-3 bg-surface-secondary rounded w-8" />
        <div className="h-3 bg-surface-secondary rounded w-14 ml-auto" />
      </div>
    </div>
  );
}
