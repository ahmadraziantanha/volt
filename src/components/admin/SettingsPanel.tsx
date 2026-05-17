"use client";

import { useState, useTransition } from "react";
import { Truck } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateShippingSettings } from "@/app/admin/actions";
import { cn, formatPrice } from "@/lib/utils";
import type { ShippingSettings } from "@/lib/supabase/types";

interface Props {
  initial: ShippingSettings;
}

export function SettingsPanel({ initial }: Props) {
  const [flatFee, setFlatFee] = useState((initial.flat_fee_cents / 100).toString());
  const [threshold, setThreshold] = useState(
    (initial.free_threshold_cents / 100).toString()
  );
  const [enabled, setEnabled] = useState(initial.enabled);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const flat = Math.round(parseFloat(flatFee) * 100);
    const free = Math.round(parseFloat(threshold) * 100);

    if (!Number.isFinite(flat) || flat < 0) {
      toast.error("Invalid shipping fee");
      return;
    }
    if (!Number.isFinite(free) || free < 0) {
      toast.error("Invalid free-shipping threshold");
      return;
    }

    startTransition(async () => {
      const res = await updateShippingSettings({
        flat_fee_cents: flat,
        free_threshold_cents: free,
        enabled,
      });
      if (!res.ok) {
        toast.error("Failed to save", { description: res.error });
        return;
      }
      toast.success("Shipping settings saved");
    });
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={onSubmit} className="border border-line-2">
        <div className="px-6 py-5 border-b border-line-2 flex items-center gap-3">
          <div className="inline-flex w-10 h-10 items-center justify-center border border-line-2 text-accent">
            <Truck strokeWidth={1.5} className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-[16px] font-medium text-text">Delivery fees</h3>
            <p className="text-[12px] text-body mt-1">
              Applies to every storefront order. Customers see the threshold in the
              cart drawer.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Enabled toggle */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <Label className="mb-1">Charge shipping</Label>
              <p className="text-[12px] text-body">
                When off, all orders ship free regardless of subtotal.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              onClick={() => setEnabled((x) => !x)}
              className={cn(
                "relative w-11 h-6 border transition-colors shrink-0 mt-1",
                enabled
                  ? "bg-accent border-accent"
                  : "bg-surface-2 border-line-2"
              )}
            >
              <span
                className={cn(
                  "absolute top-[2px] left-[2px] w-[18px] h-[18px] transition-transform",
                  enabled ? "translate-x-[20px] bg-bg" : "bg-text"
                )}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="flat-fee">Flat shipping fee ($)</Label>
              <Input
                id="flat-fee"
                type="number"
                step="0.01"
                min="0"
                value={flatFee}
                onChange={(e) => setFlatFee(e.target.value)}
                disabled={!enabled}
              />
              <p className="text-[11px] text-body mt-2 leading-relaxed">
                Charged when the cart is below the free-shipping threshold.
              </p>
            </div>
            <div>
              <Label htmlFor="threshold">Free shipping over ($)</Label>
              <Input
                id="threshold"
                type="number"
                step="0.01"
                min="0"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                disabled={!enabled}
              />
              <p className="text-[11px] text-body mt-2 leading-relaxed">
                Orders at or above this amount ship free.
              </p>
            </div>
          </div>

          <div className="bg-surface-2 border border-line-2 px-4 py-3 text-[12px] leading-relaxed">
            <div className="text-body mb-1">Preview</div>
            <div className="text-text">
              {enabled ? (
                <>
                  Orders under{" "}
                  <span className="font-mono text-accent">
                    {formatPrice(Math.round(parseFloat(threshold || "0") * 100))}
                  </span>{" "}
                  pay{" "}
                  <span className="font-mono">
                    {formatPrice(Math.round(parseFloat(flatFee || "0") * 100))}
                  </span>{" "}
                  shipping. At or above the threshold, shipping is{" "}
                  <span className="text-accent">free</span>.
                </>
              ) : (
                <span className="text-accent">Shipping is currently free for all orders.</span>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-line-2 flex justify-end">
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
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
