"use client";

import Image from "next/image";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { EditProductDialog } from "./EditProductDialog";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductWithVariants } from "@/lib/supabase/types";

interface Props {
  products: ProductWithVariants[];
}

export function ProductsTable({ products }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = products.find((p) => p.id === editingId) ?? null;

  return (
    <>
      <div className="border border-line-2 overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="text-left bg-surface-2">
              <Th>PRODUCT</Th>
              <Th>CATEGORY</Th>
              <Th align="right">PRICE</Th>
              <Th align="right">VARIANTS</Th>
              <Th align="right">STOCK</Th>
              <Th align="right" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
              const lowStock = totalStock <= 10;
              const heroImg = p.variants[0]?.image_urls?.[0];

              return (
                <tr
                  key={p.id}
                  className="border-t border-line-2 hover:bg-surface-2/60 transition-colors"
                >
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 shrink-0 bg-surface-2 border border-line-2 overflow-hidden">
                        {heroImg && (
                          <Image
                            src={heroImg}
                            alt=""
                            width={88}
                            height={88}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="text-text font-medium text-[13.5px]">{p.name}</div>
                        <div className="text-[12px] font-mono text-body mt-1">
                          {p.slug}
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-[12px] font-mono text-body tracking-wider uppercase">
                      {p.category}
                    </span>
                  </Td>
                  <Td align="right">
                    <span className="font-mono text-text text-[13.5px]">
                      {formatPrice(p.base_price)}
                    </span>
                  </Td>
                  <Td align="right">
                    <div className="inline-flex flex-wrap justify-end gap-1.5 max-w-[160px]">
                      {p.variants.map((v) => (
                        <span
                          key={v.id}
                          title={`${v.color_name} — ${v.stock} in stock`}
                          className="w-3 h-3 rounded-full border border-line-2"
                          style={{ background: v.color_hex }}
                        />
                      ))}
                    </div>
                  </Td>
                  <Td align="right">
                    <span
                      className={cn(
                        "font-mono text-[13.5px]",
                        totalStock === 0
                          ? "text-body"
                          : lowStock
                            ? "text-accent"
                            : "text-text"
                      )}
                    >
                      {totalStock}
                    </span>
                  </Td>
                  <Td align="right">
                    <button
                      onClick={() => setEditingId(p.id)}
                      className="inline-flex items-center gap-2 h-8 px-3 border border-line-2 text-[12px] text-body hover:text-text hover:border-muted transition-colors"
                    >
                      <Pencil strokeWidth={1.5} className="h-3 w-3" />
                      Edit
                    </button>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditProductDialog
          product={editing}
          open={!!editing}
          onOpenChange={(open) => !open && setEditingId(null)}
        />
      )}
    </>
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
  return <td className={`px-5 py-4 align-middle text-${align}`}>{children}</td>;
}
