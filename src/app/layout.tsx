import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PublicOnly } from "@/components/layout/PublicOnly";
import { Toaster } from "@/components/ui/sonner";
import { getShippingSettings } from "@/lib/settings";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "VOLT — Sound, engineered.",
    template: "%s · VOLT",
  },
  description:
    "Reference-grade wireless audio, designed and assembled in Porto. Headphones, earbuds, and speakers for people who actually listen.",
  openGraph: {
    title: "VOLT — Sound, engineered.",
    description: "Reference-grade wireless audio, designed and assembled in Porto.",
    url: "/",
    siteName: "VOLT",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "VOLT", description: "Sound, engineered." },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const shipping = await getShippingSettings();

  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>
        <CartProvider shipping={shipping}>
          <PublicOnly>
            <Header />
          </PublicOnly>
          <main>{children}</main>
          <PublicOnly>
            <Footer />
          </PublicOnly>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
