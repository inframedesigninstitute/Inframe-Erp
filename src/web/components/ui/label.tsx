"use client"

import * as React from "react"

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  children,
  ...props
}) => (
  <label className={`text-sm font-medium text-gray-700 ${className || ""}`} {...props}>
    {children}
  </label>
)
