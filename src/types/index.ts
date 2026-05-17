export type { Category, OrderStatus, ProductRow, VariantRow, OrderRow, ProductWithVariants, ShippingAddress, OrderItem, ProductFeature } from "@/lib/supabase/types";

export interface CartItem {
  productId: string;
  variantId: string;
  productSlug: string;
  productName: string;
  variantColor: string;
  variantHex: string;
  unitPrice: number; // cents
  imageUrl: string;
  qty: number;
}
