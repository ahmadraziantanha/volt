export function Manifesto() {
  return (
    <section className="px-5 md:px-8 py-24 md:py-44 border-b border-line">
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-8">
        <div className="text-[11px] font-mono text-quiet">04 / IX</div>
        <div>
          <p className="text-[clamp(26px,3.8vw,48px)] font-normal leading-[1.18] tracking-[-0.025em] text-text max-w-[1000px]">
            We build audio for people who&nbsp;listen.{" "}
            <span className="text-quiet">
              No gimmicks, no theatre,
            </span>{" "}
            <em className="not-italic text-accent">no compromise</em>
            <span className="text-quiet">
              {" "}— just the recording, the way it was&nbsp;mixed.
            </span>
          </p>

          <div className="mt-10 md:mt-14 flex flex-wrap gap-8 md:gap-14 text-[12px] font-mono text-muted">
            <div>
              <b className="block font-medium text-text mb-1">Founded</b>
              Porto, MMXXIII
            </div>
            <div>
              <b className="block font-medium text-text mb-1">Workshop</b>
              Rua das Flores, 2700–248
            </div>
            <div>
              <b className="block font-medium text-text mb-1">Team</b>
              11 engineers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
