import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { useNav } from "../contexts/nav-context";
import { theme } from "../theme";

const menuData = [
  {
    label: "Dashboard", icon: "dashboard", path: "Dashboard" },
    { label: "Class Schedule", path: "students/TimeTableScreen" },
    { label: "Exam Schedule", path: "ExamScheduleScreen" },
    { label: "Attendances", path: "students/Lecture_wise_AttendanceScreen" },
    { label: "Apply Leave", path: "LeaveApplication" },
      { label: "Fees Report", path: "FeesReport" },
     { label: "Library", icon: "menu-book", path: "Library" },


  // {
  //   label: "Students",
  //   icon: "group",
  //   children: [
  //     { label: "Student_Dashboard", path: "students/Student_Dashboard" },
  //     { label: "Time_Table", path: "students/TimeTableScreen" },
  //     {
  //       label: "Attendance",
  //       path: "Students/Reports",
  //       children: [
  //         { label: "Subject Attendance", path: "students/Subject_Attendance" },
  //         { label: "Monthly Attendance", path: "students/Monthly_AttendanceScreen" },
  //         { label: "Daily Attendance", path: "students/Lecture_wise_AttendanceScreen" }
  //       ]},
  //          { label: "Assignment", path: "Students/Assignment" },
  //         { label: "ProfileScreen", path: "students/ProfileScreen" },
  //          { label: "COUSERS", path: "students/CousersScreen" },

        
  //   ]
  // },
  // { label: "Fees Collection", icon: "payments", children: [
  //     { label: "Fee Types", path: "Fees Collection/Fee Types" },
  //     { label: "Payments", path: "Fees Collection/Payments" },
  //     { label: "Due Reports", path: "Fees Collection/Due Reports" },
  // ]},
  { label: "Reports", icon: "bar-chart", path: "Reports" },
  { label: "Communicates", icon: "chat", path: "Communicates" },
  { label: "Library", icon: "menu-book", path: "Library" },
  { label: "Inventory", icon: "inventory", path: "Inventory" },
  { label: "Hostels", icon: "hotel", path: "Hostels" },
  { label: "Transports", icon: "local-taxi", path: "Transports" },
  { label: "Front Desk", icon: "room-service", path: "Front Desk" },
  { label: "Transcripts", icon: "description", path: "Transcripts" },
  { label: "Front Web", icon: "web", path: "Front Web" },
  { label: "My Profile", icon: "person", path: "My Profile" },
  { label: "Settings", icon: "settings", path: "Settings" },
];

export default function Sidebar() {
  const { selected, setSelected } = useNav();

  // 🔹 updated expanded state as array
  const [expanded, setExpanded] = useState<string[]>([]);

  // 🔹 updated toggleExpand function
  const toggleExpand = (label: string) => {
    if (expanded.includes(label)) {
      setExpanded(expanded.filter((l) => l !== label));
    } else {
      setExpanded([...expanded, label]);
    }
  };

  const renderMenu = (items: any[], level = 0) => {
    return items.map((item) => {
      const isExpanded = expanded.includes(item.label);
      const isActive = selected === item.path || selected?.startsWith(item.label);

      return (
        <View key={item.label}>
          <TouchableOpacity
            style={[
              styles.item,
              isActive && styles.itemActive,
              { paddingLeft: 10 + level * 20 },
            ]}
            onPress={() =>
              item.children ? toggleExpand(item.label) : setSelected(item.path || item.label)
            }
          >
            {item.icon && <Icon name={item.icon} size={20} color="#000" style={styles.itemIcon} />}
            <Text style={[styles.itemLabel, { color: isActive ? "#000" : "#000" }]}>
              {item.label}
            </Text>

            {item.children && (
              <Icon
                name="chevron-right"
                size={20}
                color={"#000"}
                style={[
                  styles.arrowIcon,
                  isExpanded && { transform: [{ rotate: "90deg" }] },
                ]}
              />
            )}
          </TouchableOpacity>

          {isExpanded && item.children && (
            <View style={styles.subMenu}>{renderMenu(item.children, level + 1)}</View>
          )}
        </View>
      );
    });
  };

  return (
    <View style={styles.sidebar}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="school" size={28} color={"#000"} />
        <Text style={styles.headerText}>Inframe</Text>
      </View>

      {/* Scrollable Menu */}
      <ScrollView
        contentContainerStyle={styles.nav}
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        {renderMenu(menuData)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: theme.layout.sidebarWidth,
    backgroundColor: "#f8f1f1ff",
    height: "100%",
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000000ff",
  },
  nav: {
    paddingVertical: 8,
  },
  scrollArea: {
    flex: 1,
    ...Platform.select({
      web: {
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      },
    }) as any,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: "#ffffffff",
  },
  itemActive: {
    backgroundColor: "rgba(230, 226, 226, 1)",
  },
  itemIcon: {
    marginRight: 10,
    color: "#000",
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  arrowIcon: {
    marginLeft: "auto",
    transition: "transform 0.2s ease-in-out",
  } as any,
  subMenu: {
    marginLeft: 15,
    borderLeftWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingLeft: 10,
    marginBottom: 5,
    backgroundColor: "#ffffffff",
    borderRadius: 5,
    color: "#000",
  },
  subItem: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  subItemLabel: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "500",
  },
});