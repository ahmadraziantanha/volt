"use client";

import { useState, useTransition } from "react";
import { Check, Tag, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart/CartProvider";
import { validateCoupon } from "@/app/checkout/actions";
import { cn, formatPrice } from "@/lib/utils";

export function CouponInput() {
  const { subtotal, coupon, setCoupon } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setError(null);

    startTransition(async () => {
      const res = await validateCoupon(code, subtotal);
      if (!res.ok) {
        setError(res.error);
        toast.error("Coupon rejected", { description: res.error });
        return;
      }
      setCoupon({
        code: res.code,
        discount: res.discount,
        type: res.type,
        value: res.value,
      });
      setCode("");
      toast.success(`Coupon applied — ${res.code}`, {
        description: `${formatPrice(res.discount)} off`,
      });
    });
  };

  if (coupon) {
    return (
      <div className="border border-line-2 bg-surface-2 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="inline-flex items-center justify-center w-8 h-8 border border-accent text-accent shrink-0">
            <Check strokeWidth={2} className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-text">
              <span className="font-mono">{coupon.code}</span> applied
            </div>
            <div className="text-[11px] text-body mt-0.5">
              {coupon.type === "percent"
                ? `${coupon.value}% off — saved ${formatPrice(coupon.discount)}`
                : `${formatPrice(coupon.discount)} off`}
            </div>
          </div>
        </div>
        <button
          onClick={() => setCoupon(null)}
          aria-label="Remove coupon"
          className="inline-flex w-8 h-8 items-center justify-center text-body hover:text-text hover:bg-surface transition-colors shrink-0"
        >
          <X strokeWidth={1.5} className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onApply}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Tag
            strokeWidth={1.5}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-body pointer-events-none"
          />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError(null);
            }}
            placeholder="Coupon code"
            className={cn(
              "w-full h-12 pl-11 pr-4 border bg-[#1A1A1A] text-[14px] text-text uppercase tracking-wider font-mono",
              error
                ? "border-[#FB7185]"
                : "border-[#303030] hover:border-[#4A4A4A] focus:border-accent",
              "focus:outline-none focus:bg-[#1F1F1F] transition-colors"
            )}
            disabled={pending}
          />
        </div>
        <button
          type="submit"
          disabled={pending || !code.trim()}
          className={cn(
            "inline-flex items-center justify-center h-12 px-5 text-[13px] font-medium tracking-tight",
            "transition-colors disabled:cursor-not-allowed",
            pending || !code.trim()
              ? "bg-surface-2 text-quiet border border-line-2"
              : "bg-text text-bg hover:bg-accent"
          )}
        >
          {pending ? "Checking…" : "Apply"}
        </button>
      </div>
      {error && (
        <p className="text-[12px] text-[#FB7185] mt-2">{error}</p>
      )}
    </form>
  );
}
