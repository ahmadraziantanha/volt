import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTICLES } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Ideas, process, and sound from the VOLT studio. Engineering deep-dives, culture, and brand thinking.",
};

export default function JournalPage() {
  return (
    <div className="pt-36 md:pt-52 pb-28 md:pb-40">
      {/* Page header */}
      <div className="px-5 md:px-8 mb-20 md:mb-32">
        <div className="text-[10.5px] font-mono text-accent tracking-[0.24em] mb-6">
          JOURNAL · MMXXVI
        </div>
        <h1 className="text-[clamp(56px,11vw,168px)] font-medium text-text tracking-[-0.055em] leading-[0.86] mb-8 md:mb-10">
          Ideas, process,
          <br />
          <span className="text-body font-light">sound</span>
          <span className="text-accent">.</span>
        </h1>
        <p className="text-[14px] md:text-[15px] text-body max-w-md leading-[1.7]">
          Thoughts from the studio floor — engineering, culture, and the
          occasional explanation of why we do things the way we do.
        </p>
      </div>

      {/* Divider */}
      <div className="px-5 md:px-8 mb-20 md:mb-28">
        <div className="border-t border-line" />
      </div>

      {/* Article grid */}
      <div className="px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24 md:gap-y-32">
          {ARTICLES.map((article, i) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group block"
            >
              {/* Cover image with cinematic shadow + tilt */}
              <div
                style={{ perspective: "1400px" }}
                className="relative overflow-hidden mb-7 md:mb-9 bg-surface-2 transition-shadow duration-500 ease-smooth group-hover:shadow-cinema"
              >
                <div
                  className={i === 0 ? "aspect-[16/10]" : "aspect-[16/11]"}
                >
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-smooth group-hover:[transform:scale(1.05)_rotateY(-1.5deg)]">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)",
                    }}
                    aria-hidden
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-4 text-[10.5px] font-mono text-body tracking-[0.22em]">
                <span className="text-accent">{article.category}</span>
                <span className="text-quiet">·</span>
                <span>{article.date.toUpperCase()}</span>
                <span className="text-quiet">·</span>
                <span>{article.readTime} MIN</span>
              </div>

              {/* Title */}
              <h2 className="text-[24px] md:text-[28px] font-medium text-text tracking-[-0.025em] leading-[1.15] mb-4 group-hover:text-accent transition-colors duration-300">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-[13.5px] text-body leading-[1.7] line-clamp-3 mb-6 max-w-lg">
                {article.excerpt}
              </p>

              {/* Read link */}
              <div className="flex items-center gap-2 text-[10.5px] font-mono text-body group-hover:text-text transition-colors tracking-[0.22em]">
                <span>READ</span>
                <ArrowRight
                  strokeWidth={1.5}
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
