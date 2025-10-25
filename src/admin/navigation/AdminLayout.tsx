import { useState } from "react";
import { View } from "react-native";
import Sidebar from "./Sidebar";
import { adminRoutes } from "./routes";

const AdminLayout = () => {
  const [selected, setSelected] = useState("Dashboard");

  // ✅ Main + SubRoute Screen Handler
  const SelectedComponent = (() => {
    const mainRoute = adminRoutes.find((r) => r.name === selected);
    if (mainRoute) return mainRoute.component;

    for (const route of adminRoutes) {
      if (route.subRoutes) {
        const sub = route.subRoutes.find((s) => s.name === selected);
        if (sub) return sub.component;
      }
    }
    return null;
  })();

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f9fafb" }}>
      <Sidebar routes={adminRoutes} selected={selected} onSelect={setSelected} />
      <View style={{ flex: 1 }}>
        {SelectedComponent ? <SelectedComponent /> : null}
      </View>
    </View>
  );
};

export default AdminLayout;
