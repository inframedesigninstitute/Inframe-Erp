import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Topbar from "./components/topbar";
import { NavProvider, useNav } from "./contexts/nav-context";
import { getScreenForRoute } from "./navigation/Routes";
import Sidebar from "./navigation/sidebar";
import LoginScreen from "./screens/LoginScreen"; // Import your LoginScreen

function MainContent() {
  const { selected } = useNav();

  return (
    <View style={styles.main}>
      <Topbar />
      {getScreenForRoute(selected || "Dashboard")}
    </View>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <NavProvider>
      {isLoggedIn ? (
        <View style={styles.container}>
          <Sidebar />
          <MainContent />
        </View>
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} /> // Show login first
      )}
    </NavProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#eef5fb",
  },
  main: {
    flex: 1,
    flexDirection: "column",
    minWidth: 0,
  },
});
