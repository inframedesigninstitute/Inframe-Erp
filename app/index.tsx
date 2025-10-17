import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Web Apps for each role
import StudentWebApp from "../src/StudentDashboard/App"; // StudentDashboard folder
import AdminWebApp from "../src/admin/App";
import FacultyWebApp from "../src/faculty/App";
import ParentWebApp from "../src/parent/App";

type Role = "admin" | "student" | "parent" | "faculty" | null;

export default function App() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  // Render selected web app based on role
  const renderRoleApp = () => {
    switch (selectedRole) {
      case "admin":
        return <AdminWebApp />;
      case "student":
        return <StudentWebApp />;
      case "parent":
        return <ParentWebApp />;
      case "faculty":
        return <FacultyWebApp />;
      default:
        return null;
    }
  };

  // Role selection screen
  if (!selectedRole) {
    return (
      <View style={styles.roleSelection}>
        <Text style={styles.title}>Select Your Role</Text>

        <TouchableOpacity style={styles.button} onPress={() => setSelectedRole("admin")}>
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setSelectedRole("student")}>
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setSelectedRole("parent")}>
          <Text style={styles.buttonText}>Parent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setSelectedRole("faculty")}>
          <Text style={styles.buttonText}>Faculty</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render the selected web app
  return renderRoleApp();
}

const styles = StyleSheet.create({
  roleSelection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#eef5fb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
