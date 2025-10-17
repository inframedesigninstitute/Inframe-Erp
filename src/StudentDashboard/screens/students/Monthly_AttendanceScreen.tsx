import { useMemo } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

type AttendanceMonthRow = {
  monthLabel: string
  present: number
  total: number
}

// Mock monthly data
const MOCK_MONTHLY_BASE = [
  { date: "2025-09-10", present: 1, total: 1 },
  { date: "2025-09-18", present: 0, total: 1 },
  { date: "2025-09-05", present: 1, total: 1 },
  { date: "2025-09-22", present: 1, total: 1 },
  { date: "2025-09-25", present: 2, total: 2 },
  { date: "2025-10-03", present: 1, total: 2 },
  { date: "2025-10-05", present: 2, total: 2 },
  { date: "2025-10-06", present: 1, total: 1 },
  { date: "2025-10-08", present: 0, total: 1 },
  { date: "2025-10-10", present: 1, total: 1 },
]

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

function monthLabel(d: Date) {
  return `${d.toLocaleString("en-US", { month: "long" })} - ${d.getFullYear()}`
}

export default function Monthly_AttendanceScreen() {
  const rows = useMemo<AttendanceMonthRow[]>(() => {
    const bucket = new Map<string, { label: string; present: number; total: number }>()
    for (const e of MOCK_MONTHLY_BASE) {
      const d = new Date(e.date)
      const key = monthKey(d)
      const label = monthLabel(d)
      if (!bucket.has(key)) bucket.set(key, { label, present: 0, total: 0 })
      const item = bucket.get(key)!
      item.present += e.present
      item.total += e.total
    }

    
    const sorted = Array.from(bucket.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([, v]) => ({ monthLabel: v.label, present: v.present, total: v.total }))
    return sorted
  }, [])

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Monthwise Attendance</Text>
       
      </View>

      {/* Table */}
      <View style={styles.tableWrapper}>
      
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.cellMonth, styles.tableHeaderText]}>Month</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText, styles.textCenter]}>Present</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText, styles.textCenter]}>Total Class</Text>
        </View>

        
        {rows.map((row, idx) => (
          <View
            key={row.monthLabel}
            style={[
              styles.tableRow,
              idx % 2 === 1 ? styles.altRow : styles.normalRow,
            ]}
          >
            <Text style={[styles.tableCell, styles.cellMonth]}>{row.monthLabel}</Text>
            <Text style={[styles.tableCell, styles.textCenter]}>{row.present}</Text>
            <Text style={[styles.tableCell, styles.textCenter]}>{row.total}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e7e7ff",
  },
  header: {
    backgroundColor: "#ffffffff",
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
    overflow: "hidden",
  },
  headerTitle: {
    color: "#000000ff",
    fontSize: 22,
    fontWeight: "600",
  },
//   headerEllipse: {
//     position: "absolute",
//     right: "-30%",
//     bottom: "-40%",
//     width: "80%",
//     height: "120%",
//     backgroundColor: "#2563EB",
//     borderRadius: 200,
//     opacity: 0.3,
//   },
  tableWrapper: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffffffff",
    overflow: "hidden",
    elevation: 1,
  },
  tableHeader: {
    backgroundColor: "#EFF6FF",
  },
  tableHeaderText: {
    fontWeight: "600",
    color: "#000000ff",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#9c9898ff",
  },
  tableCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#0e121bff",
    
  },
  cellMonth: {
    flex: 1.5,
  },
  textCenter: {
    textAlign: "center",
  },
  altRow: {
    backgroundColor: "#ffffffff",
  },
  normalRow: {
    backgroundColor: "#ffffffff",
  },
})
