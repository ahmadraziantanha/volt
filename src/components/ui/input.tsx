import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-12 w-full border bg-[#1A1A1A] px-4 py-3 text-[14px] text-text",
          "border-[#303030] hover:border-[#4A4A4A]",
          "placeholder:text-quiet",
          "focus:outline-none focus:border-accent focus:bg-[#1F1F1F]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
