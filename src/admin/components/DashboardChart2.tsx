import { Picker } from "@react-native-picker/picker"
import React, { useMemo, useState } from "react"
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { PieChart } from "react-native-chart-kit"

const screenWidth = Dimensions.get("window").width - 40

const chartData = [
  { month: "January", value: 186, color: "#6366F1" },
  { month: "February", value: 305, color: "#10B981" },
  { month: "March", value: 237, color: "#F59E0B" },
  { month: "April", value: 173, color: "#3B82F6" },
  { month: "May", value: 209, color: "#EF4444" },
  { month: "June", value: 256, color: "#8B5CF6" },
  { month: "July", value: 321, color: "#06B6D4" },
  { month: "August", value: 287, color: "#14B8A6" },
  { month: "September", value: 190, color: "#F97316" },
  { month: "October", value: 245, color: "#D946EF" },
  { month: "November", value: 276, color: "#84CC16" },
  { month: "December", value: 310, color: "#DC2626" },
]

const currentMonthIndex = new Date().getMonth()
const currentMonthName = chartData[currentMonthIndex].month

export default function DashboardChart2() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName)

  const pieData = useMemo(
    () =>
      chartData.map((it) => ({
        name: it.month,
        population: it.value,
        color: it.color,
      })),
    []
  )

  const activeIndex = useMemo(
    () => chartData.findIndex((c) => c.month === selectedMonth),
    [selectedMonth]
  )
  const activeData = chartData[activeIndex]

  const prevIndex = (activeIndex - 1 + chartData.length) % chartData.length
  const prevValue = chartData[prevIndex].value
  const change = activeData.value - prevValue
  const pctChange = prevValue === 0 ? 0 : (change / prevValue) * 100
  const isUp = change >= 0

  const anim = useMemo(() => new Animated.Value(0), [])
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start()
  }, [selectedMonth])

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  })

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Monthly Visitors</Text>
          <Text style={styles.subtitle}>Jan - Dec {new Date().getFullYear()}</Text>
        </View>

        <View style={styles.trendBadge}>
          <Text style={[styles.trendText, { color: isUp ? "#16a34a" : "#dc2626" }]}>
            {isUp ? "▲" : "▼"} {Math.abs(pctChange).toFixed(1)}%
          </Text>
          <Text style={styles.trendSub}>{isUp ? "vs prev month" : "down vs prev"}</Text>
        </View>
      </View>

      {/* Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(v) => setSelectedMonth(v)}
          style={styles.picker}
        >
          {chartData.map((item) => (
            <Picker.Item key={item.month} label={item.month} value={item.month} />
          ))}
        </Picker>
      </View>

      {/* PieChart (tap to select month) */}
      <View style={styles.chartArea}>
        <View style={styles.shadowCircle} />
        <Pressable
          onPress={() => {
            const nextIndex = (activeIndex + 1) % chartData.length
            setSelectedMonth(chartData[nextIndex].month)
          }}
        >
          <PieChart
            data={pieData}
            width={screenWidth - 32} // adjusted for padding
            height={240}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#f8fafc",
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="16"
            absolute
            hasLegend={false}
          />
        </Pressable>

        {/* Center knob */}
        <Animated.View style={[styles.centerKnob, { transform: [{ scale }] }]}>
          <Text style={styles.centerValue}>{activeData.value.toLocaleString()}</Text>
          <Text style={styles.centerLabel}>{activeData.month}</Text>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    marginVertical: 12,
    width: 500  ,
    alignSelf: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "700", color: "#0f172a" },
  subtitle: { color: "#64748b", fontSize: 12 },
  trendBadge: { alignItems: "flex-end" },
  trendText: { fontWeight: "700", fontSize: 14 },
  trendSub: { fontSize: 10, color: "#64748b" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#eef2ff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
    width: 400, 
    alignSelf: "center", 
  },
  picker: { height: 40, width: "100%", },
  chartArea: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 8,marginLeft:450
  },
  shadowCircle: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#000",
    opacity: 0.06,
    bottom: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2, marginLeft:-200
  },
  centerKnob: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#eef2ff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,marginLeft:-200
  },
  centerValue: { fontSize: 22, fontWeight: "800", color: "#0f172a" },
  centerLabel: { fontSize: 12, color: "#0d0d0eff", marginTop: 4 },
})
