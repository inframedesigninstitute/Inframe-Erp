import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // ✅ Icon import
import { theme } from "../theme";

type Props = {
  title: string;
  value: string | number;
  color?: "blue" | "teal" | "cyan" | "aqua";
  iconName?: string; // ✅ Optional icon prop
};

const colorMap: Record<string, string> = {
  blue: theme.colors.appbarFg,
  teal: theme.colors.appbarFg,
  cyan: theme.colors.appbarFg,
  aqua: theme.colors.appbarFg,
};

export default function KpiCard({
  title,
  value,
  color = "blue",
  iconName = "bar-chart", // ✅ Default icon
}: Props) {
  const bg = colorMap[color] || theme.colors.appbarFg;

  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.header}>
        {/* ✅ Replaced empty View with actual Icon */}
        <Icon name={iconName} size={28} color="#000000ff" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.layout.radius,
    padding: 16,
    minHeight: 96,
    width: 300,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    margin: 4,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontWeight: "600",
    color: "#000000ff",
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000ff",
    lineHeight: 34,
    marginTop: 8,
  },
});
