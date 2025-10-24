import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Route } from "./routes"; // Fixed import path

type SidebarProps = {
  routes: Route[];
  selected: string;
  onSelect: (name: string) => void;
};

export default function Sidebar({ routes, selected, onSelect }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => setOpenMenu(openMenu === name ? null : name);

  const handlePress = (route: Route) => {
    if (route.subRoutes) {
      toggleMenu(route.name);
    } else {
      onSelect(route.name);
    }
  };

  const renderItem = (route: Route, level: number = 0) => {
    const isActive = selected === route.name;
    const isMenuOpen = openMenu === route.name;
    const collapseIcon = route.subRoutes ? (isMenuOpen ? "chevron-down" : "chevron-forward") : undefined;
    const paddingLeft = 20 + level * 20;

    return (
      <View key={route.name}>
        <TouchableOpacity
          style={[styles.item, isActive && styles.activeItem, { paddingLeft }]}
          onPress={() => handlePress(route)}
        >
          {route.icon && (
            <Ionicons
              name={route.icon}
              size={20}
              color={isActive ? "#202630ff" : "#000000ff"}
              style={styles.icon}
            />
          )}
          <Text style={[styles.itemText, isActive && styles.activeText]}>{route.name}</Text>
          {collapseIcon && (
            <Ionicons
              name={collapseIcon}
              size={18}
              color="#000"
              style={styles.collapseIcon}
            />
          )}
        </TouchableOpacity>

        {/* Render sub-routes */}
        {isMenuOpen &&
          route.subRoutes?.map((subRoute: Route) => renderItem(subRoute, level + 1))}
      </View>
    );
  };

  return (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {routes.map(route => renderItem(route))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 300,
    backgroundColor: "#fdfdfd",
    height: "100%",
    paddingTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingRight: 20,
    position: "relative",
  },
  activeItem: { backgroundColor: "#e2e2e2" },
  itemText: { color: "#000", fontSize: 16, flex: 1 },
  activeText: { color: "#0f1b30", fontWeight: "600" },
  icon: { marginRight: 10 },
  collapseIcon: { position: "absolute", right: 15 },
});
