"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Login failed.");
        return;
      }

      router.refresh();
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-surface-2 border border-line-2 p-8 space-y-7"
        noValidate
      >
        <div>
          <div className="inline-flex items-center justify-center w-11 h-11 border border-line-2 text-accent mb-5">
            <Lock strokeWidth={1.5} className="h-5 w-5" />
          </div>
          <div className="text-[11px] font-mono text-accent tracking-wider mb-2">
            VOLT · ADMIN
          </div>
          <h1 className="text-[24px] font-medium text-text tracking-tight">
            Restricted area.
          </h1>
          <p className="text-[13px] text-muted mt-2 leading-relaxed">
            Enter the admin password to access orders and inventory.
          </p>
        </div>

        <div>
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="text-[12px] text-[#FB7185] border border-[#FB7185]/30 bg-[#FB7185]/10 px-4 py-2.5">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending || !password}
          className={cn(
            "group inline-flex items-center justify-center gap-3 w-full h-12 px-6",
            "text-[13px] font-medium tracking-tight transition-all duration-300 ease-smooth",
            "disabled:cursor-not-allowed",
            pending || !password
              ? "bg-surface text-quiet border border-line-2"
              : "bg-accent text-bg hover:bg-text hover:gap-5"
          )}
        >
          {pending ? "Verifying…" : "Sign in"}
          {!pending && password && (
            <ArrowRight strokeWidth={1.75} className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
}
