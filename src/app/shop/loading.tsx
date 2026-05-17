export default function Loading() {
  return (
    <div className="min-h-screen">
      <header className="pt-24 md:pt-32 pb-12 md:pb-16 px-5 md:px-8 border-b border-line">
        <div className="h-3 w-32 bg-surface animate-pulse mb-5" />
        <div className="h-16 w-2/3 max-w-md bg-surface animate-pulse" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 px-5 md:px-8 pt-14 pb-20">
        <aside className="hidden lg:block space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="h-3 w-20 bg-surface animate-pulse mb-4" />
              <div className="space-y-2.5">
                {Array.from({ length: 3 }).map((__, j) => (
                  <div key={j} className="h-3 w-32 bg-surface animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </aside>
        <main>
          <div className="h-11 w-full bg-surface animate-pulse mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-surface animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
