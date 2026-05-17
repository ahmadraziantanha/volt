import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS = [
  {
    title: "SHOP",
    links: [
      { label: "All editions", href: "/shop" },
      { label: "Headphones", href: "/shop?category=headphones" },
      { label: "Earbuds", href: "/shop?category=earbuds" },
      { label: "Speakers", href: "/shop?category=speakers" },
      { label: "Cables & care", href: "/shop" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Contact", href: "#" },
      { label: "Shipping & returns", href: "#" },
      { label: "Warranty", href: "#" },
      { label: "Repair programme", href: "#" },
    ],
  },
  {
    title: "STUDIO",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Sustainability", href: "/about" },
      { label: "Press kit", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="px-5 md:px-8 pt-16 md:pt-24 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 pb-16 lg:pb-24 border-b border-line">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="text-[clamp(56px,12vw,132px)] font-medium text-text tracking-tightest leading-[0.85] mb-8">
            VOLT
          </div>
          <p className="text-xs text-muted max-w-[300px] leading-relaxed">
            Audio instruments designed and assembled in Porto, Portugal. Shipped worldwide since 2023. We do not run sales.
          </p>
          <NewsletterForm />
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h6 className="text-[11px] font-mono text-quiet tracking-[0.06em] mb-6">
              {col.title}
            </h6>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-body hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-5 items-center text-[11px] font-mono text-muted">
        <div>© MMXXVI VOLT STUDIO, LDA.</div>
        <div className="md:text-center">Rua das Flores 22, 2700–248 Porto</div>
        <div className="flex md:justify-end gap-1">
          {[
            { Icon: Instagram, label: "Instagram" },
            { Icon: Youtube, label: "YouTube" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="inline-flex w-9 h-9 items-center justify-center rounded-full text-muted hover:text-text hover:bg-surface transition-colors"
            >
              <Icon strokeWidth={1.5} className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
