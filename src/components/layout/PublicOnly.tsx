"use client";

import { usePathname } from "next/navigation";

/**
 * Conditionally renders children only on storefront routes — admin and any
 * future internal pages should not be wrapped by the public Header/Footer.
 */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
