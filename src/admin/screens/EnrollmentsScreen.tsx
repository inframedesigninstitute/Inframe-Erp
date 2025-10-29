"use client"

import { useState } from "react"
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"

interface ScheduleEntry {
  id: string
  subject: string
  teacher?: string
  room?: string
  day: Day
  startHour: number
  duration?: number
  color?: string
  notes?: string
}

interface UploadedFile {
  name: string
  uri?: string
  size?: number
  type?: string
  source?: "web" | "native"
}

const HOURS = [9, 10, 11, 12, 13, 14, 15]
const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const generateId = () => Date.now().toString() + Math.random().toString(36).slice(2, 7)

export default function EnrollmentsScreen(): React.JSX.Element {
  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([
    {
      id: "e1",
      subject: "MCSC",
      teacher: "Design A",
      room: "Studio A",
      day: "Thursday",
      startHour: 9,
      duration: 1,
      color: "#17a2b8",
    },
    {
      id: "e2",
      subject: "Database",
      teacher: "Lab",
      room: "DB Lab",
      day: "Friday",
      startHour: 9,
      duration: 1,
      color: "#20c997",
    },
    {
      id: "e3",
      subject: "Communication",
      teacher: "Comm Lab",
      room: "Room 12",
      day: "Monday",
      startHour: 10,
      duration: 1,
      color: "#17a2b8",
    },
  ])

  const [selectedEntry, setSelectedEntry] = useState<ScheduleEntry | null>(null)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [uploadFile, setUploadFile] = useState<UploadedFile | null>(null)

  const emptyForm = {
    subject: "",
    teacher: "",
    room: "",
    day: "Monday" as Day,
    startHour: HOURS[0],
    duration: 1,
    color: "#17a2b8",
    notes: "",
  }
  const [form, setForm] = useState({ ...emptyForm })

  // ---------- CRUD Handlers ----------
  const openAddModalForSlot = (day?: Day, startHour?: number) => {
    setForm({
      ...emptyForm,
      day: day ?? "Monday",
      startHour: startHour ?? HOURS[0],
    })
    setAddModalOpen(true)
  }

  const handleSaveNew = () => {
    if (!form.subject.trim()) {
      Alert.alert("Validation", "Subject is required.")
      return
    }
    const newEntry: ScheduleEntry = {
      id: generateId(),
      subject: form.subject.trim(),
      teacher: form.teacher?.trim(),
      room: form.room?.trim(),
      day: form.day,
      startHour: Number(form.startHour),
      duration: Number(form.duration || 1),
      color: form.color,
      notes: (form as any).notes,
    }
    setScheduleEntries((s) => [...s, newEntry])
    setAddModalOpen(false)
  }

  const handleOpenEdit = (entry: ScheduleEntry) => {
    setSelectedEntry(entry)
    setForm({
      subject: entry.subject,
      teacher: entry.teacher ?? "",
      room: entry.room ?? "",
      day: entry.day,
      startHour: entry.startHour,
      duration: entry.duration ?? 1,
      color: entry.color ?? "#17a2b8",
      notes: entry.notes ?? "",
    })
    setEditModalOpen(true)
  }

  const handleUpdate = () => {
    if (!selectedEntry) return
    if (!form.subject.trim()) {
      Alert.alert("Validation", "Subject is required.")
      return
    }
    setScheduleEntries((prev) =>
      prev.map((p) =>
        p.id === selectedEntry.id
          ? { ...p, ...form }
          : p
      )
    )
    setEditModalOpen(false)
    setSelectedEntry(null)
  }

  const handleDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete this class?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setScheduleEntries((s) => s.filter((x) => x.id !== id))
          setEditModalOpen(false)
          setSelectedEntry(null)
        },
      },
    ])
  }

  // ---------- Upload Timetable ----------
  const handleUpload = async () => {
    try {
      if (Platform.OS === "web") {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".pdf,image/*"
        input.onchange = (e: any) => {
          const file = e.target.files?.[0]
          if (!file) return
          setUploadFile({
            name: file.name,
            uri: URL.createObjectURL(file),
            size: file.size,
            type: file.type,
            source: "web",
          })
          Alert.alert("Uploaded", `${file.name} selected.`)
        }
        input.click()
      } else {
        const DocumentPicker = require("react-native-document-picker")
        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        })
        setUploadFile({
          name: res.name ?? "file",
          uri: res.uri,
          size: res.size,
          type: res.type,
          source: "native",
        })
        Alert.alert("Uploaded", `${res.name ?? "file"} selected.`)
      }
    } catch (err: any) {
      if (Platform.OS !== "web") {
        const DocumentPicker = require("react-native-document-picker")
        if (!DocumentPicker.isCancel(err)) {
          Alert.alert("Error", "File selection failed")
        }
      }
    }
  }

  const entriesForCell = (day: Day, hour: number) =>
    scheduleEntries.filter((e) => e.day === day && e.startHour === hour)

  // ---------- JSX ----------
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.pageTitle}>🗓️ Edit Student Class Schedule</Text>

        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => openAddModalForSlot()}>
            <Text style={styles.iconPlus}>＋</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadText}>Upload Timetable</Text>
          </TouchableOpacity>
        </View>
      </View>

      {uploadFile && (
        <View style={styles.uploadInfo}>
          <Text style={{ fontWeight: "600" }}>Uploaded:</Text>
          <Text numberOfLines={1} style={{ marginLeft: 8 }}>
            {uploadFile.name}
          </Text>
        </View>
      )}

      <View style={styles.filterRow}>
        <Text style={styles.filterHint}>Tap an empty cell to add a class. Tap a chip to edit.</Text>
      </View>

      <View style={styles.gridWrap}>
        <View style={styles.gridHeaderRow}>
          <View style={[styles.gridHeaderCell, styles.sideLabel]} />
          {HOURS.map((h) => (
            <View key={h} style={styles.gridHeaderCell}>
              <Text style={styles.headerText}>
                {h}-{h + 1}
              </Text>
            </View>
          ))}
        </View>

        {DAYS.map((day) => (
          <View key={day} style={styles.gridRow}>
            <View style={[styles.gridSideCell]}>
              <Text style={styles.dayText}>{day}</Text>
            </View>

            {HOURS.map((h) => {
              const cellEntries = entriesForCell(day, h)
              return (
                <TouchableOpacity
                  key={`${day}-${h}`}
                  activeOpacity={0.8}
                  style={styles.gridCell}
                  onPress={() => openAddModalForSlot(day, h)}
                >
                  {cellEntries.map((entry) => (
                    <TouchableOpacity
                      key={entry.id}
                      style={[styles.chip, { backgroundColor: entry.color || "#17a2b8" }]}
                      onPress={() => handleOpenEdit(entry)}
                    >
                      <Text style={styles.chipTitle}>{entry.subject}</Text>
                      <Text style={styles.chipSub}>
                        {entry.teacher ?? ""} {entry.room ? `• ${entry.room}` : ""}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>

      {/* ================== Modals (Add & Edit) omitted for brevity ================== */}
    </ScrollView>
  )
}

/* ==================== styles ==================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fb", padding: 16 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  pageTitle: { fontSize: 22, fontWeight: "700", color: "#1f2d5a" },
  topButtons: { flexDirection: "row", alignItems: "center", gap: 8 },

  iconButton: {
    backgroundColor: "#0f766e",
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconPlus: { color: "#fff", fontSize: 22, fontWeight: "700" },

  uploadButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  uploadText: { color: "#fff", fontWeight: "700" },

  uploadInfo: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  filterRow: { marginBottom: 12 },
  filterHint: { color: "#6b7280" },

  gridWrap: { borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: "#e6eef6", backgroundColor: "#fff" },
  gridHeaderRow: { flexDirection: "row", backgroundColor: "#f3f7fb", borderBottomWidth: 1, borderColor: "#eef3f7" },
  gridHeaderCell: { flex: 1, padding: 12, alignItems: "center", justifyContent: "center", minWidth: 86 },
  sideLabel: { flex: 0.9, minWidth: 110, alignItems: "center", justifyContent: "center" },
  headerText: { fontWeight: "700", color: "#334155" },

  gridRow: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#eef3f7" },
  gridSideCell: { width: 110, padding: 14, justifyContent: "center" },
  dayText: { fontWeight: "700", color: "#0f172a" },
  gridCell: { flex: 1, minHeight: 80, padding: 6, alignItems: "center", justifyContent: "center" },

  chip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 6,
    minWidth: 80,
    maxWidth: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  chipTitle: { color: "#fff", fontWeight: "800", fontSize: 13 },
  chipSub: { color: "#e6f6f7", fontSize: 11, marginTop: 4 },
})
