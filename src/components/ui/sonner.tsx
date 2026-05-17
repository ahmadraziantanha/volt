"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      theme="dark"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "!bg-surface !border !border-line-2 !text-text !rounded-none !shadow-2xl",
          title: "!text-text !font-medium",
          description: "!text-body",
          actionButton: "!bg-accent !text-bg !rounded-none",
          cancelButton: "!bg-line !text-text !rounded-none",
        },
      }}
    />
  );
}
