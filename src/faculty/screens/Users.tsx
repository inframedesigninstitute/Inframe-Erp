import { StyleSheet, Text, View } from "react-native";

export default function Users() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users Management</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold" },
});
