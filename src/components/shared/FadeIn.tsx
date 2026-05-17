"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * IntersectionObserver-based reveal. Adds a fade-up when the element enters
 * the viewport. Skips entirely if `prefers-reduced-motion` is on.
 */
export function FadeIn({
  className,
  children,
  delay = 0,
  y = 20,
  once = true,
  style,
  ...props
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-smooth",
        visible ? "opacity-100 translate-y-0" : "opacity-0",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? undefined : `translateY(${y}px)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
