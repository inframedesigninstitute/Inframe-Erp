import { FC, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Ionicons";

// Dashboards
import StudentWebApp from "../StudentDashboard/App";
import FacultyWebApp from "../faculty/App";
import ParentWebApp from "../parent/App";

// Admin
import Sidebar from "../admin/navigation/Sidebar";
import { adminRoutes, Route } from "./navigation/routes";

// --- Custom Input Component ---
interface CustomInputProps {
  placeholder: string;
  iconName: string;
  secureTextEntry?: boolean;
}
const CustomInput: FC<CustomInputProps> = ({ placeholder, iconName, secureTextEntry = false }) => (
  <View style={inputStyles.container}>
    <Icon name={iconName} size={20} color="#8a8a8a" style={inputStyles.icon} />
    <Text style={inputStyles.input}>{placeholder}</Text>
  </View>
);

const inputStyles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", backgroundColor: "#f5f5f5", borderRadius: 8, paddingHorizontal: 15, height: 50, marginBottom: 15, borderWidth: 1, borderColor: "#e8e8e8" },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#333", paddingVertical: 0 },
});

// --- Demo Button ---
interface DemoButtonProps { label: string; onPress: () => void; color: string; }
const DemoButton: FC<DemoButtonProps> = ({ label, onPress, color }) => (
  <TouchableOpacity style={[demoButtonStyles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={demoButtonStyles.buttonText}>{label}</Text>
  </TouchableOpacity>
);
const demoButtonStyles = StyleSheet.create({
  button: { flex: 1, paddingVertical: 12, borderRadius: 8, marginHorizontal: 5, alignItems: "center", justifyContent: "center", minWidth: 120 },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});

type Role = "admin" | "student" | "faculty" | "parent" | null;

export default function EduManageLoginScreen() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Admin state
  const [selected, setSelected] = useState<string>(adminRoutes[0]?.name ?? "");

  // Recursive helper to find component by name (supports subRoutes)
  const findRouteComponent = (routes: Route[], name: string): React.ComponentType<any> | null => {
    for (let route of routes) {
      if (route.name === name) return route.component;
      if (route.subRoutes) {
        const sub = findRouteComponent(route.subRoutes, name);
        if (sub) return sub;
      }
    }
    return null;
  };
  const SelectedComponent = findRouteComponent(adminRoutes, selected);

  const handleLogin = () => {
    if (!selectedRole) { Alert.alert("Error", "Please select a role first!"); return; }
    setIsLoggedIn(true);
  };

  const handleDemoLogin = (role: Role) => { setSelectedRole(role); setIsLoggedIn(true); };

  // --- Render dashboards ---
  if (isLoggedIn && selectedRole) {
    switch (selectedRole) {
      case "admin":
        return (
          <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f9f9f9" }}>
            <Sidebar routes={adminRoutes} selected={selected} onSelect={setSelected} />
            <View style={{ flex: 1, padding: 20 }}>
              {SelectedComponent ? <SelectedComponent /> : null}
            </View>
          </View>
        );
      case "student": return <StudentWebApp />;
      case "faculty": return <FacultyWebApp />;
      case "parent": return <ParentWebApp />;
    }
  }

  // --- Login screen ---
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Icon name="school-outline" size={50} color="#333" />
        <Text style={styles.mainTitle}>EduManage ERP</Text>
        <Text style={styles.subTitle}>Educational Institution Management System</Text>
      </View>

      <View style={styles.loginCard}>
        <Text style={styles.cardTitle}>Sign In</Text>
        <Text style={styles.cardSubtitle}>Access your educational portal</Text>

        <Text style={styles.inputLabel}>Full Name</Text>
        <CustomInput placeholder="Enter your full name" iconName="person-outline" />

        <Text style={styles.inputLabel}>Email</Text>
        <CustomInput placeholder="Enter your email" iconName="mail-outline" />

        <Text style={styles.inputLabel}>Email OTP</Text>
        <CustomInput placeholder="Enter OTP sent to your email" iconName="key-outline" />

        <Text style={styles.inputLabel}>Role</Text>
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedRole(value)}
            items={[
              { label: "Student", value: "student" },
              { label: "Teacher / Faculty", value: "faculty" },
              { label: "Admin", value: "admin" },
              { label: "Parent", value: "parent" },
            ]}
            value={selectedRole}
            placeholder={{ label: "Select your role...", value: null, color: "#9ea0a0" }}
            style={pickerSelectStyles}
            Icon={() => <Icon name="chevron-down" size={20} color="#8a8a8a" />}
          />
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.demoAccessText}>DEMO ACCESS</Text>
        <View style={styles.demoButtonsContainer}>
          <DemoButton label="Admin Demo" onPress={() => handleDemoLogin("admin")} color="#5b4dc1" />
          <DemoButton label="Student Demo" onPress={() => handleDemoLogin("student")} color="#5b4dc1" />
        </View>
        <View style={styles.demoButtonsContainer}>
          <DemoButton label="Parent Demo" onPress={() => handleDemoLogin("parent")} color="#5b4dc1" />
          <DemoButton label="Faculty Demo" onPress={() => handleDemoLogin("faculty")} color="#5b4dc1" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", paddingVertical: 40, justifyContent: "center" },
  header: { alignItems: "center", marginBottom: 40 },
  mainTitle: { fontSize: 28, fontWeight: "bold", color: "#333", marginTop: 10 },
  subTitle: { fontSize: 16, color: "#666", marginTop: 5 },
  loginCard: { width: "90%", maxWidth: 500, backgroundColor: "#fff", borderRadius: 20, padding: 30 },
  cardTitle: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 5 },
  cardSubtitle: { fontSize: 16, color: "#8a8a8a", marginBottom: 30 },
  inputLabel: { fontSize: 14, color: "#333", marginBottom: 8, fontWeight: "500" },
  dropdownContainer: { backgroundColor: "#f5f5f5", borderRadius: 8, borderWidth: 1, borderColor: "#e8e8e8", marginBottom: 15 },
  signInButton: { backgroundColor: "#333", paddingVertical: 15, borderRadius: 8, marginTop: 20, alignItems: "center" },
  signInButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  demoAccessText: { textAlign: "center", fontSize: 12, color: "#8a8a8a", marginTop: 30, marginBottom: 15, letterSpacing: 0.5 },
  demoButtonsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 15, color: "#333", paddingRight: 30 },
  inputAndroid: { fontSize: 16, paddingHorizontal: 15, paddingVertical: 10, color: "#333", paddingRight: 30 },
  iconContainer: { top: 15, right: 15 },
  placeholder: { color: "#b0b0b0", fontSize: 16 },
});
