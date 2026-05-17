import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[760px] overflow-hidden">
      {/* Background image with slow ken-burns drift */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=2400&q=85')",
            filter: "brightness(0.78) contrast(1.08) saturate(0.92)",
          }}
          aria-hidden
        />
      </div>

      {/* Triple-gradient: top fade, vertical body, bottom darkening */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.15) 22%, rgba(10,10,10,0) 50%, rgba(10,10,10,0.85) 92%, rgba(10,10,10,1) 100%), linear-gradient(90deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 55%)",
        }}
        aria-hidden
      />

      {/* Top-left: status indicator */}
      <div className="absolute top-24 md:top-28 left-5 md:left-8 z-[3] hero-rise hero-rise-1">
        <div className="flex items-center gap-2.5 text-[10.5px] font-mono text-muted tracking-[0.22em]">
          <span className="relative inline-flex w-[6px] h-[6px]">
            <span className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping" />
            <span className="relative inline-block w-[6px] h-[6px] rounded-full bg-accent" />
          </span>
          NOW&nbsp;SHIPPING
        </div>
      </div>

      {/* Top-right: edition marker */}
      <div className="absolute top-24 md:top-28 right-5 md:right-8 text-right z-[3] hero-rise hero-rise-1">
        <div className="text-[10.5px] font-mono text-text tracking-[0.22em] mb-1">
          FIELD&nbsp;PRO
        </div>
        <div className="text-[10.5px] font-mono text-muted tracking-[0.22em]">
          MMXXVI&nbsp;·&nbsp;ED.&nbsp;004
        </div>
      </div>

      {/* Headline + content block — bottom-aligned, generous gap */}
      <div className="relative z-[3] h-full flex flex-col justify-end px-5 md:px-8 pb-12 md:pb-20">
        <div className="hero-rise hero-rise-2">
          <h1 className="text-[clamp(72px,13vw,196px)] font-medium text-text leading-[0.86] tracking-[-0.06em] mb-10 md:mb-14 max-w-[1400px]">
            Reference,
            <br />
            <span className="font-light text-body italic-0">untethered<span className="text-accent">.</span></span>
          </h1>
        </div>

        <div className="hero-rise hero-rise-3 pt-10 md:pt-14 border-t border-line-2/80">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div className="max-w-[420px]">
              <div className="text-[10.5px] font-mono text-muted tracking-[0.24em] mb-4">
                A&nbsp;/&nbsp;NEW&nbsp;FLAGSHIP
              </div>
              <p className="text-[14px] md:text-[15px] text-body leading-[1.65]">
                Fifty hours of mastering-grade playback. Forty-millimeter
                dynamic drivers tuned in our Porto room. Six microphones for ANC
                that listens before it cancels.
              </p>
            </div>

            <Link
              href="/product/volt-field-pro"
              className="group inline-flex items-center gap-3 self-start sm:self-end bg-accent text-bg px-7 py-4 text-[13px] font-medium tracking-tight hover:gap-5 hover:bg-text transition-all duration-300 ease-smooth"
            >
              Shop Field Pro
              <ArrowRight
                strokeWidth={1.75}
                className="h-4 w-4 transition-transform duration-300 ease-smooth"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-[3] hero-rise hero-rise-4 hidden md:flex flex-col items-center gap-2 text-[10px] font-mono text-muted tracking-[0.24em]">
        <span>SCROLL</span>
        <ArrowDown strokeWidth={1.5} className="h-3 w-3 animate-bounce" />
      </div>
    </section>
  );
}
