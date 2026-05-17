"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProduct } from "@/app/admin/actions";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  product: ProductWithVariants;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProductDialog({ product, open, onOpenChange }: Props) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState((product.base_price / 100).toString());
  const [stocks, setStocks] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        product.variants.map((v) => [v.id, v.stock.toString()])
      )
  );
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = Math.round(parseFloat(price) * 100);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      toast.error("Invalid price");
      return;
    }

    startTransition(async () => {
      const res = await updateProduct({
        productId: product.id,
        name: name.trim(),
        base_price: parsedPrice,
        variants: product.variants.map((v) => ({
          id: v.id,
          stock: Math.max(0, parseInt(stocks[v.id] || "0", 10) || 0),
        })),
      });

      if (!res.ok) {
        toast.error("Could not save", { description: res.error });
        return;
      }
      toast.success(`${name} saved`);
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit · {product.name}</DialogTitle>
            <DialogDescription>
              Update the name, price, and per-variant stock. Changes propagate
              immediately to the catalogue.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="mb-3">Variants · stock</Label>
              <ul className="border border-line-2 divide-y divide-line-2">
                {product.variants.map((v) => (
                  <li
                    key={v.id}
                    className="flex items-center gap-4 p-3 bg-surface-2"
                  >
                    <div className="w-12 h-12 shrink-0 bg-surface border border-line-2 overflow-hidden">
                      {v.image_urls?.[0] && (
                        <Image
                          src={v.image_urls[0]}
                          alt={v.color_name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full border border-line-2"
                          style={{ background: v.color_hex }}
                        />
                        <span className="text-[13px] text-text font-medium">
                          {v.color_name}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-muted tracking-wider mt-1">
                        {v.sku}
                      </div>
                    </div>
                    <div className="w-24">
                      <Input
                        type="number"
                        min={0}
                        value={stocks[v.id]}
                        onChange={(e) =>
                          setStocks((prev) => ({
                            ...prev,
                            [v.id]: e.target.value,
                          }))
                        }
                        className="text-right h-10 font-mono"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface-2 border border-line-2 px-4 py-3 text-[12px] text-muted leading-relaxed">
              Current displayed price:{" "}
              <span className="text-text font-mono">
                {formatPrice(product.base_price)}
              </span>
              {price && parseFloat(price) * 100 !== product.base_price && (
                <>
                  {" "}→{" "}
                  <span className="text-accent font-mono">
                    {formatPrice(Math.round(parseFloat(price) * 100))}
                  </span>
                </>
              )}
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
                  ? "bg-surface text-quiet border border-line-2 cursor-not-allowed"
                  : "bg-accent text-bg hover:bg-text"
              )}
            >
              {pending ? "Saving…" : "Save changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
