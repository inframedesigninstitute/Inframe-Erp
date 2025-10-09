import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.card}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <Image
            source={{ uri: "https://images.ctfassets.net/4cd45et68cgf/564owNzMKj6UGjvTEZkKSJ/c853cf640796fcd532d60c23fc57f6b6/Rowan_Atkinson_credit__Alastair_Muir.jpg?w=2000" }}
            style={styles.profileImage}
          />
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>ACADEMIC INFORMATION</Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>Batch:</Text> 5th Batch
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>Program:</Text> Computer Engineering
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>Session:</Text> Spring-2022
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>Semester:</Text> 1st Semester 2018
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>Section:</Text> Section A
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>Status:</Text>{" "}
              <Text style={styles.status}>New Admission</Text>
            </Text>
          </View>
        </View>

        {/* Middle Section */}
        <View style={styles.middleSection}>
          <Text style={styles.infoTitle}>PROFILE INFO</Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Student ID:</Text> #1014
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Name:</Text> Rylee Pratt
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Father Name:</Text> Henry Pollard
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Mother Name:</Text> Russell Rosa
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Email:</Text> student@mail.com
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Phone:</Text> +1 (611) 728-8917
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Gender:</Text> Other
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Date Of Birth:</Text> 25-03-1972
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Marital Status:</Text> Widowed
          </Text>
          <Text style={styles.infoItem}>
            <Text style={styles.label}>Blood Group:</Text> A+
          </Text>
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>PRESENT ADDRESS</Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>State/Province:</Text> Khulna
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>District/City:</Text> Norail
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>Address:</Text> Nihil fuga Tempore
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>PERMANENT ADDRESS</Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>State/Province:</Text> Rangpur
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>District/City:</Text> Dinajpur
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.label}>Address:</Text> Est illo officia do
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f2ff",
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  leftSection: {
    flex: 1,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  infoBox: {
    marginTop: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "90%",
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    fontSize: 14,
  },
  infoItem: {
    fontSize: 15,
    marginVertical: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#000000ff",
  },
  status: {
    backgroundColor: "#007bff",
    color: "#fff",
    paddingHorizontal: 4,
    borderRadius: 3,
    fontSize: 10,
  },
  middleSection: {
    flex: 2,
    paddingHorizontal: 10,
  },
  rightSection: {
    flex: 1.5,
    paddingLeft: 10,
  },
});
