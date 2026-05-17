const NAMES = ["Wired", "The Verge", "Engadget", "Hi-Fi News", "Pitchfork"];

export function Press() {
  return (
    <section className="px-5 md:px-8 py-14 md:py-20 border-b border-line">
      <div className="flex justify-between items-baseline gap-6 mb-10 md:mb-12">
        <div className="text-[11px] font-mono text-muted tracking-wider flex items-center gap-2">
          <span className="inline-block w-[5px] h-[5px] rounded-full bg-accent" />
          PRESS &nbsp;/&nbsp; SELECTED
        </div>
        <div className="text-[11px] font-mono text-quiet">2024 — 2026</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 items-center">
        {NAMES.map((name) => (
          <div
            key={name}
            className="text-[clamp(18px,2vw,22px)] text-quiet font-normal tracking-tight hover:text-accent transition-colors duration-300 ease-smooth cursor-default"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
