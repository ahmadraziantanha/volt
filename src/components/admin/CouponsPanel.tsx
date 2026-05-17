"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  createCoupon,
  deleteCoupon,
  toggleCoupon,
} from "@/app/admin/actions";
import { cn, formatPrice } from "@/lib/utils";
import type { CouponDiscountType, CouponRow } from "@/lib/supabase/types";

interface Props {
  coupons: CouponRow[];
}

export function CouponsPanel({ coupons }: Props) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="text-[12px] text-body">
          {coupons.length} coupon{coupons.length === 1 ? "" : "s"} total
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 h-10 px-4 bg-accent text-bg text-[13px] font-medium tracking-tight hover:bg-text transition-colors"
        >
          <Plus strokeWidth={1.75} className="h-4 w-4" />
          New coupon
        </button>
      </div>

      {coupons.length === 0 ? (
        <div className="border border-line-2 py-20 text-center">
          <div className="text-[clamp(24px,3vw,32px)] font-medium text-text tracking-tight mb-2">
            No coupons yet.
          </div>
          <p className="text-sm text-body mb-6">
            Create a coupon to offer percentage or fixed-amount discounts.
          </p>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 h-10 px-4 border border-line-2 text-[13px] text-text hover:border-muted transition-colors"
          >
            <Plus strokeWidth={1.75} className="h-4 w-4" />
            Create the first one
          </button>
        </div>
      ) : (
        <div className="border border-line-2 overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="text-left bg-surface-2">
                <Th>CODE</Th>
                <Th>DISCOUNT</Th>
                <Th>MIN ORDER</Th>
                <Th align="right">USES</Th>
                <Th>EXPIRES</Th>
                <Th>STATUS</Th>
                <Th align="right" />
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <CouponRow key={c.id} coupon={c} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateCouponDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  );
}

function CouponRow({ coupon }: { coupon: CouponRow }) {
  const [pending, startTransition] = useTransition();

  const onToggle = () => {
    startTransition(async () => {
      const res = await toggleCoupon(coupon.id, !coupon.active);
      if (!res.ok) toast.error("Failed", { description: res.error });
    });
  };

  const onDelete = () => {
    if (!confirm(`Delete coupon ${coupon.code}? This cannot be undone.`)) return;
    startTransition(async () => {
      const res = await deleteCoupon(coupon.id);
      if (!res.ok) {
        toast.error("Failed", { description: res.error });
      } else {
        toast.success(`Deleted ${coupon.code}`);
      }
    });
  };

  const discountLabel =
    coupon.discount_type === "percent"
      ? `${coupon.discount_value}%`
      : formatPrice(coupon.discount_value);

  const usesLabel = coupon.max_uses
    ? `${coupon.uses_count} / ${coupon.max_uses}`
    : `${coupon.uses_count}`;

  const expiresLabel = coupon.valid_until
    ? new Date(coupon.valid_until).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <tr className="border-t border-line-2 hover:bg-surface-2/60 transition-colors">
      <Td>
        <div className="font-mono text-text text-[13.5px] tracking-wider">
          {coupon.code}
        </div>
        {coupon.description && (
          <div className="text-[12px] text-body mt-1 max-w-[280px] truncate">
            {coupon.description}
          </div>
        )}
      </Td>
      <Td>
        <span className="text-text font-mono">{discountLabel}</span>
        <span className="text-[11px] text-body ml-2 font-mono">
          {coupon.discount_type.toUpperCase()}
        </span>
      </Td>
      <Td>
        <span className="text-text font-mono text-[13px]">
          {coupon.min_subtotal > 0 ? formatPrice(coupon.min_subtotal) : "—"}
        </span>
      </Td>
      <Td align="right">
        <span className="text-text font-mono text-[13px]">{usesLabel}</span>
      </Td>
      <Td>
        <span className="text-body text-[12px] font-mono">{expiresLabel}</span>
      </Td>
      <Td>
        <button
          onClick={onToggle}
          disabled={pending}
          role="switch"
          aria-checked={coupon.active}
          className={cn(
            "relative w-10 h-5 border transition-colors disabled:opacity-50",
            coupon.active
              ? "bg-accent border-accent"
              : "bg-surface-2 border-line-2"
          )}
        >
          <span
            className={cn(
              "absolute top-[1px] left-[1px] w-[15px] h-[15px] transition-transform",
              coupon.active ? "translate-x-[20px] bg-bg" : "bg-text"
            )}
          />
        </button>
      </Td>
      <Td align="right">
        <button
          onClick={onDelete}
          disabled={pending}
          aria-label={`Delete ${coupon.code}`}
          className="inline-flex w-8 h-8 items-center justify-center text-body hover:text-[#FB7185] hover:bg-surface-2 transition-colors disabled:opacity-50"
        >
          <Trash2 strokeWidth={1.5} className="h-3.5 w-3.5" />
        </button>
      </Td>
    </tr>
  );
}

function CreateCouponDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<CouponDiscountType>("percent");
  const [value, setValue] = useState("");
  const [minSubtotal, setMinSubtotal] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [pending, startTransition] = useTransition();

  const reset = () => {
    setCode("");
    setDescription("");
    setType("percent");
    setValue("");
    setMinSubtotal("");
    setMaxUses("");
    setValidUntil("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseFloat(value);
    const v = type === "percent" ? parsedValue : Math.round(parsedValue * 100);
    const min = minSubtotal ? Math.round(parseFloat(minSubtotal) * 100) : 0;
    const uses = maxUses ? parseInt(maxUses, 10) : null;
    const until = validUntil ? new Date(validUntil).toISOString() : null;

    startTransition(async () => {
      const res = await createCoupon({
        code,
        description: description.trim() || undefined,
        discount_type: type,
        discount_value: v,
        min_subtotal: min,
        max_uses: uses,
        valid_until: until,
        active: true,
      });
      if (!res.ok) {
        toast.error("Could not create", { description: res.error });
        return;
      }
      toast.success(`Coupon ${code.toUpperCase()} created`);
      reset();
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>New coupon</DialogTitle>
            <DialogDescription>
              Create a percentage or fixed-amount discount code that customers
              can apply at checkout.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="c-code">Code</Label>
                <Input
                  id="c-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="SUMMER15"
                  required
                  className="font-mono tracking-wider"
                />
              </div>
              <div>
                <Label htmlFor="c-desc">Internal description</Label>
                <Input
                  id="c-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summer campaign"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("percent")}
                className={cn(
                  "h-12 border text-[13px] font-medium tracking-tight transition-colors",
                  type === "percent"
                    ? "border-accent text-accent bg-surface-2"
                    : "border-line-2 text-body hover:text-text hover:border-muted"
                )}
              >
                Percent off
              </button>
              <button
                type="button"
                onClick={() => setType("fixed")}
                className={cn(
                  "h-12 border text-[13px] font-medium tracking-tight transition-colors",
                  type === "fixed"
                    ? "border-accent text-accent bg-surface-2"
                    : "border-line-2 text-body hover:text-text hover:border-muted"
                )}
              >
                Fixed amount
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="c-value">
                  Discount {type === "percent" ? "(%)" : "($)"}
                </Label>
                <Input
                  id="c-value"
                  type="number"
                  step={type === "percent" ? "1" : "0.01"}
                  min={type === "percent" ? 1 : 0.01}
                  max={type === "percent" ? 100 : undefined}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="c-min">Minimum order ($)</Label>
                <Input
                  id="c-min"
                  type="number"
                  step="0.01"
                  min="0"
                  value={minSubtotal}
                  onChange={(e) => setMinSubtotal(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="c-uses">Max uses (optional)</Label>
                <Input
                  id="c-uses"
                  type="number"
                  min="1"
                  step="1"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  placeholder="Unlimited"
                />
              </div>
              <div>
                <Label htmlFor="c-until">Expires (optional)</Label>
                <Input
                  id="c-until"
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="h-10 px-5 text-[13px] text-body border border-line-2 hover:border-muted hover:text-text transition-colors"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={pending}
              className={cn(
                "inline-flex items-center gap-2 h-10 px-5 text-[13px] font-medium tracking-tight transition-colors",
                pending
                  ? "bg-surface text-body border border-line-2 cursor-not-allowed"
                  : "bg-accent text-bg hover:bg-text"
              )}
            >
              {pending ? "Creating…" : "Create coupon"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Th({
  children,
  align = "left",
}: {
  children?: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3.5 text-[11px] font-mono text-body tracking-wider font-normal text-${align}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <td className={`px-5 py-4 align-middle text-${align}`}>{children}</td>
  );
}
