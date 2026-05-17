import Link from "next/link";
import { Banknote, Compass, Clock, ShieldCheck, ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Promise {
  Icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  cta: string;
}

const PROMISES: Promise[] = [
  {
    Icon: Clock,
    title: "30-day home trial.",
    body: "Live with it for a month. If it isn't yours, send it back — we cover the return.",
    href: "#",
    cta: "Trial terms",
  },
  {
    Icon: ShieldCheck,
    title: "5-year warranty.",
    body: "Built to outlast the decade. We repair or replace at no cost for five years.",
    href: "#",
    cta: "What's covered",
  },
  {
    Icon: Banknote,
    title: "Cash on delivery.",
    body: "Pay the courier in cash when your order arrives. No card details, no holds.",
    href: "#",
    cta: "How COD works",
  },
  {
    Icon: Compass,
    title: "Assembled in Porto.",
    body: "Every unit is hand-tuned and quality-checked at our workshop on Rua das Flores.",
    href: "#",
    cta: "Visit the studio",
  },
];

// Responsive hairline grid dividers.
// Mobile (1 col): horizontal between each
// Tablet (2 cols, 2x2): vertical between cols, horizontal between rows
// Desktop (4 cols, 1 row): vertical only
const BORDERS = [
  "border-b border-line lg:border-b-0 md:border-r",      // cell 0
  "border-b border-line lg:border-b-0 lg:border-r",      // cell 1
  "border-b border-line md:border-b-0 md:border-r",      // cell 2
  "",                                                     // cell 3
];

export function Promises() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-line">
      {PROMISES.map(({ Icon, title, body, href, cta }, i) => (
        <div key={title} className={cn("group p-8 md:p-10 lg:p-12", BORDERS[i])}>
          <div className="inline-flex items-center justify-center w-12 h-12 mb-6 border border-line-2 text-text transition-colors duration-300 ease-smooth group-hover:border-accent group-hover:text-accent">
            <Icon strokeWidth={1.5} className="h-5 w-5" />
          </div>

          <h4 className="text-[19px] md:text-[20px] font-medium text-text tracking-tight mb-3 leading-tight">
            {title}
          </h4>

          <p className="text-[13.5px] text-body leading-relaxed mb-6 max-w-[280px]">
            {body}
          </p>

          <Link
            href={href}
            className="inline-flex items-center gap-2 text-[12px] font-mono text-accent tracking-wider hover:gap-3 transition-all duration-300 ease-smooth"
          >
            {cta.toUpperCase()}
            <ArrowRight strokeWidth={1.75} className="h-3 w-3" />
          </Link>
        </div>
      ))}
    </div>
  );
}
