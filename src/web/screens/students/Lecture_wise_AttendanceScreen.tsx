import { useMemo, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

type AttendanceEntry = {
  subject: string
  date: string // ISO date: YYYY-MM-DD
  total: number
  present: number
}

const SUBJECTS = [
  "COMPUTER NETWORKS",
  "DATA STRUCTURES USING C++",
  "DATABASE MANAGEMENT SYSTEMS",
  "G2- DATA STRUCTURES LAB USING C++",
  "G2- DBMS LAB",
  "G2- WEB DEVELOPMENT LAB",
  "MATHEMATICAL FOUNDATIONS OF COMPUTER SCIENCE",
  "SOFTWARE PROJECT MANAGEMENT",
  "WEB DEVELOPMENT",
]

const MOCK_DATA: AttendanceEntry[] = [
  { subject: "COMPUTER NETWORKS", date: "2025-09-10", total: 1, present: 1 },
  { subject: "COMPUTER NETWORKS", date: "2025-09-18", total: 1, present: 0 },
  { subject: "DATA STRUCTURES USING C++", date: "2025-09-05", total: 1, present: 1 },
  { subject: "DATABASE MANAGEMENT SYSTEMS", date: "2025-09-22", total: 1, present: 1 },
  { subject: "G2- DATA STRUCTURES LAB USING C++", date: "2025-09-25", total: 2, present: 2 },
  { subject: "G2- DBMS LAB", date: "2025-10-03", total: 2, present: 1 },
  { subject: "G2- WEB DEVELOPMENT LAB", date: "2025-10-05", total: 2, present: 2 },
  { subject: "MATHEMATICAL FOUNDATIONS OF COMPUTER SCIENCE", date: "2025-10-06", total: 1, present: 1 },
  { subject: "SOFTWARE PROJECT MANAGEMENT", date: "2025-10-08", total: 1, present: 0 },
  { subject: "WEB DEVELOPMENT", date: "2025-10-10", total: 1, present: 1 },
]

function formatDisplayDate(d?: string) {
  if (!d) return ""
  const dt = new Date(d)
  const dd = String(dt.getDate()).padStart(2, "0")
  const mm = String(dt.getMonth() + 1).padStart(2, "0")
  const yyyy = dt.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

export default function LectureWiseAttendanceScreen() {
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), [])
  const [fromDate, setFromDate] = useState(todayIso)
  const [toDate, setToDate] = useState(todayIso)
  const [results, setResults] = useState<Array<{ subject: string; total: number; present: number }>>([])

  function handleGo() {
    const from = new Date(fromDate)
    const to = new Date(toDate)

    const inRange = (iso: string) => {
      const d = new Date(iso)
      return d >= from && d <= to
    }

    const rows = SUBJECTS.map((s) => {
      const entries = MOCK_DATA.filter((e) => e.subject === s && inRange(e.date))
      const total = entries.reduce((sum, e) => sum + e.total, 0)
      const present = entries.reduce((sum, e) => sum + e.present, 0)
      return { subject: s, total, present }
    })
    setResults(rows)
  }

  const tableData = results.length ? results : SUBJECTS.map((s) => ({ subject: s, total: 0, present: 0 }))

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ATTENDANCE</Text>
      </View>

      {/* Filter Section */}
      <View style={styles.filterCard}>
        {/* From Date */}
        <View style={styles.dateRow}>
          <View style={styles.dateLabel}>
            <Icon name="calendar-today" size={20} color="#000000ff" />
            <Text style={styles.labelText}>From Date</Text>
          </View>
          <TextInput
            style={styles.dateInput}
            placeholder="YYYY-MM-DD"
            value={fromDate}
            onChangeText={setFromDate}
          />
        </View>

        {/* To Date */}
        <View style={[styles.dateRow, { borderTopWidth: 1, borderTopColor: "#ddd" }]}>
          <View style={styles.dateLabel}>
            <Icon name="calendar-today" size={20} color="#000000ff" />
            <Text style={styles.labelText}>To Date</Text>
          </View>
          <TextInput
            style={styles.dateInput}
            placeholder="YYYY-MM-DD"
            value={toDate}
            onChangeText={setToDate}
          />
        </View>

        {/* GO Button */}
        <TouchableOpacity style={styles.goButton} onPress={handleGo}>
          <Text style={styles.goButtonText}>GO </Text>
        </TouchableOpacity>
      </View>

      {/* Table Section */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Subject</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: "center" }]}>Total Lecture</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: "center" }]}>Class Attd.</Text>
        </View>

        {tableData.map((row, idx) => (
          <View
            key={row.subject}
            style={[
              styles.tableRow,
              { backgroundColor: idx % 2 === 0 ? "#fff" : "#f5f5f5" },
            ]}
          >
            <Text style={[styles.tableCell, { flex: 2 }]}>{row.subject}</Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: "center" }]}>{row.total}</Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: "center" }]}>{row.present}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    backgroundColor: "#fcfcfcff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#000000ff" },

  filterCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 2,
    color:"#000000ff"
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dateLabel: { flexDirection: "row", alignItems: "center", gap: 8 },
  labelText: { fontSize: 15, color: "#000000ff", marginLeft: 6 },
  dateInput: {
    borderWidth: 1,
    borderColor: "#070606ff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 120,
    textAlign: "center",
    fontSize: 14,
  },
  goButton: {
    alignSelf: "flex-end",
    backgroundColor: "#d6d8dbff",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 16,
    marginTop: 8,
  },
  goButtonText: { color: "#000000ff", fontWeight: "600" },

  table: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#050404ff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ffe7e7ff",
    paddingVertical: 10,
  },
  tableHeaderCell: {
    color: "#000000ff",
    fontWeight: "700",
    fontSize: 13,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableCell: {
    fontSize: 13,
    color: "#000000ff",
    paddingHorizontal: 8,
  },
})
