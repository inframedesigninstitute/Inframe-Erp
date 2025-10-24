import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width - 20; // total screen width minus container padding
const chartInnerWidth = screenWidth * 0.69; // 95% width for safe content inside

// --- Active Status Component ---
const ActiveStatus = ({ isActive = true, label = "Live" }) => (
  <View style={styles.activeContainer}>
    <View style={[styles.activeDot, { backgroundColor: isActive ? '#16a34a' : '#6B7280' }]} />
    <Text style={styles.activeText}>{label}</Text>
  </View>
);

const feesPieData = [
  { name: "Student Fee", population: 0.5, color: "#66CCCC", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  { name: "Discount", population: 0.25, color: "#FF9999", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  { name: "Fine", population: 0.05, color: "#FFCC66", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  { name: "Paid Amount", population: 0.20, color: "#99CCFF", legendFontColor: "#7F7F7F", legendFontSize: 12 },
];

const feesChartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#E5E7EB",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  useShadowColorFromDataset: false,
};

const FeesChart: React.FC = () => {
  const chartHeight = 220;
  const centerVerticalPosition = chartHeight / 2;

  return (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Fees Collection Summary</Text>
        <ActiveStatus isActive={true} label="Live" />
      </View>
      <View>
        <PieChart
          data={feesPieData}
          width={chartInnerWidth}
          height={chartHeight}
          chartConfig={feesChartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"} 
          absolute
          hasLegend={true}
        />
        <View 
          style={[
            styles.pieCenterTextContainer, 
            { 
              left: (chartInnerWidth / 2) - 75,
              top: centerVerticalPosition - 10,
            }
          ]}
        >
          <Text style={styles.pieCenterText}>Paid Amount: 757,887.55</Text>
        </View>
      </View>
    </View>
  );
};

// --- 2. SALARY/DEDUCTION LINE CHART DATA ---
const salaryLineData = {
  labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  datasets: [
    { data:[0,0,0,830,0,1100,0,0,0,950,0,0], color: (opacity = 1) => `rgba(59,130,246,${opacity})`, strokeWidth: 2, legend:"Salary Paid" },
    { data:[0,0,0,23,0,0,0,0,0,20,0,0], color: (opacity = 1) => `rgba(16,185,129,${opacity})`, strokeWidth: 2, legend:"Allowance" },
    { data:[0,0,230,0,0,0,0,0,0,50,0,0], color: (opacity = 1) => `rgba(239,68,68,${opacity})`, strokeWidth: 2, legend:"Deduction" },
    { data:[0,0,0,0,0,0,0,300,0,10,0,0], color: (opacity = 1) => `rgba(255,165,0,${opacity})`, strokeWidth: 2, legend:"Tax" }
  ],
};

const salaryChartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#E5E7EB",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "4", strokeWidth: "2", stroke:"#fff" },
};

const SalaryChart: React.FC = () => (
  <View style={styles.chartCard}>
    <View style={styles.chartHeader}>
      <Text style={styles.chartTitle}>Monthly Payroll Trend</Text>
      <ActiveStatus isActive={true} label="Live" />
    </View>
    <LineChart
      data={salaryLineData}
      width={chartInnerWidth}
      height={220}
      chartConfig={salaryChartConfig}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width:0, height:3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      }}
      yAxisSuffix="K"
    />
  </View>
);

// --- 3. MAIN DASHBOARD ---
const Dashboard: React.FC = () => (
  <ScrollView style={styles.container}>
    <FeesChart />
    <SalaryChart />
    <View style={{ height: 100 }} />
  </ScrollView>
);

export default Dashboard;

// --- 4. STYLES ---
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#F3F4F6',
    padding:10,
  },
 
  chartCard:{
    backgroundColor:'#fff',
    borderRadius:14,
    padding:12,
    marginVertical:10,
    width:'100%',
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{ width:0, height:6 },
    shadowOpacity:0.15,
    shadowRadius:12,
    elevation:6,
  },
  chartHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    marginBottom:6,
  },
  chartTitle:{
    fontSize:16,
    fontWeight:'600',
    color:'#374151',
  },
  pieCenterTextContainer:{
    position:'absolute',
    width:150,
    paddingVertical:6,
    backgroundColor:'#6B7280',
    borderRadius:6,
    alignItems:'center',
    justifyContent:'center',
    zIndex:10,
  },
  pieCenterText:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:11,
    color:'#fff',
  },
  activeContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  activeDot:{
    width:10,
    height:10,
    borderRadius:5,
    marginRight:6,
  },
  activeText:{
    fontSize:12,
    fontWeight:'600',
    color:'#16a34a',
  },
});
