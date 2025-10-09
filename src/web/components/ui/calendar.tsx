"use client"

import * as React from "react"

type CalendarProps = {
  mode: "single"
  selected?: Date
  captionLayout?: "dropdown"
  onSelect?: (date: Date | undefined) => void
}

export const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  return (
    <input
      type="date"
      className="border rounded-md p-2 w-full"
      value={selected ? selected.toISOString().split("T")[0] : ""}
      onChange={(e) => {
        const val = e.target.value ? new Date(e.target.value) : undefined
        onSelect?.(val)
      }}
    />
  )
}
