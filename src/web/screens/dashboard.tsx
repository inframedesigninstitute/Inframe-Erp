import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CalendarInput } from "../components/ui/CalendarInput";

const NewAdmissionScreen = () => {
  return (
    <ScrollView style={styles.container}>
   
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Assignments</Text>

    
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.tableHeaderText, { flex: 2 }]}>
            Title
          </Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Course</Text>
          <Text style={[styles.tableCell, styles.tableHeaderText]}>Status</Text>
        </View>

       
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 2 }]}>Rules of voice change</Text>
          <Text style={styles.tableCell}>EN105</Text>
          <View style={styles.statusCell}>
            <Text style={[styles.statusBadge, styles.submitted]}>Submitted</Text>
          </View>
        </View>

        {/* Table Row 2 */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 2 }]}>Rules of Article</Text>
          <Text style={styles.tableCell}>EN105</Text>
          <View style={styles.statusCell}>
            <Text style={[styles.statusBadge, styles.pending]}>Pending</Text>
          </View>
        </View>
      </View>

      {/* Calendar + Upcoming Event */}
      <View style={styles.row}>
        <View style={[styles.card, { flex: 2 }]}>
          <Text style={styles.sectionTitle}>Calendar</Text>
          {/* Using your existing CalendarInput component */}
          <CalendarInput label="Select Date" />
        </View>

        <View style={[styles.card, { flex: 1 }]}>
          <Text style={styles.sectionTitle}>Upcoming Event</Text>
          <Text style={styles.emptyText}>No upcoming events</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewAdmissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8ff",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    borderLeftWidth: 3,
    borderLeftColor: "#2196f3",
    paddingLeft: 8,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#f9fbff",
  },
  tableHeader: {
    backgroundColor: "#2196f3",
  },
  tableHeaderText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    paddingHorizontal: 8,
  },
  statusCell: {
    flex: 1,
    alignItems: "center",
  },
  statusBadge: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    color: "#fff",
    overflow: "hidden",
  },
  submitted: {
    backgroundColor: "#4CAF50",
  },
  pending: {
    backgroundColor: "#2196f3",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
    marginTop: 10,
  },
});
