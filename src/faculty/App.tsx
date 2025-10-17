import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { adminRoutes } from "./navigation/routes";
import Sidebar from "./navigation/Sidebar";

export default function AdminWebApp() {
  const [selected, setSelected] = useState("Dashboard");

  const SelectedComponent = adminRoutes.find((r) => r.name === selected)?.component;

  return (
    <View style={styles.container}>
      <Sidebar routes={adminRoutes} selected={selected} onSelect={setSelected} />
      <View style={styles.mainContent}>
        {SelectedComponent ? <SelectedComponent /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "100%",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
});
