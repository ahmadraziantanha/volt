"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart/CartProvider";

/**
 * Ensures the cart is emptied when the user lands on /order-confirmed.
 * Belt-and-braces — the form already clears the cart before redirecting,
 * but if a user shares or refreshes the confirmation URL the lingering
 * items would persist.
 */
export function ClearCartOnMount() {
  const { clear, items } = useCart();
  useEffect(() => {
    if (items.length > 0) clear();
  }, [clear, items.length]);
  return null;
}
