"use client"

/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
    Alert,
    FlatList,
    Image,
    Linking,
    Modal,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

type Student = { id: string; name: string }
type NoteStatus = "Active" | "Inactive"
type Note = {
  id: string
  studentId: string
  title: string
  body: string
  attachmentName?: string
  attachmentUri?: string
  status: NoteStatus
  createdAt: number
}

const STORAGE_KEY = "@subject_attendance_notes_v1"

const STUDENTS: Student[] = [
  { id: "1000", name: "Art" },
  { id: "1001", name: "graphic " },
  { id: "1003", name: "Carla Ramos" },
  { id: "1004", name: "Marketing " },
  { id: "1006", name: "Photoshop " },
  { id: "1013", name: "UX designer" },
]

export default function Subject_Attendance() {
  // form state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [attachmentName, setAttachmentName] = useState<string | undefined>()
  const [attachmentUri, setAttachmentUri] = useState<string | undefined>()
  const [editingId, setEditingId] = useState<string | null>(null)

  // data
  const [notes, setNotes] = useState<Note[]>([])

  // ui state
  const [studentPickerOpen, setStudentPickerOpen] = useState(false)
  const [viewNote, setViewNote] = useState<Note | null>(null)
  const [search, setSearch] = useState("")
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  // Load + persist
  useEffect(() => {
    ;(async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY)
        if (raw) setNotes(JSON.parse(raw))
      } catch (e) {
        console.log("[v0] Failed to load notes", e)
      }
    })()
  }, [])

  const persist = useCallback(async (next: Note[]) => {
    try {
      setNotes(next)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch (e) {
      console.log("[v0] Failed to save notes", e)
    }
  }, [])

  const resetForm = () => {
    setSelectedStudent(null)
    setTitle("")
    setBody("")
    setAttachmentName(undefined)
    setAttachmentUri(undefined)
    setEditingId(null)
  }

  const onPickFile = useCallback(async () => {
    // Expo DocumentPicker preferred. Fallback to a mock attachment for bare RN without the dependency.
    try {
      // Lazy import to avoid requiring Expo at build time if not available.
      // @ts-ignore
      const DocumentPicker = await import("expo-document-picker")
      const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true })
      if (result.canceled) return
      const file = result.assets?.[0]
      if (file) {
        setAttachmentName(file.name)
        setAttachmentUri(file.uri)
      }
    } catch {
      // Fallback
      const mockName = `attachment-${Date.now()}.txt`
      setAttachmentName(mockName)
      setAttachmentUri("mock://local/" + mockName)
      Alert.alert("Attachment added (mock)", "Document picker not available; using a mock file.")
    }
  }, [])

  const onSave = useCallback(() => {
    if (!selectedStudent || !title.trim() || !body.trim()) {
      Alert.alert("Missing info", "Please fill Student, Title and Note.")
      return
    }
    const now = Date.now()
    if (editingId) {
      const next = notes.map((n) =>
        n.id === editingId
          ? {
              ...n,
              studentId: selectedStudent.id,
              title: title.trim(),
              body: body.trim(),
              attachmentName,
              attachmentUri,
            }
          : n,
      )
      persist(next)
      resetForm()
      Alert.alert("Updated", "Note updated successfully.")
      return
    }

    const newNote: Note = {
      id: "N" + now,
      studentId: selectedStudent.id,
      title: title.trim(),
      body: body.trim(),
      attachmentName,
      attachmentUri,
      status: "Active",
      createdAt: now,
    }
    persist([newNote, ...notes])
    resetForm()
    Alert.alert("Saved", "Note created successfully.")
  }, [attachmentName, attachmentUri, body, editingId, notes, persist, selectedStudent, title])

  const onEdit = (note: Note) => {
    const student = STUDENTS.find((s) => s.id === note.studentId) || null
    setSelectedStudent(student)
    setTitle(note.title)
    setBody(note.body)
    setAttachmentName(note.attachmentName)
    setAttachmentUri(note.attachmentUri)
    setEditingId(note.id)
  }

  const onDelete = (id: string) => {
    Alert.alert("Delete note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => persist(notes.filter((n) => n.id !== id)),
      },
    ])
  }

 const toggleStatus = (id: string) => {
  const next = notes.map((n) =>
    n.id === id
      ? { ...n, status: (n.status === "Active" ? "Inactive" : "Active") as NoteStatus }
      : n
  )
  persist(next)
}


  const isImage = useCallback((nameOrUri?: string) => {
    if (!nameOrUri) return false
    const v = nameOrUri.toLowerCase()
    return v.endsWith(".png") || v.endsWith(".jpg") || v.endsWith(".jpeg") || v.endsWith(".webp") || v.endsWith(".gif")
  }, [])

  const viewAttachment = useCallback(async (uri?: string) => {
    if (!uri) {
      Alert.alert("No attachment", "This note has no attached file.")
      return
    }

    try {
      const can = await Linking.canOpenURL(uri)
      if (can) {
        await Linking.openURL(uri)
        return
      }
    } catch {
     
    }

    try {
      const FS: any = await import("expo-file-system")
      const Sharing: any = await import("expo-sharing")

      const baseTmpDir: string = FS?.cacheDirectory || FS?.documentDirectory || "" // safe fallback for platforms/typings without cache/document

      if (!baseTmpDir) {
        if (Sharing?.isAvailableAsync && (await Sharing.isAvailableAsync())) {
          await Sharing.shareAsync(uri)
          return
        }
        Alert.alert("Cannot open file", "Temporary storage unavailable on this platform.")
        return
      }

      const tmp = `${baseTmpDir}preview-${Date.now()}`
      await FS.copyAsync({ from: uri, to: tmp })

      if (Sharing?.isAvailableAsync && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(tmp)
        return
      }

      Alert.alert("Attachment copied", "File copied to temporary storage.")
    } catch (e) {
      console.log("[v0] viewAttachment error:", e)
      Alert.alert("Cannot open file", "We couldn't open this attachment on this device.")
    }
  }, [])

  const downloadAttachment = useCallback(async (uri?: string, filename?: string) => {
    if (!uri) {
      Alert.alert("No attachment", "This note has no attached file.")
      return
    }

    try {
      const FS: any = await import("expo-file-system")
      const Sharing: any = await import("expo-sharing")

      const safeName = filename || `attachment-${Date.now()}`
      const baseDocDir: string = FS?.documentDirectory || FS?.cacheDirectory || "" // guard for environments where typings hide these

      if (!baseDocDir) {
        try {
          if (Sharing?.isAvailableAsync && (await Sharing.isAvailableAsync())) {
            await Sharing.shareAsync(uri)
            return
          }
          await Linking.openURL(uri)
          return
        } catch {
          Alert.alert("Download failed", "No writable directory available on this platform.")
          return
        }
      }

      const dest = `${baseDocDir}${safeName}`

      if (uri.startsWith("http://") || uri.startsWith("https://")) {
        await FS.downloadAsync(uri, dest)
      } else {
        await FS.copyAsync({ from: uri, to: dest })
      }

      if (Sharing?.isAvailableAsync && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(dest)
      } else {
        Alert.alert("Downloaded", `Saved to app documents:\n${dest}`)
      }
    } catch (e) {
      console.log("[v0] downloadAttachment error:", e)
      try {
        await Linking.openURL(uri!)
      } catch {
        Alert.alert("Download failed", "Unable to download this file on this platform.")
      }
    }
  }, [])

  // Search + pagination
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return notes
    return notes.filter((n) => {
      const sId = ( n.studentId).toLowerCase()
      const t = n.title.toLowerCase()
      const b = n.body.toLowerCase()
      return sId.includes(q) || t.includes(q) || b.includes(q)
    })
  }, [notes, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * pageSize
  const pageEnd = pageStart + pageSize
  const pageItems = filtered.slice(pageStart, pageEnd)

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const renderRow = ({ item, index }: { item: Note; index: number }) => {
    const rowNumber = pageStart + index + 1
    return (
      <View style={[styles.row, index % 2 === 0 ? styles.rowAlt : undefined]}>
        <Text style={[styles.cell, styles.mono]}>{rowNumber}</Text>
        <Text style={[styles.cell, styles.mono]}>{item.studentId}</Text>
        <Text style={[styles.cell, styles.title]} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={[styles.cell, styles.statusCell]}>
          <View style={[styles.badge, item.status === "Active" ? styles.badgeActive : styles.badgeInactive]}>
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>
        </View>
        <View style={[styles.cell, styles.actions]}>
          <SmallButton label="👁" onPress={() => setViewNote(item)} />
          <SmallButton label="✏️" onPress={() => onEdit(item)} />
          <SmallButton label="📎" onPress={() => viewAttachment(item.attachmentUri)} />
          <SmallButton label={item.status === "Active" ? "⏸" : "▶️"} onPress={() => toggleStatus(item.id)} />
          <SmallButton label="🗑" danger onPress={() => onDelete(item.id)} />
        </View>
      </View>
    )
  }

  const isSaveDisabled = !selectedStudent || !title.trim() || !body.trim()

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Left: Create Student Note */}
        <View style={styles.leftCard}>
          <Text style={styles.sectionTitle}>Create Student Note</Text>

          <Text style={styles.label}>
            Student <Text style={styles.req}>*</Text>
          </Text>
          <Pressable accessibilityRole="button" onPress={() => setStudentPickerOpen(true)} style={styles.select}>
            <Text style={{ color: selectedStudent ? "#111" : "#9aa0a6" }}>
              {selectedStudent ? `${selectedStudent.name} ` : "Select"}
            </Text>
          </Pressable>

          <Text style={styles.label}>
            Title <Text style={styles.req}>*</Text>
          </Text>
          <TextInput style={styles.input} placeholder="Enter title" value={title} onChangeText={setTitle} />

          <Text style={styles.label}>
            Note <Text style={styles.req}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, { height: 96, textAlignVertical: "top" }]}
            placeholder="Write a note..."
            multiline
            value={body}
            onChangeText={setBody}
          />

          <Text style={styles.label}>Attach</Text>
          <View style={styles.attachRow}>
            <TouchableOpacity style={styles.buttonSecondary} onPress={onPickFile}>
              <Text style={styles.buttonSecondaryText}>Choose file</Text>
            </TouchableOpacity>
            <Text style={styles.attachmentName} numberOfLines={1}>
              {attachmentName || "No file chosen"}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.buttonPrimary, isSaveDisabled && { opacity: 0.6 }]}
            disabled={isSaveDisabled}
            onPress={onSave}
            accessibilityRole="button"
          >
            <Text style={styles.buttonPrimaryText}>{editingId ? "Update" : "Save"}</Text>
          </TouchableOpacity>
        </View>

        {/* Right: Student Note List */}
        <View style={styles.rightCard}>
          <Text style={styles.sectionTitle}>Student Note List</Text>

          <View style={styles.listTopBar}>
            <View style={styles.pageSizeWrap}>
              <Text style={styles.smallMuted}>Show</Text>
              <View style={styles.pageSizeButtons}>
                {[10].map((n) => (
                  <Pressable
                    key={n}
                    onPress={() => {
                      setPageSize(n)
                      setPage(1)
                    }}
                    style={[styles.pageSizeBtn, pageSize === n ? styles.pageSizeBtnActive : undefined]}
                  >
                    <Text style={[styles.pageSizeText, pageSize === n ? styles.pageSizeTextActive : undefined]}>
                      {n}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.smallMuted}>entries</Text>
            </View>
            <View style={styles.searchWrap}>
              <Text style={styles.smallMuted}>Search:</Text>
              <TextInput
                style={[styles.input, { height: 36, marginLeft: 8, flex: 1 }]}
                placeholder="Type to filter..."
                value={search}
                onChangeText={(t) => {
                  setSearch(t)
                  setPage(1)
                }}
              />
            </View>
          </View>

          {/* Table header */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerText, { width: 40 }]}></Text>
            <Text style={[styles.cell, styles.headerText, { width: 100 }]}>Student ID</Text>
            <Text style={[styles.cell, styles.headerText, { flex: 1 }]}>Title</Text>
            <Text style={[styles.cell, styles.headerText, { width: 90 }]}>Status</Text>
            <Text style={[styles.cell, styles.headerText, { width: 160 }]}>Action</Text>
          </View>

          <FlatList
            data={pageItems}
            renderItem={renderRow}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={{ paddingVertical: 16 }}>
                <Text style={{ color: "#5f6368" }}>No notes yet.</Text>
              </View>
            }
          />

          {/* Pagination */}
          <View style={styles.pagination}>
            <Text style={styles.smallMuted}>
              Showing {filtered.length === 0 ? 0 : pageStart + 1} to {Math.min(pageEnd, filtered.length)} of{" "}
              {filtered.length} entries
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                style={[styles.pageBtn, page <= 1 && styles.pageBtnDisabled]}
                disabled={page <= 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Text style={styles.pageBtnText}>Previous</Text>
              </TouchableOpacity>
              <View style={styles.pageIndicator}>
                <Text style={styles.pageIndicatorText}>{currentPage}</Text>
              </View>
              <TouchableOpacity
                style={[styles.pageBtn, page >= totalPages && styles.pageBtnDisabled]}
                disabled={page >= totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <Text style={styles.pageBtnText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Student Picker Modal */}
      <Modal visible={studentPickerOpen} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setStudentPickerOpen(false)} />
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Select Student</Text>
          <FlatList
            data={STUDENTS}
            keyExtractor={(s) => s.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedStudent(item)
                  setStudentPickerOpen(false)
                }}
                style={styles.studentItem}
              >
                <Text style={styles.studentName}>{item.name}</Text>
                {/* <Text style={styles.studentId}>#{item.id}</Text> */}
              </Pressable>
            )}
          />
        </View>
      </Modal>

      {/* View Note Modal */}
      <Modal visible={!!viewNote} transparent animationType="slide" onRequestClose={() => setViewNote(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setViewNote(null)} />
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Note Details</Text>
          {viewNote && (
            <View style={{ gap: 8 }}>
              <KeyVal label="Student ID" value={"#" + viewNote.studentId} />
              <KeyVal label="Title" value={viewNote.title} />
              <KeyVal label="Status" value={viewNote.status} />
              <KeyVal label="Created" value={new Date(viewNote.createdAt).toLocaleString()} />
              {viewNote.attachmentUri ? (
                <View style={{ gap: 8 }}>
                  <KeyVal label="Attachment" value={viewNote.attachmentName || "File"} />
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity
                      style={[styles.buttonSecondary]}
                      onPress={() => viewAttachment(viewNote.attachmentUri)}
                    >
                      <Text style={styles.buttonSecondaryText}>View Attachment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonSecondary]}
                      onPress={() => downloadAttachment(viewNote.attachmentUri, viewNote.attachmentName)}
                    >
                      <Text style={styles.buttonSecondaryText}>Download</Text>
                    </TouchableOpacity>
                  </View>
                  {isImage(viewNote.attachmentName || viewNote.attachmentUri) ? (
                    <Image
                      source={{ uri: viewNote.attachmentUri }}
                      style={{ width: "100%", height: 200, borderRadius: 8 }}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              ) : (
                <KeyVal label="Attachment" value="None" />
              )}
              <Text style={styles.detailBody}>{viewNote.body}</Text>
            </View>
          )}
          <TouchableOpacity style={[styles.buttonPrimary, { marginTop: 12 }]} onPress={() => setViewNote(null)}>
            <Text style={styles.buttonPrimaryText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

function SmallButton({
  label,
  onPress,
  danger,
}: {
  label: string
  onPress: () => void
  danger?: boolean
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.smallBtn, danger ? styles.smallBtnDanger : styles.smallBtnNeutral]}
      accessibilityRole="button"
    >
      <Text style={styles.smallBtnText}>{label}</Text>
    </TouchableOpacity>
  )
}

