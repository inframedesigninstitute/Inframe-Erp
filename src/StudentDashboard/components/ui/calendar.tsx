"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

type CalendarProps = {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

export const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: 8, padding: 10 }}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        captionLayout="dropdown"  // ✅ supported option
        showOutsideDays              // ✅ shows days from previous/next month
        fixedWeeks                   // ✅ keeps rows consistent
      />
    </div>
  )
}
