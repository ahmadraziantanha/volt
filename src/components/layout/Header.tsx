"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart/CartProvider";
import { MobileMenu } from "./MobileMenu";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=headphones", label: "Headphones" },
  { href: "/shop?category=earbuds", label: "Earbuds" },
  { href: "/shop?category=speakers", label: "Speakers" },
  { href: "/journal", label: "Journal" },
];

export function Header() {
  const { count, open: openCart, isHydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ease-smooth",
          "border-b",
          scrolled
            ? "bg-bg/82 backdrop-blur-lg saturate-150 border-line"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="px-5 md:px-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
            <Link href="/" className="text-[15px] font-bold tracking-tight text-text">
              VOLT
            </Link>

            <nav className="hidden lg:flex gap-9 justify-self-center">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13.5px] text-body hover:text-text transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 justify-self-end">
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-full text-text hover:bg-surface transition-colors"
              >
                <Search strokeWidth={1.5} className="h-5 w-5" />
              </button>

              <button
                aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
                onClick={openCart}
                className="relative inline-flex w-10 h-10 items-center justify-center rounded-full text-text hover:bg-surface transition-colors"
              >
                <ShoppingBag strokeWidth={1.5} className="h-5 w-5" />
                {isHydrated && count > 0 && (
                  <span className="absolute top-1 right-1 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-accent px-[3px] text-[9px] font-medium leading-none text-bg font-mono">
                    {count}
                  </span>
                )}
              </button>

              <button
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
                className="inline-flex lg:hidden w-10 h-10 items-center justify-center rounded-full text-text hover:bg-surface transition-colors"
              >
                <Menu strokeWidth={1.5} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
