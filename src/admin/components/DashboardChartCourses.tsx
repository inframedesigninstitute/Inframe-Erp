import { TrendingUp } from "lucide-react"
import { useState } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { LineChart } from "react-native-chart-kit"

const screenWidth = Dimensions.get("window").width - 32

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [186, 305, 237, 73, 209, 214],
      color: () => "#4f46e5",
      strokeWidth: 2,
      name: "Desktop",
    },
    {
      data: [80, 200, 120, 190, 130, 140],
      color: () => "#14b8a6",
      strokeWidth: 2,
      name: "Mobile",
    },
    {
      data: [120, 180, 150, 100, 160, 170],
      color: () => "#f59e0b",
      strokeWidth: 2,
      name: "Tablet",
    },
  ],
}

export default function DashboardChartCourses() {
  const [tooltip, setTooltip] = useState<{
    name: string
    value: number
    label: string
    x: number
    y: number
  } | null>(null)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Line Chart - Multiple</Text>
      <Text style={styles.subtitle}>January - June 2024</Text>

      <View  style={styles.chatsa} >
        <LineChart
          data={chartData}
          width={screenWidth }
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => "#6b7280",
            propsForDots: { r: "4" },
          }}
          bezier
          style={styles.chart}
          onDataPointClick={(data) => {
            const dataset = data.dataset as {
              data: number[]
              color: (opacity: number) => string
              strokeWidth: number
              name: string
            }
            setTooltip({
              name: dataset.name,
              value: data.value,
              label: chartData.labels[data.index],
              x: data.x,
              y: data.y,
            })
          }}
        />

        {/* Floating 3D tooltip */}
        {tooltip && (
          <View
            style={[
              styles.tooltip,
              {
                left: tooltip.x - 35,
                top: tooltip.y - 50,
              },
            ]}
          >
            <Text style={styles.tooltipName}>{tooltip.name}</Text>
            <Text style={styles.tooltipValue}>
              {tooltip.label}: {tooltip.value}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.trendContainer}>
        <View style={styles.trendRow}>
          <Text style={styles.trendText}>Trending up by 5.2% this month</Text>
          <TrendingUp size={16} />
        </View>
        <Text style={styles.trendNote}>
          Showing total visitors for the last 6 months
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 16,
  },
  chatsa:{
    width:"100%"
  },
  chart: {
    borderRadius: 8,
  },
  tooltip: {
    position: "absolute",
    width: 80,
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#fefefe",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tooltipName: {
    fontWeight: "700",
    fontSize: 12,
    color: "#1f2937",
  },
  tooltipValue: {
    fontSize: 12,
    color: "#4b5563",
  },
  trendContainer: {
    marginTop: 16,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    fontWeight: "500",
  },
  trendNote: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2,
  },
})
