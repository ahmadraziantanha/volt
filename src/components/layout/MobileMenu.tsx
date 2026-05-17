"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Instagram, Youtube, X } from "lucide-react";
import { cn, pad } from "@/lib/utils";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=headphones", label: "Headphones" },
  { href: "/shop?category=earbuds", label: "Earbuds" },
  { href: "/shop?category=speakers", label: "Speakers" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("lock-scroll");
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.classList.remove("lock-scroll");
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] bg-bg flex flex-col transition-opacity duration-400 ease-smooth",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between h-16 px-5 border-b border-line">
        <Link href="/" onClick={onClose} className="text-[15px] font-bold tracking-tight text-text">
          VOLT
        </Link>
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="inline-flex w-10 h-10 items-center justify-center rounded-full text-text hover:bg-surface transition-colors"
        >
          <X strokeWidth={1.5} className="h-5 w-5" />
        </button>
      </div>

      <ul className="flex-1 px-5 py-12 flex flex-col gap-1">
        {NAV.map((item, i) => (
          <li
            key={item.href}
            className={cn(
              "border-b border-line transition-all duration-500 ease-smooth",
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="flex items-baseline justify-between py-5 text-[34px] font-medium tracking-tight text-text"
            >
              {item.label}
              <span className="text-[11px] font-mono text-quiet font-normal">{pad(i + 1)}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between px-5 py-8 border-t border-line">
        <div className="flex gap-1">
          <a
            href="#"
            aria-label="Instagram"
            className="inline-flex w-9 h-9 items-center justify-center rounded-full text-muted hover:text-text hover:bg-surface transition-colors"
          >
            <Instagram strokeWidth={1.5} className="h-4 w-4" />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="inline-flex w-9 h-9 items-center justify-center rounded-full text-muted hover:text-text hover:bg-surface transition-colors"
          >
            <Youtube strokeWidth={1.5} className="h-4 w-4" />
          </a>
        </div>
        <div className="text-[11px] font-mono text-muted tracking-wider">PORTO · MMXXVI</div>
      </div>
    </div>
  );
}
