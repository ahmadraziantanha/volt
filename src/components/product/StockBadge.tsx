import { cn } from "@/lib/utils";

interface Props {
  stock: number;
}

export function StockBadge({ stock }: Props) {
  let label: string;
  let dotClass: string;

  if (stock <= 0) {
    label = "Sold out";
    dotClass = "bg-quiet";
  } else if (stock <= 5) {
    label = `Low stock — ${stock} left`;
    dotClass = "bg-accent";
  } else {
    label = "In stock";
    dotClass = "bg-[#6ABF4B]";
  }

  return (
    <div className="flex items-center gap-2 text-[12px] font-mono text-body tracking-wider uppercase">
      <span className={cn("inline-block w-[5px] h-[5px] rounded-full", dotClass)} />
      {label}
    </div>
  );
}
