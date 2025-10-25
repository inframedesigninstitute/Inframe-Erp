import { ScrollView, StyleSheet, Text, View } from "react-native";
import DashboardChart2 from "../components/DashboardChart2";
import DashboardChart3 from "../components/DashboardChart3";
import DashboardChartCourses from "../components/DashboardChartCourses";
import DashboardSingleComponent from "../components/DashboardSingleComponent";
import DashboardStats from "../components/dashboardstats";

export default function DashboardPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.mainHeader}>Admin Dashboard Overview</Text>

      <DashboardStats />
      <DashboardSingleComponent /> {/* Removed semicolon here */}
      <DashboardChartCourses />
      <DashboardChart3 />
      
      <View style={styles.chartsRow}>
        <View style={styles.chartWrapper}>
          <DashboardChart2 />
        </View>
        <View style={styles.chartWrapper}>
          <DashboardChart2 />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f1f5f9", 
    padding: 16 
  },
  chartsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 16,
  },
  chartWrapper: {
    width: '48%', // each chart takes ~50% width
  }, 
  mainHeader:{
    fontSize:24,
    fontWeight:'bold',
    color:'#1F2937',
    marginVertical:15,
    marginLeft:10,
  },
});
