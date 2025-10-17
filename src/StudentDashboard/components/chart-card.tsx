"use client"

import React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"

type Props = {
  title?: string
}

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "#2aa0e8" },
  mobile: { label: "Mobile", color: "#ff7f50" },
}

export default function ChartCard({ title }: Props) {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    if (timeRange === "7d") daysToSubtract = 7
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          {title && <h2 style={{ fontSize: 18, fontWeight: 600 }}>{title}</h2>}
          <p style={{ fontSize: 14, color: "#000000ff" }}>Interactive Area Chart</p>
        </div>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ padding: 8, borderRadius: 4 }}>
          <option value="90d">Last 3 months</option>
          <option value="30d">Last 30 days</option>
          <option value="7d">Last 7 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={filteredData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartConfig.desktop.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={chartConfig.desktop.color} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartConfig.mobile.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={chartConfig.mobile.color} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <Tooltip />
          <Area type="monotone" dataKey="desktop" stroke={chartConfig.desktop.color} fill="url(#colorDesktop)" />
          <Area type="monotone" dataKey="mobile" stroke={chartConfig.mobile.color} fill="url(#colorMobile)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
