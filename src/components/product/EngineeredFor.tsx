import { cn } from "@/lib/utils";
import type { ProductFeature } from "@/lib/supabase/types";

interface Props {
  productName: string;
  features: ProductFeature[];
}

export function EngineeredFor({ productName, features }: Props) {
  if (!features?.length) return null;

  return (
    <section className="border-t border-line">
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-5 md:gap-8 items-end px-5 md:px-8 pt-20 md:pt-28 pb-10 md:pb-14 border-b border-line">
        <div className="text-[11px] font-mono text-accent tracking-wider">FEATURES</div>
        <h2 className="text-display-md font-medium text-text">
          Engineered for {productName}.
        </h2>
        <div className="text-[13px] text-body max-w-[320px] md:text-right leading-relaxed">
          Three engineering decisions that shape how it sounds — in plain language.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={cn(
              "p-8 md:p-10 lg:p-14",
              i < features.length - 1 &&
                "border-b md:border-b-0 border-line md:border-r"
            )}
          >
            <div className="text-[11px] font-mono text-accent tracking-wider mb-8">
              {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
            </div>
            <h3 className="text-[clamp(22px,2.4vw,28px)] font-medium text-text tracking-tight mb-4 leading-tight">
              {f.title}
            </h3>
            <p className="text-[14px] text-body leading-relaxed max-w-[360px]">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
