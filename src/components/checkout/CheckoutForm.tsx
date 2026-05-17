"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";
import { ArrowRight, Banknote } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderSummary } from "./OrderSummary";
import { CouponInput } from "./CouponInput";
import { useCart } from "@/lib/cart/CartProvider";
import { placeOrder } from "@/app/checkout/actions";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  country: string;
  postal_code: string;
  notes: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  country: "",
  postal_code: "",
  notes: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, discount, shipping, total, coupon, clear } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleChange =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    startTransition(async () => {
      const result = await placeOrder({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shipping: {
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city,
          country: form.country,
          postal_code: form.postal_code,
        },
        notes: form.notes || undefined,
        couponCode: coupon?.code,
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          qty: i.qty,
        })),
      });

      if (!result.ok) {
        setError(result.error);
        toast.error("Could not place order", { description: result.error });
        return;
      }

      clear();
      router.push(`/order-confirmed?order_id=${result.orderId}`);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
      <form onSubmit={onSubmit} className="space-y-10" noValidate>
        {/* CONTACT */}
        <fieldset className="space-y-6">
          <legend className="text-[11px] font-mono text-accent tracking-wider mb-5">
            01 / CONTACT
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Full name" required>
              <Input
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange("name")}
                required
              />
            </Field>
            <Field label="Email" required>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange("email")}
                required
              />
            </Field>
          </div>

          <Field label="Phone (we call before delivery)" required>
            <Input
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              required
              placeholder="+351 91 234 5678"
            />
          </Field>
        </fieldset>

        {/* SHIPPING */}
        <fieldset className="space-y-6 pt-6 border-t border-line">
          <legend className="text-[11px] font-mono text-accent tracking-wider mb-5">
            02 / SHIPPING
          </legend>

          <Field label="Address" required>
            <Input
              name="line1"
              autoComplete="address-line1"
              value={form.line1}
              onChange={handleChange("line1")}
              required
              placeholder="Rua das Flores 22"
            />
          </Field>

          <Field label="Apartment, suite, etc.">
            <Input
              name="line2"
              autoComplete="address-line2"
              value={form.line2}
              onChange={handleChange("line2")}
              placeholder="3rd floor"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="City" required>
              <Input
                name="city"
                autoComplete="address-level2"
                value={form.city}
                onChange={handleChange("city")}
                required
              />
            </Field>
            <Field label="Postal code" required>
              <Input
                name="postal_code"
                autoComplete="postal-code"
                value={form.postal_code}
                onChange={handleChange("postal_code")}
                required
              />
            </Field>
            <Field label="Country" required>
              <Input
                name="country"
                autoComplete="country-name"
                value={form.country}
                onChange={handleChange("country")}
                required
                placeholder="Portugal"
              />
            </Field>
          </div>
        </fieldset>

        {/* COUPON */}
        <fieldset className="space-y-4 pt-6 border-t border-line">
          <legend className="text-[11px] font-mono text-accent tracking-wider mb-3">
            03 / COUPON &nbsp;<span className="text-quiet">(OPTIONAL)</span>
          </legend>
          <CouponInput />
        </fieldset>

        {/* NOTES */}
        <fieldset className="space-y-6 pt-6 border-t border-line">
          <legend className="text-[11px] font-mono text-accent tracking-wider mb-5">
            04 / DELIVERY NOTES &nbsp;<span className="text-quiet">(OPTIONAL)</span>
          </legend>
          <Field label="Anything we should know for the courier?">
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange("notes")}
              className="flex w-full border border-[#303030] hover:border-[#4A4A4A] focus:border-accent bg-[#1A1A1A] focus:bg-[#1F1F1F] px-4 py-3 text-[14px] text-text placeholder:text-quiet focus:outline-none transition-colors duration-200 resize-y"
              placeholder="Buzzer is broken — please call on arrival."
            />
          </Field>
        </fieldset>

        {/* PAYMENT NOTICE */}
        <div className="bg-surface border border-line p-5 md:p-6 flex items-start gap-4">
          <div className="inline-flex w-10 h-10 shrink-0 items-center justify-center border border-line-2 text-accent">
            <Banknote strokeWidth={1.5} className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[14px] font-medium text-text mb-1">
              Cash on delivery.
            </div>
            <p className="text-[12.5px] text-muted leading-relaxed max-w-prose">
              Pay the courier in cash when your order arrives. We&apos;ll call to confirm
              the delivery window before we ship.
            </p>
          </div>
        </div>

        {error && (
          <div className="text-[13px] text-[#FB7185] border border-[#FB7185]/30 bg-[#FB7185]/10 px-4 py-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending || items.length === 0}
          className={cn(
            "group inline-flex items-center justify-center gap-3 w-full h-14 px-6",
            "text-[14px] font-medium tracking-tight transition-all duration-300 ease-smooth",
            "disabled:cursor-not-allowed",
            pending || items.length === 0
              ? "bg-surface text-quiet border border-line"
              : "bg-accent text-bg hover:bg-text hover:gap-5"
          )}
        >
          {pending ? "Placing order…" : "Place order — Cash on Delivery"}
          {!pending && items.length > 0 && (
            <ArrowRight strokeWidth={1.75} className="h-4 w-4" />
          )}
        </button>

        <p className="text-[11px] font-mono text-quiet tracking-wider text-center">
          BY PLACING YOUR ORDER YOU AGREE TO THE{" "}
          <Link href="#" className="text-muted hover:text-text transition-colors">
            TERMS
          </Link>{" "}
          &amp;{" "}
          <Link href="#" className="text-muted hover:text-text transition-colors">
            PRIVACY POLICY
          </Link>
          .
        </p>
      </form>

      <OrderSummary
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        discount={discount}
        couponCode={coupon?.code ?? null}
        total={total}
      />
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="flex items-center gap-1.5">
        {label}
        {required && (
          <span className="text-accent text-[14px] -mt-0.5" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
    </div>
  );
}
