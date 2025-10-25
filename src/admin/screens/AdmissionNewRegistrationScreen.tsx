import { StyleSheet, Text, View } from "react-native";

const AdmissionNewRegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admission - New Registration</Text>
      <Text style={styles.text}>This is the Admission New Registration screen.</Text>
    </View>
  );
};

export default AdmissionNewRegistrationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", color: "#0f1b30", marginBottom: 10 },
  text: { fontSize: 16, color: "#333" },
});
