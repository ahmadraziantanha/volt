"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types";
import type { CouponDiscountType, ShippingSettings } from "@/lib/supabase/types";

const STORAGE_KEY = "volt:cart:v1";
const COUPON_STORAGE_KEY = "volt:coupon:v1";

const DEFAULT_SHIPPING: ShippingSettings = {
  flat_fee_cents: 1500,
  free_threshold_cents: 20000,
  enabled: true,
};

type AddInput = Omit<CartItem, "qty"> & { qty?: number };

export interface AppliedCoupon {
  code: string;
  discount: number; // cents
  type: CouponDiscountType;
  value: number; // raw value (percent 1-100 or cents)
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  coupon: AppliedCoupon | null;
  setCoupon: (c: AppliedCoupon | null) => void;
  isOpen: boolean;
  isHydrated: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: AddInput) => void;
  remove: (variantId: string) => void;
  updateQty: (variantId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
  shipping?: ShippingSettings;
}

export function CartProvider({ children, shipping: shippingSettings }: CartProviderProps) {
  const settings = shippingSettings ?? DEFAULT_SHIPPING;
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCouponState] = useState<AppliedCoupon | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
      const couponRaw = window.localStorage.getItem(COUPON_STORAGE_KEY);
      if (couponRaw) {
        const parsed = JSON.parse(couponRaw);
        if (parsed && typeof parsed.code === "string") setCouponState(parsed);
      }
    } catch {}
    setIsHydrated(true);
  }, []);

  // Persist on change (after hydration only)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (coupon) {
        window.localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      } else {
        window.localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {}
  }, [coupon, isHydrated]);

  const setCoupon = useCallback((c: AppliedCoupon | null) => {
    setCouponState(c);
  }, []);

  const add = useCallback((input: AddInput) => {
    const qty = input.qty ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === input.variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === input.variantId ? { ...i, qty: i.qty + qty } : i
        );
      }
      const { qty: _q, ...rest } = input;
      return [...prev, { ...rest, qty }];
    });
  }, []);

  const remove = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const updateQty = useCallback((variantId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.variantId !== variantId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setCouponState(null);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((x) => !x), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);

    // Recompute discount client-side from raw value, in case subtotal changed.
    let discount = 0;
    if (coupon) {
      discount =
        coupon.type === "percent"
          ? Math.floor((subtotal * coupon.value) / 100)
          : Math.min(subtotal, coupon.value);
    }

    const shippingEnabled = settings.enabled;
    const shipping =
      !shippingEnabled || subtotal === 0
        ? 0
        : subtotal >= settings.free_threshold_cents
          ? 0
          : settings.flat_fee_cents;

    const total = Math.max(0, subtotal - discount + shipping);
    const amountToFreeShipping = Math.max(0, settings.free_threshold_cents - subtotal);

    return {
      items,
      count,
      subtotal,
      discount,
      shipping,
      total,
      freeShippingThreshold: settings.free_threshold_cents,
      amountToFreeShipping,
      coupon,
      setCoupon,
      isOpen,
      isHydrated,
      open,
      close,
      toggle,
      add,
      remove,
      updateQty,
      clear,
    };
  }, [items, coupon, settings, isOpen, isHydrated, open, close, toggle, add, remove, updateQty, clear, setCoupon]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
