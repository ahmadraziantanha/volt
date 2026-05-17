const CELLS = [
  {
    num: "4",
    unit: "Hz",
    label: "FREQUENCY FLOOR",
    body: "Sub-bass extension below the threshold of hearing. You feel it before you hear it.",
  },
  {
    num: "−32",
    unit: "dB",
    label: "ADAPTIVE ANC",
    body: "Six microphones, 48 kHz sampling. The cabin profiles your environment 200 times per second.",
  },
  {
    num: "50",
    unit: "h",
    label: "CONTINUOUS PLAYBACK",
    body: "USB-C fast charge restores ten hours of playback in fifteen minutes. Tested at full volume.",
  },
];

export function Engineering() {
  return (
    <section className="px-5 md:px-8 pb-20 md:pb-28 border-b border-line">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {CELLS.map((cell, i) => (
          <div
            key={cell.label}
            className={
              "py-8 md:py-10 md:pr-8 " +
              (i < CELLS.length - 1
                ? "border-b md:border-b-0 md:border-r border-line " +
                  (i > 0 ? "md:pl-8" : "")
                : "md:pl-8")
            }
          >
            <div className="text-[clamp(72px,11vw,160px)] font-normal tracking-tightest leading-[0.9] text-text mb-6">
              {cell.num}
              <sup className="text-[0.32em] font-medium align-top ml-1 tracking-normal text-accent">
                {cell.unit}
              </sup>
            </div>
            <div className="text-[11px] font-mono text-muted mb-2 tracking-wider">{cell.label}</div>
            <p className="text-sm text-body leading-relaxed max-w-[280px]">{cell.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
