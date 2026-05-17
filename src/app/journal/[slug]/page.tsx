import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ARTICLES, getArticle } from "@/lib/journal";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const currentIndex = ARTICLES.findIndex((a) => a.slug === params.slug);
  const next = ARTICLES[currentIndex + 1] ?? null;

  return (
    <div className="pt-28 md:pt-36 pb-24">
      {/* Back */}
      <div className="px-5 md:px-8 mb-10">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-[12px] font-mono text-body hover:text-text transition-colors tracking-wider"
        >
          <ArrowLeft strokeWidth={1.5} className="h-3.5 w-3.5" />
          JOURNAL
        </Link>
      </div>

      {/* Header */}
      <div className="px-5 md:px-8 mb-14 md:mb-20 max-w-6xl">
        <div className="flex items-center gap-3 mb-7 text-[10.5px] font-mono text-body tracking-[0.24em]">
          <span className="text-accent">{article.category}</span>
          <span className="text-quiet">·</span>
          <span>{article.date.toUpperCase()}</span>
          <span className="text-quiet">·</span>
          <span>{article.readTime} MIN READ</span>
        </div>

        <h1 className="text-[clamp(40px,7vw,96px)] font-medium text-text tracking-[-0.045em] leading-[0.96] max-w-4xl">
          {article.title}
          <span className="text-accent">.</span>
        </h1>

        <p className="mt-8 text-[16px] md:text-[19px] text-body leading-[1.65] max-w-2xl">
          {article.excerpt}
        </p>
      </div>

      {/* Cover image — cinematic */}
      <div className="mb-20 md:mb-32 shadow-cinema">
        <div className="relative aspect-[21/9] bg-surface-2 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)",
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 md:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {article.content.map((section, i) => {
            if (section.type === "h2") {
              return (
                <h2
                  key={i}
                  className="text-[20px] md:text-[24px] font-medium text-text tracking-tight pt-4"
                >
                  {section.text}
                </h2>
              );
            }
            if (section.type === "blockquote") {
              return (
                <blockquote
                  key={i}
                  className="border-l-2 border-accent pl-6 py-1"
                >
                  <p className="text-[16px] md:text-[18px] text-text font-medium leading-relaxed tracking-tight">
                    &ldquo;{section.text}&rdquo;
                  </p>
                </blockquote>
              );
            }
            return (
              <p
                key={i}
                className="text-[14px] md:text-[15px] text-body leading-[1.75]"
              >
                {section.text}
              </p>
            );
          })}
        </div>
      </div>

      {/* Next article */}
      {next && (
        <div className="px-5 md:px-8 mt-20 md:mt-28">
          <div className="border-t border-line pt-12">
            <div className="text-[11px] font-mono text-body tracking-wider mb-6">
              NEXT IN JOURNAL
            </div>
            <Link
              href={`/journal/${next.slug}`}
              className="group flex items-start justify-between gap-8"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-mono text-accent tracking-wider mb-2">
                  {next.category}
                </div>
                <h3 className="text-[22px] md:text-[28px] font-medium text-text tracking-tight leading-tight group-hover:text-accent transition-colors">
                  {next.title}
                </h3>
              </div>
              <div className="shrink-0 mt-2">
                <ArrowRight
                  strokeWidth={1.5}
                  className="h-6 w-6 text-body group-hover:text-text group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
