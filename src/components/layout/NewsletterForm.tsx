"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        toast.success("You're on the list", {
          description: "We'll be in touch with the next drop.",
        });
        setEmail("");
      }}
      className="mt-8 flex items-center pb-3 border-b border-line-2 max-w-[360px]"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for new editions"
        className="flex-1 bg-transparent border-none text-[13px] text-text placeholder:text-quiet outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="text-text hover:text-accent transition-colors"
      >
        <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
      </button>
    </form>
  );
}
