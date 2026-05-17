import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-end px-5 md:px-8 pb-16 md:pb-24">
      <div className="max-w-3xl">
        <div className="text-[10.5px] font-mono text-accent tracking-[0.24em] mb-7">
          404 · NOT FOUND
        </div>

        <h1 className="text-[clamp(64px,12vw,168px)] font-medium text-text tracking-[-0.06em] leading-[0.86] mb-10">
          Lost<span className="text-quiet">.</span>
        </h1>

        <p className="text-[15px] md:text-[17px] text-body leading-[1.65] max-w-md mb-12">
          The page you&apos;re looking for doesn&apos;t exist. It may have moved,
          or you may have followed a broken link.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 h-12 px-6 bg-text text-bg text-[13px] font-medium hover:bg-accent transition-colors"
          >
            Go home
            <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 h-12 px-6 border border-line-2 text-[13px] text-body hover:text-text hover:border-muted transition-colors"
          >
            Browse the catalogue
            <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
