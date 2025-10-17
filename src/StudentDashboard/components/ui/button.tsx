"use client"

import * as React from "react"
import { cn } from "../../lib/utils"; // ✅ updated path (relative import)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        variant === "outline"
          ? "border border-gray-300 bg-white hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700",
        className
      )}
      {...props}
    />
  )
)
Button.displayName = "Button"
