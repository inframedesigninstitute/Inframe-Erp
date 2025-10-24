import { LinearGradient } from "expo-linear-gradient";
import { AlertCircle, BookOpen, Building2, DollarSign, TrendingUp, Users } from "lucide-react-native";
import React from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]]; 
}

const StatCard = ({ title, value, change, isPositive, icon, colors }: StatCardProps) => {
  return (
    <LinearGradient colors={colors} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={[styles.change, { color: isPositive ? "#104232ff" : "#000000ff" }]}>{change}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.footerText, { color: isPositive ? "#3f4946ff" : "#000000ff" }]}>
        {isPositive ? "↑" : "↓"} {change} from last month
      </Text>
    </LinearGradient>
  );
};

export default function DashboardStats() {
  const stats: StatCardProps[] = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5%",
      isPositive: true,
      icon: <Users size={24} color="#030303ff" />,
      colors: ["#ffffffff", "#e0deddff"] as const, // <-- cast as tuple
    },
    {
      title: "Faculty Members",
      value: "147",
      change: "+2.1%",
      isPositive: true,
      icon: <BookOpen size={24} color="#070606ff" />,
      colors: ["#ffffffff", "#e0deddff"] as const,
    },
    {
      title: "Departments",
      value: "12",
      change: "No change",
      isPositive: true,
      icon: <Building2 size={24} color="#000000ff" />,
      colors: ["#ffffffff", "#e0deddff"] as const,
    },
    {
      title: "Fees Collected",
      value: "₹45.2L",
      change: "+33%",
      isPositive: true,
      icon: <DollarSign size={24} color="#000000ff" />,
      colors: ["#ffffffff", "#e0deddff"] as const,
    },
    {
      title: "Pending Fees",
      value: "₹12.8L",
      change: "-15.2%",
      isPositive: false,
      icon: <AlertCircle size={24} color="#000000ff" />,
      colors: ["#ffffffff", "#e0deddff"] as const,
    },
    {
      title: "Growth Rate",
      value: "8.5%",
      change: "+4.2%",
      isPositive: true,
      icon: <TrendingUp size={24} color="#000000ff" />,
      colors: ["#ffffffff", "#e0e3e4ff"] as const,
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  iconContainer: { backgroundColor: "rgba(255,255,255,0.2)", padding: 8, borderRadius: 12 },
  title: { fontSize: 14, color: "#000000ff", fontWeight: "500", marginBottom: 4 },
  value: { fontSize: 24, color: "#0e0c0cff", fontWeight: "700" },
  footerText: { fontSize: 12, fontWeight: "500", marginTop: 2 },
  change: { fontSize: 12, fontWeight: "600" },
});
