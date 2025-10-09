import { Dimensions, Platform, StyleSheet, View, ViewStyle } from "react-native";
import ChartCard from "../components/chart-card";
import KpiCard from "../components/kpi-card";
import { ScrollArea } from "../components/ui/scroll-area"; // correct path
import { theme } from "../theme";

const { height: screenHeight } = Dimensions.get("window");

export default function Dashboard() {
  return (
    <View style={[styles.wrapper, Platform.OS === "web" && styles.webWrapper]}>
      <ScrollArea style={{ flex: 1, height: "100%" }}>
        <View style={styles.container}>
          {/* KPI Tiles */}
          <View style={styles.kpiGrid}>
            <KpiCard title="Pending Applications" value={3} color="aqua" />
            <KpiCard title="Active Students" value={22} color="blue" />
            <KpiCard title="Active Staffs" value={11} color="cyan" />
            <KpiCard title="Daily Visitor Logs" value={0} color="teal" />
          </View>
          {/* Big Line Chart Card */}
          <ChartCard title="Student Fees • Salary Paid • Incomes • Expenses" />

          {/* Lower Row of Cards */}
          <View style={styles.lowerGrid}>
            <ChartCard title="Students" />
            <ChartCard title="Fees Collections" />
          </View>
        </View>
      </ScrollArea>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.appbarFg || "#f9f9f9",
    height: screenHeight,
  },
  webWrapper: {
    height: "100%",
    overflowY: "auto" as ViewStyle["overflow"],
  },
  container: {
    padding: 5,
    gap: theme.layout.gapLg || 12,
    flexGrow: 1,
  },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: theme.layout.gap || 12,
    marginBottom: theme.layout.gapLg || 12,
  },
  lowerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: theme.layout.gap || 12,
    marginTop: theme.layout.gapLg || 12,
  },
});
