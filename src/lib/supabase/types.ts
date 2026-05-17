// Hand-written DB types — kept in sync with supabase/migration.sql.
// (You can regenerate via `npx supabase gen types typescript` later if you wire up the CLI.)

export type Category = "headphones" | "earbuds" | "speakers";
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type ProductFeature = { icon: string; title: string; body: string };
export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  country: string;
  postal_code: string;
};
export type OrderItem = {
  product_id: string;
  variant_id: string;
  product_name: string;
  variant_color: string;
  qty: number;
  unit_price: number; // cents
};

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  base_price: number; // cents
  features: ProductFeature[];
  specs: Record<string, string>;
  in_box: string[];
  created_at: string;
}

export interface VariantRow {
  id: string;
  product_id: string;
  color_name: string;
  color_hex: string;
  image_urls: string[];
  sku: string;
  stock: number;
}

export interface OrderRow {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  coupon_code: string | null;
  total: number;
  status: OrderStatus;
  payment_method: "cod";
  notes: string | null;
  created_at: string;
}

export interface ShippingSettings {
  flat_fee_cents: number;
  free_threshold_cents: number;
  enabled: boolean;
}

export interface SettingsRow {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export type CouponDiscountType = "percent" | "fixed";

export interface CouponRow {
  id: string;
  code: string;
  description: string | null;
  discount_type: CouponDiscountType;
  discount_value: number;
  min_subtotal: number;
  max_uses: number | null;
  uses_count: number;
  valid_until: string | null;
  active: boolean;
  created_at: string;
}

// Joined shape used by product detail + grids
export type ProductWithVariants = ProductRow & { variants: VariantRow[] };

// Matches the shape Supabase's typed client expects.
export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: Omit<ProductRow, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<ProductRow>;
        Relationships: [];
      };
      product_variants: {
        Row: VariantRow;
        Insert: Omit<VariantRow, "id"> & { id?: string };
        Update: Partial<VariantRow>;
        Relationships: [];
      };
      orders: {
        Row: OrderRow;
        Insert: Omit<OrderRow, "id" | "created_at" | "status"> & {
          id?: string;
          created_at?: string;
          status?: OrderStatus;
        };
        Update: Partial<OrderRow>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
