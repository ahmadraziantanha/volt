import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "VOLT is a reference-grade audio company designed and assembled in Porto, Portugal. Audio instruments for people who actually listen.",
};

const STATS = [
  { value: "7", label: "PRODUCTS" },
  { value: "32", label: "ENGINEERS" },
  { value: "2023", label: "FOUNDED" },
  { value: "PT", label: "PORTO" },
];

const VALUES = [
  {
    index: "01",
    title: "No compromise.",
    body: "Every decision — material, tuning, manufacturing tolerance — is made on sonic merit. Cost follows performance, not the other way around.",
  },
  {
    index: "02",
    title: "Built to last.",
    body: "We design for repairability. All structural components are replaceable. We stock parts for a minimum of seven years after a product is discontinued.",
  },
  {
    index: "03",
    title: "No dark patterns.",
    body: "No countdown timers, no artificial scarcity, no sale cycles. One price. Accurate information. The decision is yours.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-36 md:pt-52">
      {/* Hero */}
      <div className="px-5 md:px-8 pb-28 md:pb-44 border-b border-line">
        <div className="text-[10.5px] font-mono text-accent tracking-[0.24em] mb-7">
          STUDIO · PORTO
        </div>
        <h1 className="text-[clamp(58px,11.5vw,176px)] font-medium text-text tracking-[-0.06em] leading-[0.84] mb-10 md:mb-12 max-w-[1400px]">
          We make
          <br />
          <span className="text-body font-light">instruments</span>
          <br />
          for listeners<span className="text-accent">.</span>
        </h1>
        <p className="text-[15px] md:text-[17px] text-body max-w-xl leading-[1.7]">
          Founded in Porto in 2023, VOLT is a small team of acoustics engineers,
          industrial designers, and obsessive listeners. We design and assemble
          everything in-house. We ship worldwide. We do not run sales.
        </p>
      </div>

      {/* Manifesto */}
      <div className="px-5 md:px-8 py-28 md:py-44 border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          <div className="text-[11px] font-mono text-body tracking-[0.24em] pt-1">
            MANIFESTO
          </div>
          <div className="space-y-6 max-w-2xl">
            <p className="text-[15px] md:text-[17px] text-text leading-relaxed">
              Audio equipment has become indistinguishable from other consumer
              electronics — purchased on spec, replaced on a two-year cycle,
              designed for the unboxing video rather than the decade of daily
              use.
            </p>
            <p className="text-[15px] md:text-[17px] text-text leading-relaxed">
              We built VOLT because we wanted different products to exist. Not
              products that measure better than anything else, though we care
              deeply about measurements. Not products that look more expensive
              than everything else, though we care about craft. Products that
              reward long-term ownership. That sound better the more you
              understand them. That make the act of listening feel like it
              matters.
            </p>
            <p className="text-[15px] md:text-[17px] text-body leading-relaxed">
              We're a small company. Every product we make is a significant
              resource commitment. We make fewer things, and we try to make them
              exactly right.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-line">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="px-8 py-10 md:py-14 border-b md:border-b-0 border-line [&:not(:last-child)]:md:border-r"
            >
              <div className="text-[clamp(40px,6vw,72px)] font-medium text-text tracking-tight leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-body tracking-[0.24em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="px-5 md:px-8 py-28 md:py-44 border-b border-line">
        <div className="text-[11px] font-mono text-body tracking-[0.24em] mb-12">
          HOW WE WORK
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {VALUES.map((v) => (
            <div key={v.index}>
              <div className="text-[11px] font-mono text-quiet tracking-wider mb-5">
                {v.index}
              </div>
              <h3 className="text-[20px] font-medium text-text tracking-tight mb-3">
                {v.title}
              </h3>
              <p className="text-[13px] text-body leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Porto */}
      <div className="px-5 md:px-8 py-28 md:py-44 border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          <div className="text-[11px] font-mono text-body tracking-[0.24em] pt-1">
            LOCATION
          </div>
          <div className="max-w-2xl">
            <p className="text-[15px] md:text-[17px] text-text leading-relaxed mb-6">
              Porto is not an obvious place to make audio equipment. It has no
              consumer electronics industry, no established supply chain, no
              cluster of acoustics startups. It has stone streets, a river, and
              a culture that takes craft seriously.
            </p>
            <p className="text-[13px] md:text-[15px] text-body leading-relaxed">
              We chose it deliberately. Distance from trends, proximity to
              people who make things with their hands, and a city that rewards
              paying attention. Our reference room is on Rua das Flores, above a
              café that plays jazz on equipment we would never design but always
              appreciate.
            </p>
            <address className="not-italic mt-8 text-[12px] font-mono text-muted tracking-wider">
              Rua das Flores 22
              <br />
              2700–248 Porto, Portugal
            </address>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 md:px-8 py-28 md:py-44">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <div className="text-[11px] font-mono text-body tracking-[0.24em] mb-3">
              THE COLLECTION
            </div>
            <h2 className="text-[28px] md:text-[36px] font-medium text-text tracking-tight leading-tight">
              Seven products.
              <br />
              All of them here.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 h-12 px-6 bg-text text-bg text-[13px] font-medium tracking-wide hover:bg-accent transition-colors shrink-0"
          >
            Explore the collection
            <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
