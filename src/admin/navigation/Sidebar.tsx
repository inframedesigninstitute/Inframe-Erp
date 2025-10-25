import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Route } from "./routes";

type SidebarProps = {
  routes: Route[];
  selected: string;
  onSelect: (name: string) => void;
};

export default function Sidebar({ routes, selected, onSelect }: SidebarProps) {
  // FIX: Use an array to track all currently open menus for deep nesting
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => {
      if (prev.includes(name)) {
        // Close menu: remove the name
        return prev.filter(menuName => menuName !== name);
      } else {
        // Open menu: add the name
        return [...prev, name];
      }
    });
  };

  const handlePress = (route: Route) => {
    if (route.subRoutes) {
      // FIX: Toggle menu for any route that has subRoutes
      toggleMenu(route.name);
    } else {
      // If it's a leaf node, select it
      onSelect(route.name);
    }
  };

  const renderItem = (route: Route, level: number = 0) => {
    const isActive = selected === route.name;
    // FIX: Check if the current route's name is in the list of open menus
    const isMenuOpen = openMenus.includes(route.name); 
    
    // Determine the collapse/expand icon
    const collapseIcon = route.subRoutes
      ? isMenuOpen
        ? "chevron-down"
        : "chevron-forward"
      : route.isSubRoute && !route.subRoutes // For nested items without further children (like the dash/minus sign)
        ? "remove"
        : undefined;
        
    // Calculate padding for nesting
    const paddingLeft = 15 + level * 20;

    return (
      <View key={route.name}>
        <TouchableOpacity
          style={[styles.item, isActive && styles.activeItem, { paddingLeft }]}
          onPress={() => handlePress(route)}
        >
          {/* Render main icon (only for top level items, or if explicitly defined and not a submenu dash) */}
          {route.icon && level === 0 && (
            <Ionicons
              name={route.icon}
              size={20}
              color={isActive ? "#202630ff" : "#000000ff"}
              style={styles.icon}
            />
          )}

          {/* Render the dash icon for third-level items (subRoutes of a subRoute) */}
          {collapseIcon === 'remove' && (
             <Ionicons
              name="remove" // Use the dash icon for sub-items
              size={18}
              color="#000"
              style={styles.dashIcon} // Use a specific style for alignment
            />
          )}

          <Text 
            style={[
              styles.itemText, 
              isActive && styles.activeText, 
              // Adjust margin if a main icon or dash icon is NOT present
              { marginLeft: (route.icon && level === 0) || collapseIcon === 'remove' ? 10 : 0 }
            ]}
          >
            {route.name}
          </Text>
          
          {/* Render the expand/collapse icon for menu items */}
          {collapseIcon && collapseIcon !== 'remove' && (
            <Ionicons
              name={collapseIcon}
              size={18}
              color="#000"
              style={styles.collapseIcon}
            />
          )}
        </TouchableOpacity>

        {isMenuOpen &&
          route.subRoutes?.map((subRoute: Route) => renderItem(subRoute, level + 1))}
      </View>
    );
  };

  return (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {routes.map((route) => renderItem(route))}
      </ScrollView>
    </View>
  );
}

// RESTORED ORIGINAL STYLES
const styles = StyleSheet.create({
  sidebar: {
    width: 300,
    backgroundColor: "#fdfdfd", // Original style
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
  activeItem: { backgroundColor: "#e2e2e2" }, // Original style
  itemText: { color: "#000", fontSize: 16, flex: 1 }, // Original style
  activeText: { color: "#0f1b30", fontWeight: "600" }, // Original style
  icon: { marginRight: 10 },
  // Added a specific style for the dash icon to ensure alignment
  dashIcon: { 
    marginRight: 5,
    color: '#000', 
    width: 20, // Reserve space for alignment 
  },
  collapseIcon: { position: "absolute", right: 15 },
});