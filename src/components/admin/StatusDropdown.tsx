"use client";

import { useTransition } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { updateOrderStatus } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/supabase/types";

const STATUSES: Array<{ key: OrderStatus; label: string; dotClass: string }> = [
  { key: "pending",   label: "Pending",   dotClass: "bg-accent" },
  { key: "confirmed", label: "Confirmed", dotClass: "bg-[#6ABF4B]" },
  { key: "shipped",   label: "Shipped",   dotClass: "bg-[#4B8AFF]" },
  { key: "delivered", label: "Delivered", dotClass: "bg-text" },
  { key: "cancelled", label: "Cancelled", dotClass: "bg-[#FB7185]" },
];

interface Props {
  orderId: string;
  value: OrderStatus;
}

export function StatusDropdown({ orderId, value }: Props) {
  const [pending, startTransition] = useTransition();
  const current = STATUSES.find((s) => s.key === value) ?? STATUSES[0];

  const onChange = (v: string) => {
    const next = v as OrderStatus;
    if (next === value) return;
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, next);
      if (!res.ok) {
        toast.error("Failed to update", { description: res.error });
      } else {
        toast.success(`Marked ${STATUSES.find((s) => s.key === next)?.label}`);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={pending}
        className={cn(
          "inline-flex items-center gap-2 h-8 px-3 border border-line-2 text-[12px] text-text",
          "hover:border-muted disabled:opacity-50 transition-colors group min-w-[120px] justify-between"
        )}
      >
        <span className="inline-flex items-center gap-2">
          <span
            className={cn("inline-block w-1.5 h-1.5 rounded-full", current.dotClass)}
          />
          {current.label}
        </span>
        <ChevronDown
          strokeWidth={1.5}
          className="h-3.5 w-3.5 text-muted transition-transform group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>STATUS</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {STATUSES.map((s) => (
            <DropdownMenuRadioItem key={s.key} value={s.key}>
              <span className="inline-flex items-center gap-2">
                <span
                  className={cn("inline-block w-1.5 h-1.5 rounded-full", s.dotClass)}
                />
                {s.label}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
