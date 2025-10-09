import { useMemo, useState } from "react"
import {
    FlatList,
    Modal,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

type ClassItem = {
  subject: string
  teacher: string
  time: string
  room: string
  day: string
  color: string
}

const BASE: ClassItem[] = [
  { subject: "Art & Sketching", teacher: "Mr. Sharma", time: "09:00 AM - 10:00 AM", room: "A101", day: "Monday", color: "#FDE68A" },
  { subject: "Photography Basics", teacher: "Ms. Nisha", time: "10:15 AM - 11:15 AM", room: "Studio 2", day: "Monday", color: "#BFDBFE" },
  { subject: "English Communication", teacher: "Mr. Ravi", time: "11:30 AM - 12:30 PM", room: "B203", day: "Tuesday", color: "#C7D2FE" },
  { subject: "Interior Design Concepts", teacher: "Ms. Pooja", time: "01:30 PM - 02:30 PM", room: "Design Lab", day: "Wednesday", color: "#FECACA" },
  { subject: "Advanced Art Workshop", teacher: "Mr. Roy", time: "09:00 AM - 10:30 AM", room: "A102", day: "Thursday", color: "#A7F3D0" },
  { subject: "Creative Photography", teacher: "Ms. Rhea", time: "10:45 AM - 12:00 PM", room: "Studio 1", day: "Friday", color: "#FBCFE8" },
  { subject: "Interior Design Studio", teacher: "Ms. Sneha", time: "01:00 PM - 02:30 PM", room: "Lab 3", day: "Friday", color: "#FCD34D" },
]

const TIMETABLE: ClassItem[] = Array.from({ length: 20 }).flatMap((_, i) =>
  BASE.map((b, j) => ({ ...b, subject: `${b.subject} ${i + 1}-${j + 1}` }))
)

export default function TimeTableScreen() {
  const [selectedItem, setSelectedItem] = useState<ClassItem | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎓 Student Time Table</Text>
        <Text style={styles.headerSubtitle}>Creative Arts & Design Department</Text>
      </View>
    ),
    []
  )

  const renderItem = ({ item }: { item: ClassItem }) => (
    <View style={[styles.card, { backgroundColor: item.color }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.subject} numberOfLines={2}>
          {item.subject}
        </Text>
        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>{item.day}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="account-outline" size={18} color="#374151" style={styles.icon} />
        <Text style={styles.infoText}>{item.teacher}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="clock-outline" size={18} color="#374151" style={styles.icon} />
        <Text style={styles.infoText}>{item.time}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="map-marker-outline" size={18} color="#374151" style={styles.icon} />
        <Text style={styles.infoText}>{item.room}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSelectedItem(item)
          setModalVisible(true)
        }}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={TIMETABLE}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={renderItem}
        ListHeaderComponent={header}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.subject}</Text>
                <Text style={styles.modalText}>Teacher: {selectedItem.teacher}</Text>
                <Text style={styles.modalText}>Time: {selectedItem.time}</Text>
                <Text style={styles.modalText}>Room: {selectedItem.room}</Text>
                <Text style={styles.modalText}>Day: {selectedItem.day}</Text>
              </>
            )}
            <TouchableOpacity
              style={[styles.button, { alignSelf: "center", marginTop: 20 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: Platform.select({ ios: 80, android: 100 }),
  },
  header: { marginBottom: 12 },
  headerTitle: { fontSize: 26, fontWeight: "700", color: "#111827" },
  headerSubtitle: { fontSize: 15, color: "#6B7280", marginTop: 4 },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subject: { fontSize: 18, fontWeight: "700", color: "#111827", flex: 1 },
  dayBadge: { backgroundColor: "#1E3A8A", borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10 },
  dayText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  icon: { marginRight: 8 },
  infoText: { fontSize: 14, color: "#374151" },
  button: { marginTop: 12, alignSelf: "flex-end", backgroundColor: "#1E3A8A", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "80%",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  modalText: { fontSize: 16, marginVertical: 2 },
})
