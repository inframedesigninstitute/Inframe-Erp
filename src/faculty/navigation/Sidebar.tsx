import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SidebarProps = {
  routes: { name: string }[];
  selected: string;
  onSelect: (name: string) => void;
};

export default function Sidebar({ routes, selected, onSelect }: SidebarProps) {
  return (
    <View style={styles.sidebar}>
      {routes.map((route) => (
        <TouchableOpacity
          key={route.name}
          style={[styles.item, selected === route.name && styles.activeItem]}
          onPress={() => onSelect(route.name)}
        >
          <Text style={styles.itemText}>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    backgroundColor: "#2c3e50",
    height: "100%",
    paddingTop: 20,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  activeItem: {
    backgroundColor: "#34495e",
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
  },
});
