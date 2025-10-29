"use client"
import React, { useState } from "react"
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

interface StudentResult {
  id: string
  name: string
  fatherName: string
  rollNo: string
  marks: number
  status: "Pass" | "Fail"
}

interface ExamItem {
  id: string
  title: string
  date: string
  status: string
  result?: string
  students?: StudentResult[]
}

const ExamResultScreen: React.FC = () => {
  const [examList, setExamList] = useState<ExamItem[]>([
    {
      id: "1",
      title: "Mid Term Examination",
      date: "15 Nov 2025",
      status: "Completed",
      result: "Published",
      students: [
        { id: "1", name: "Riya Sharma", fatherName: "Rajesh Sharma", rollNo: "101", marks: 88, status: "Pass" },
        { id: "2", name: "Amit Singh", fatherName: "Rakesh Singh", rollNo: "102", marks: 74, status: "Pass" },
        { id: "3", name: "Priya Patel", fatherName: "Mahesh Patel", rollNo: "103", marks: 42, status: "Fail" },
      ],
    },
    { id: "2", title: "Final Semester", date: "10 Dec 2025", status: "Scheduled" },
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [resultModal, setResultModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null)
  const [newExam, setNewExam] = useState({ title: "", date: "", status: "", result: "" })

  const handleAddExam = () => {
    if (!newExam.title || !newExam.date || !newExam.status) {
      Alert.alert("⚠️ Please fill all required fields")
      return
    }

    const updatedList = [
      ...examList,
      {
        id: Date.now().toString(),
        title: newExam.title,
        date: newExam.date,
        status: newExam.status,
        result: newExam.result,
        students: [],
      },
    ]
    setExamList(updatedList)
    setNewExam({ title: "", date: "", status: "", result: "" })
    setModalVisible(false)
  }

  const getSummary = (students: StudentResult[]) => {
    const passed = students.filter((s) => s.status === "Pass").length
    const failed = students.filter((s) => s.status === "Fail").length
    return { passed, failed }
  }

  const renderItem = ({ item }: { item: ExamItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text
          style={[
            styles.status,
            item.status === "Completed"
              ? styles.completed
              : item.status === "Upcoming"
              ? styles.upcoming
              : styles.scheduled,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Text style={styles.cardDate}>📅 {item.date}</Text>

      {item.result && (
        <TouchableOpacity
          style={styles.resultBtn}
          onPress={() => {
            setSelectedExam(item)
            setResultModal(true)
          }}
        >
          <Text style={styles.resultText}>View Result</Text>
        </TouchableOpacity>
      )}
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>📘 Exam & Result Summary</Text>

      <TouchableOpacity style={styles.uploadBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.uploadBtnText}>+ Upload New Exam / Result</Text>
      </TouchableOpacity>

      <FlatList data={examList} renderItem={renderItem} keyExtractor={(item) => item.id} />

      {/* 🔥 Dashboard Summary Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{examList.length}</Text>
          <Text style={styles.statLabel}>Total Exams</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#28a745" }]}>
            {examList.filter((e) => e.status === "Completed").length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#ff9800" }]}>
            {examList.filter((e) => e.status === "Scheduled").length}
          </Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
      </View>

      {/* 📰 Notice Board */}
      <View style={styles.noticeContainer}>
        <Text style={styles.noticeTitle}>📢 Recent Announcements</Text>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeText}>📄 Result of Mid Term Exam published successfully.</Text>
          <Text style={styles.noticeDate}>Updated on 15 Nov 2025</Text>
        </View>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeText}>🕐 Final Semester Exam scheduled for 10 Dec 2025.</Text>
          <Text style={styles.noticeDate}>Updated on 28 Oct 2025</Text>
        </View>
      </View>

      {/* 💡 Recent Activities */}
      <View style={styles.activityContainer}>
        <Text style={styles.noticeTitle}>🧾 Recent Activity</Text>
        <Text style={styles.activityItem}>✔️ Riya Sharma’s result updated by Admin</Text>
        <Text style={styles.activityItem}>🆕 “Final Semester” exam added</Text>
        <Text style={styles.activityItem}>📥 Mid Term results uploaded</Text>
      </View>

      {/* Upload Exam Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add / Upload Exam Details</Text>
            <TextInput
              placeholder="Exam Title"
              value={newExam.title}
              onChangeText={(text) => setNewExam({ ...newExam, title: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Exam Date (e.g. 10 Dec 2025)"
              value={newExam.date}
              onChangeText={(text) => setNewExam({ ...newExam, date: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Status (Upcoming / Scheduled / Completed)"
              value={newExam.status}
              onChangeText={(text) => setNewExam({ ...newExam, status: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Result (Optional)"
              value={newExam.result}
              onChangeText={(text) => setNewExam({ ...newExam, result: text })}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddExam}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Result Modal (Table) */}
      <Modal visible={resultModal} animationType="fade" transparent>
        <View style={styles.resultOverlay}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>📄 {selectedExam?.title}</Text>
            <Text style={styles.resultDate}>📅 {selectedExam?.date}</Text>

            {selectedExam?.students && (
              <>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryText}>
                    ✅ Passed: {getSummary(selectedExam.students).passed}
                  </Text>
                  <Text style={styles.summaryText}>
                    ❌ Failed: {getSummary(selectedExam.students).failed}
                  </Text>
                </View>

                <View style={styles.tableHeader}>
                  <Text style={[styles.tableCell, styles.cellHeader, { flex: 1.5 }]}>Name</Text>
                  <Text style={[styles.tableCell, styles.cellHeader, { flex: 1.5 }]}>Father</Text>
                  <Text style={[styles.tableCell, styles.cellHeader]}>Roll</Text>
                  <Text style={[styles.tableCell, styles.cellHeader]}>Marks</Text>
                  <Text style={[styles.tableCell, styles.cellHeader]}>Status</Text>
                </View>

                {selectedExam.students.map((s) => (
                  <View key={s.id} style={styles.tableRow}>
                    <Text style={[styles.tableCell, { flex: 1.5 }]}>{s.name}</Text>
                    <Text style={[styles.tableCell, { flex: 1.5 }]}>{s.fatherName}</Text>
                    <Text style={styles.tableCell}>{s.rollNo}</Text>
                    <Text style={styles.tableCell}>{s.marks}</Text>
                    <Text
                      style={[
                        styles.tableCell,
                        { color: s.status === "Pass" ? "#28a745" : "#dc3545", fontWeight: "700" },
                      ]}
                    >
                      {s.status}
                    </Text>
                  </View>
                ))}
              </>
            )}

            <TouchableOpacity style={styles.closeBtn} onPress={() => setResultModal(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default ExamResultScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7", paddingHorizontal: 16 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1f2d5a", marginVertical: 20, textAlign: "center" },
  uploadBtn: { backgroundColor: "#007bff", paddingVertical: 12, borderRadius: 12, marginBottom: 15, alignSelf: "center", width: "90%", shadowColor: "#007bff", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  uploadBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  card: { backgroundColor: "#ffffff", borderRadius: 14, padding: 16, marginBottom: 14, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
  status: { fontSize: 13, fontWeight: "bold", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  completed: { backgroundColor: "#c8e6c9", color: "#256029" },
  upcoming: { backgroundColor: "#bbdefb", color: "#0d47a1" },
  scheduled: { backgroundColor: "#ffe0b2", color: "#e65100" },
  cardDate: { marginTop: 8, fontSize: 14, color: "#555" },
  resultBtn: { marginTop: 10, alignSelf: "flex-start", backgroundColor: "#007bff22", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  resultText: { color: "#007bff", fontWeight: "700" },

  // Dashboard Stats
  statsContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20 },
  statCard: { backgroundColor: "#fff", padding: 15, borderRadius: 12, width: "30%", alignItems: "center", elevation: 4 },
  statValue: { fontSize: 20, fontWeight: "bold", color: "#007bff" },
  statLabel: { color: "#555", marginTop: 4, fontSize: 13 },

  // Notice Board
  noticeContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 15, marginBottom: 15, elevation: 3 },
  noticeTitle: { fontSize: 17, fontWeight: "700", color: "#1f2d5a", marginBottom: 10 },
  noticeCard: { backgroundColor: "#f7f9fc", padding: 10, borderRadius: 8, marginBottom: 8 },
  noticeText: { fontSize: 14, color: "#333" },
  noticeDate: { fontSize: 12, color: "#888", marginTop: 3 },

  // Recent Activity
  activityContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 15, marginBottom: 30, elevation: 3 },
  activityItem: { fontSize: 14, color: "#333", marginBottom: 6 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalContainer: { width: "90%", backgroundColor: "#fff", borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#007bff", textAlign: "center", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  saveBtn: { backgroundColor: "#007bff", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  cancelBtn: { backgroundColor: "#ccc", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  saveText: { color: "#fff", fontWeight: "bold" },
  cancelText: { color: "#000", fontWeight: "bold" },

  resultOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  resultContainer: { width: "95%", backgroundColor: "#ffffff", borderRadius: 16, padding: 18, elevation: 10 },
  resultHeader: { fontSize: 20, fontWeight: "700", color: "#1a237e", textAlign: "center" },
  resultDate: { fontSize: 14, color: "#444", textAlign: "center", marginBottom: 10 },
  summaryBox: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
  summaryText: { fontSize: 15, fontWeight: "600" },
  tableHeader: { flexDirection: "row", backgroundColor: "#007bff", borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingVertical: 8 },
  tableRow: { flexDirection: "row", backgroundColor: "#f9f9f9", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  tableCell: { flex: 1, textAlign: "center", fontSize: 13, color: "#333" },
  cellHeader: { fontWeight: "bold", color: "#fff", fontSize: 13 },
  closeBtn: { alignSelf: "center", backgroundColor: "#007bff", paddingHorizontal: 30, paddingVertical: 8, borderRadius: 8, marginTop: 15 },
  closeText: { color: "#fff", fontWeight: "bold" },
})
