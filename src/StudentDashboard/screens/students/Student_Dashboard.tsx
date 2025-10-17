import { useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

type Stat = {
  title: string;
  value: string;
  note?: string;
};

type Activity = {
  initials: string;
  color: string;
  title: string;
  timeAgo: string;
};

type QuickAction = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

const COLORS = {
  background: "#F8FAFC",
  card: "#FFFFFF",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  border: "#E5E7EB",
  primary: "#2563EB",
  accent: "#10B981",
  muted: "#64748B",
};

const stats: Stat[] = [
  { title: "Total Students", value: "1,234", note: "+20.1% from last month" },
  { title: "New Registrations", value: "45", note: "This month" },
  { title: "Active Students", value: "1,189", note: "96.3% attendance rate" },
  { title: "Graduating This Year", value: "156", note: "Class of 2024" },
];

const activities: Activity[] = [
  { initials: "JD", color: "#93C5FD", title: "John Doe registered for Interior Design", timeAgo: "2 hours ago" },
  { initials: "AS", color: "#86EFAC", title: "Alice Smith completed Fashion Design course", timeAgo: "1 day ago" },
  { initials: "MJ", color: "#C4B5FD", title: "Mike Johnson updated profile information", timeAgo: "2 days ago" },
];

const quickActions: QuickAction[] = [
  { title: "Add New Student", subtitle: "Register a new student" },
  { title: "View All Students", subtitle: "Browse student directory" },
  { title: "Attendance Report", subtitle: "Generate attendance data" },
  { title: "Student Profiles", subtitle: "Manage student information" },
];

export default function Student_Dashboard() {
  const [selected, setSelected] = useState("students/Student_Dashboard");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Top breadcrumb */}
        <Text accessibilityRole="text" style={styles.breadcrumb}>
          {"DASHBOARD"}
        </Text>

        {/* Page title and subtitle */}
        <View style={styles.headerWrap}>
          <Text accessibilityRole="header" style={styles.title}>
            {"Students Dashboard"}
          </Text>
          <Text style={styles.subtitle}>{"Manage student information, registrations, and academic records."}</Text>
        </View>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {stats.map((s, idx) => (
            <View key={idx} style={[styles.card, styles.statCard, shadow()]}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              {!!s.note && <Text style={styles.statNote}>{s.note}</Text>}
            </View>
          ))}
        </View>

        {/* Two-column section */}
        <View style={styles.columns}>
       
         
        
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function shadow() {
  return Platform.select({
    ios: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    android: {
      elevation: 3,
    },
    default: {},
  });
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  contentContainer: { paddingHorizontal: 16, paddingBottom: 24 },
  breadcrumb: { marginTop: 8, color: COLORS.muted, fontSize: 12, letterSpacing: 1.2 },
  headerWrap: { marginTop: 8 },
  title: { color: COLORS.textPrimary, fontSize: 28, fontWeight: "700" },
  subtitle: { marginTop: 6, color: COLORS.textSecondary, fontSize: 14, lineHeight: 20 },
  statsGrid: { marginTop: 16, flexDirection: "row", flexWrap: "wrap", marginHorizontal: -6 },
  statCard: { width: "50%", padding: 16 },
  card: { backgroundColor: COLORS.card, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border },
  cardTitle: { color: COLORS.textSecondary, fontSize: 13, marginBottom: 10 },
  statValue: { color: COLORS.textPrimary, fontSize: 28, fontWeight: "700" },
  statNote: { marginTop: 6, color: COLORS.muted, fontSize: 12 },
  columns: { marginTop: 16, flexDirection: "column", gap: 16 as any },

  columnCard: { padding: 16 },

  /** ADDED THESE TWO **/
  leftCol: {
    marginBottom: 16, // stacks nicely on mobile
  },
  rightCol: {
    marginBottom: 16,
  },

  sectionTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: "700" },
  sectionSubtitle: { marginTop: 4, color: COLORS.muted, fontSize: 13 },
  divider: { height: 1, backgroundColor: COLORS.border, marginTop: 12, marginBottom: 4 },
  list: { marginTop: 4 },
  activityRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, gap: 12 as any },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  avatarText: { color: COLORS.textPrimary, fontWeight: "700" },
  activityTextWrap: { flex: 1 },
  activityTitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: "500" },
  activityTime: { marginTop: 2, color: COLORS.muted, fontSize: 12 },
  actionsList: { marginTop: 4 },
  actionItem: { flexDirection: "row", alignItems: "center", borderColor: COLORS.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginTop: 10, backgroundColor: COLORS.card },
  actionTextWrap: { flex: 1 },
  actionTitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: "600" },
  actionSubtitle: { marginTop: 2, color: COLORS.muted, fontSize: 12 },
  actionArrow: { color: COLORS.muted, fontSize: 22, marginLeft: 8 },
});
