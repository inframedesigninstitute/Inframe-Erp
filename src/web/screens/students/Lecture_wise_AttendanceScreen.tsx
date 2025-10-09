import { Picker } from "@react-native-picker/picker";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type AttendanceStatus = "P" | "A" | "L" | "H" | "";

type CourseAttendance = {
  course: string;
  days: AttendanceStatus[];
};

const MONTHS = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const YEARS = [2025, 2024, 2023, 2022, 2021];

function getDaysInMonth(year: number, month1to12: number) {
  return new Date(year, month1to12, 0).getDate();
}

function padDay(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function summarize(days: AttendanceStatus[]) {
  const p = days.filter((d) => d === "P").length;
  const a = days.filter((d) => d === "A").length;
  const l = days.filter((d) => d === "L").length;
  const h = days.filter((d) => d === "H").length;
  const denom = p + a + l;
  const pct = denom > 0 ? Math.round((p / denom) * 100) : 0;
  return { p, a, l, h, pct };
}

export default function Lecture_wise_AttendanceScreen() {
  const [month, setMonth] = useState<number>(10);
  const [year, setYear] = useState<number>(2025);

  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const dayNumbers = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);

  const [courses, setCourses] = useState<CourseAttendance[]>(() => {
    const empty = Array.from({ length: daysInMonth }, () => "" as AttendanceStatus);
    return [
      { course: "CSE607", days: [...empty] },
      { course: "EN105", days: [...empty] },
      { course: "MAT211", days: [...empty] },
      { course: "PH308", days: [...empty] },
    ];
  });

  // Reset courses when month/year changes
  useMemo(() => {
    const empty = Array.from({ length: daysInMonth }, () => "" as AttendanceStatus);
    setCourses([
      { course: "CSE607", days: [...empty] },
      { course: "EN105", days: [...empty] },
      { course: "MAT211", days: [...empty] },
      { course: "PH308", days: [...empty] },
    ]);
  }, [daysInMonth]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>

      <View style={styles.filters}>
        <View style={styles.pickerGroup}>
          <Text style={styles.label}>Month</Text>
          <Picker selectedValue={month} onValueChange={(v) => setMonth(v)} style={styles.picker}>
            {MONTHS.map((m) => (
              <Picker.Item key={m.value} label={m.label} value={m.value} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerGroup}>
          <Text style={styles.label}>Year</Text>
          <Picker selectedValue={year} onValueChange={(v) => setYear(v)} style={styles.picker}>
            {YEARS.map((y) => (
              <Picker.Item key={y} label={String(y)} value={y} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendText}>
          Present: <Text style={[styles.legendCode, styles.present]}>P</Text> |{" "}
          Absent: <Text style={[styles.legendCode, styles.absent]}>A</Text> |{" "}
          Leave: <Text style={[styles.legendCode, styles.leave]}>L</Text> |{" "}
          Holiday: <Text style={[styles.legendCode, styles.holiday]}>H</Text>
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator style={{ flex: 1 }}>
        <View>
          {/* Header Row */}
          <View style={[styles.row, styles.headerRow]}>
            <View style={[styles.cellCourse, styles.headerCell]}>
              <Text style={styles.headerText}>Course</Text>
            </View>
            {dayNumbers.map((d) => (
              <View key={`hdr-${d}`} style={[styles.cellDay, styles.headerCell]}>
                <Text style={styles.headerText}>{padDay(d)}</Text>
              </View>
            ))}
            <View style={[styles.cellSummary, styles.headerCell]}>
              <Text style={styles.headerText}>P</Text>
            </View>
            <View style={[styles.cellSummary, styles.headerCell]}>
              <Text style={styles.headerText}>A</Text>
            </View>
            <View style={[styles.cellSummary, styles.headerCell]}>
              <Text style={styles.headerText}>L</Text>
            </View>
            <View style={[styles.cellSummary, styles.headerCell]}>
              <Text style={styles.headerText}>H</Text>
            </View>
            <View style={[styles.cellPct, styles.headerCell]}>
              <Text style={styles.headerText}>%</Text>
            </View>
          </View>

          {/* Body Rows */}
          {courses.map((c) => {
            const { p, a, l, h, pct } = summarize(c.days);
            return (
              <View key={c.course} style={styles.row}>
                <View style={[styles.cellCourse, styles.bodyCell]}>
                  <Text style={styles.bodyText}>{c.course}</Text>
                </View>

                {dayNumbers.map((d, idx) => {
                  const val = c.days[idx] || "";
                  const statusStyle =
                    val === "P"
                      ? styles.present
                      : val === "A"
                      ? styles.absent
                      : val === "L"
                      ? styles.leave
                      : val === "H"
                      ? styles.holiday
                      : styles.empty;
                  return (
                    <View key={`${c.course}-${d}`} style={[styles.cellDay, styles.bodyCell]}>
                      <Text style={[styles.bodyText, statusStyle]}>{val}</Text>
                    </View>
                  );
                })}

                <View style={[styles.cellSummary, styles.bodyCell]}>
                  <Text style={styles.bodyText}>{p}</Text>
                </View>
                <View style={[styles.cellSummary, styles.bodyCell]}>
                  <Text style={styles.bodyText}>{a}</Text>
                </View>
                <View style={[styles.cellSummary, styles.bodyCell]}>
                  <Text style={styles.bodyText}>{l}</Text>
                </View>
                <View style={[styles.cellSummary, styles.bodyCell]}>
                  <Text style={styles.bodyText}>{h}</Text>
                </View>
                <View style={[styles.cellPct, styles.bodyCell]}>
                  <Text style={styles.bodyText}>{pct} %</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  filters: { flexDirection: "row", gap: 12, marginBottom: 12 },
  pickerGroup: { flex: 1 },
  label: { fontSize: 12, color: "#000000ff", marginBottom: 6 },
  picker: { backgroundColor: "#f2f2f2", borderRadius: 6 },

  legend: { marginBottom: 8 },
  legendText: { color: "#333" },
  legendCode: { fontWeight: "700" },
  present: { color: "#2563eb" },
  absent: { color: "#dc2626" },
  leave: { color: "#16a34a" },
  holiday: { color: "#d97706" },
  empty: { color: "#666" },

  row: { flexDirection: "row" },
  headerRow: { backgroundColor: "#91a4e4ff" },
  headerCell: { paddingVertical: 8, paddingHorizontal: 6, borderWidth: 1, borderColor: "#334155" },
  headerText: { color: "#000000ff", fontWeight: "600", textAlign: "center" },

  bodyCell: { paddingVertical: 10, paddingHorizontal: 6, borderWidth: 1, borderColor: "#030305ff" },
  bodyText: { color: "#111827", textAlign: "center" },

  cellCourse: { width: 96, justifyContent: "center" },
  cellDay: { width: 44, justifyContent: "center" },
  cellSummary: { width: 44, justifyContent: "center" },
  cellPct: { width: 64, justifyContent: "center" },
});