function KeyVal({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ color: "#5f6368", fontSize: 12 }}>{label}</Text>
      <Text style={{ color: "#111", fontSize: 16 }}>{value}</Text>
    </View>
  )
}

const COLORS = {
  bg: "#f5f7fb",
  card: "#ffffff",
  primary: "#0ea5e9", // blue
  primaryText: "#ffffff",
  neutral: "#e5e7eb",
  border: "#e5e7eb",
  text: "#111827",
  muted: "#6b7280",
  success: "#10b981",
  danger: "#ef4444",
  inactive: "#9ca3af",
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    padding: 16,
    gap: 16,
    flexDirection: Platform.OS === "web" ? "row" : "column",
    alignItems: "flex-start",
  },

  // Cards
  leftCard: {
    backgroundColor: "#ffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: Platform.OS === "web" ? 300 : "100%",
    gap: 2,
  },
  rightCard: {
    backgroundColor: "#ffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },

  label: { fontSize: 13, color: COLORS.text, marginTop: 6 },
  req: { color: COLORS.danger },

  input: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: COLORS.text,
  },

  select: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  attachRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  attachmentName: { color: COLORS.muted, flex: 1 },

  buttonPrimary: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPrimaryText: { color: COLORS.primaryText, fontWeight: "700" },

  buttonSecondary: {
    backgroundColor: COLORS.neutral,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonSecondaryText: { color: COLORS.text, fontWeight: "600" },

  // Table
  listTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  pageSizeWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  pageSizeButtons: { flexDirection: "row", alignItems: "center", gap: 6 },
  pageSizeBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pageSizeBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  pageSizeText: { color: COLORS.text, fontSize: 12 },
  pageSizeTextActive: { color: COLORS.primaryText, fontWeight: "700" },

  searchWrap: { flexDirection: "row", alignItems: "center", flex: 1, gap: 8 },
  smallMuted: { color: COLORS.muted, fontSize: 12 },

  headerRow: {
    backgroundColor: "#f1f5f9",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: { color: COLORS.text, fontWeight: "700" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  rowAlt: { backgroundColor: "#fafafa" },

  cell: { paddingHorizontal: 8 },
  mono: { width: 40, color: COLORS.muted },
  title: { flex: 1, color: COLORS.text },
  statusCell: { width: 90 },
  actions: {
    width: 160,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "flex-start",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeActive: { backgroundColor: "#d1fae5" },
  badgeInactive: { backgroundColor: "#e5e7eb" },
  badgeText: { color: COLORS.text, fontSize: 12, fontWeight: "600" },

  smallBtn: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  smallBtnNeutral: { backgroundColor: "#e2e8f0" },
  smallBtnDanger: { backgroundColor: COLORS.danger },
  smallBtnText: { color: "#111", fontWeight: "700" },

  pagination: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  pageBtnDisabled: { opacity: 0.5 },
  pageBtnText: { color: COLORS.text, fontWeight: "600" },
  pageIndicator: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  pageIndicatorText: { color: COLORS.primaryText, fontWeight: "700", paddingVertical: 8 },

  // Modals
  modalBackdrop: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  } as any,
  modalCard: {
    marginTop: 80,
    marginHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: "80%",
    maxWidth:"60%",
    

   
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginBottom: 12 },
  studentItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  studentName: { color: COLORS.text, fontSize: 16 },
  studentId: { color: COLORS.muted, marginTop: 2 },

  detailBody: {
    marginTop: 8,
    color: COLORS.text,
    lineHeight: 20,
  },
})
