import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  product: ProductWithVariants;
}

const CARE_DEFAULT = [
  "Wipe earcups and chassis with a soft, dry microfiber cloth.",
  "Avoid alcohol-based cleaners on leather or fabric finishes.",
  "Store in the included case in a cool, dry environment.",
  "Charge to 60% before storing for more than a month.",
];

export function ProductAccordion({ product }: Props) {
  const specs = Object.entries(product.specs);
  const inBox = product.in_box ?? [];

  return (
    <Accordion type="single" collapsible className="border-t border-line">
      <AccordionItem value="specs">
        <AccordionTrigger>Specifications</AccordionTrigger>
        <AccordionContent>
          <dl className="divide-y divide-line">
            {specs.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[120px_1fr] gap-4 py-3 items-baseline"
              >
                <dt className="text-[11px] font-mono text-muted tracking-wider uppercase">
                  {k}
                </dt>
                <dd className="text-[13px] text-text">{v}</dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="in-box">
        <AccordionTrigger>What&apos;s in the box</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2">
            {inBox.map((item, i) => (
              <li
                key={item}
                className="grid grid-cols-[24px_1fr] gap-3 text-[13px] text-text items-baseline"
              >
                <span className="text-[11px] font-mono text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="care">
        <AccordionTrigger>Care</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-3">
            {CARE_DEFAULT.map((line) => (
              <li
                key={line}
                className="grid grid-cols-[8px_1fr] gap-3 text-[13px] text-body leading-relaxed"
              >
                <span className="text-quiet">—</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
