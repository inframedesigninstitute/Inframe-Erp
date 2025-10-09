"use client"

import { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { Calendar } from "../components/ui/calendar"

type CalendarInputProps = {
  label?: string
  value?: string
  onChange?: (val: string) => void
}

export function CalendarInput({
  label = "Date of Birth",
  value,
  onChange,
}: CalendarInputProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  )

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate && onChange) {
      const formatted = selectedDate.toISOString().split("T")[0]
      onChange(formatted)
    }
    setOpen(false)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable style={styles.button} onPress={() => setOpen(!open)}>
        <Text style={styles.buttonText}>
          {date ? date.toLocaleDateString() : "Select date"}
        </Text>
        <Icon name="keyboard-arrow-down" size={20} color="#555" />
      </Pressable>

      {open && (
        <View style={styles.popover}>
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
    marginVertical: 8,
    width:400
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000ff",
    paddingHorizontal: 4,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#000",
  },
  popover: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // shadowOffset: { width: 0, height: 2 },
  },
})
