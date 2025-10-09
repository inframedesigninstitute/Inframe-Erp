import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

type Props = {
  title: string;
};

const GenericScreen: React.FC<Props> = ({ title }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          This is a placeholder screen for <Text style={{ fontWeight: "bold" }}>{title}</Text>. 
          You can wire in forms, tables, or content here.
        </Text>
      </View>
    </ScrollView>
  );
};

export default GenericScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: theme.layout?.gap || 12,
    backgroundColor: theme.colors?.pageBg || "#f9f9f9", // ✅ fallback fix
  },
  card: {
    width: "100%",
    maxWidth: theme.layout?.contentMax || 800,
    backgroundColor: theme.colors?.cardBg || "#fff",
    borderRadius: theme.layout?.radius || 8,
    borderWidth: 1,
    borderColor: theme.colors?.cardBorder || "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: theme.colors?.sidebarFg || "#333",
  },
  description: {
    color: theme.colors?.textMuted || "#666",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
});
