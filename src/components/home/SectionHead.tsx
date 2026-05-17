import { cn } from "@/lib/utils";

interface Props {
  num: string;
  title: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}

export function SectionHead({ num, title, right, className, noBorder }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-6 md:gap-10 items-start md:items-end",
        "px-5 md:px-8 pt-28 md:pt-44 pb-12 md:pb-20",
        !noBorder && "border-b border-line",
        className
      )}
    >
      <div className="text-[10.5px] font-mono text-accent tracking-[0.24em]">{num}</div>
      <h2 className="text-display-md font-medium text-text tracking-tight">{title}</h2>
      {right && (
        <div className="text-[13px] text-body max-w-[340px] md:text-right leading-[1.65]">
          {right}
        </div>
      )}
    </div>
  );
}
