export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 px-5 md:px-8 pt-24 md:pt-32 pb-14 md:pb-20 min-h-screen">
      <div className="grid gap-3">
        <div className="aspect-square bg-surface animate-pulse" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-surface animate-pulse" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-3 w-32 bg-surface animate-pulse" />
        <div className="h-14 w-3/4 bg-surface animate-pulse" />
        <div className="h-4 w-full bg-surface animate-pulse" />
        <div className="h-4 w-5/6 bg-surface animate-pulse" />
        <div className="h-12 w-1/3 bg-surface animate-pulse mt-12" />
        <div className="h-12 w-full bg-surface animate-pulse mt-8" />
      </div>
    </div>
  );
}
