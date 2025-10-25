import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AttendancesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Attendances</Text>
      <Text style={styles.content}>
        This is the main attendance dashboard. From here, you can view the daily attendance status or navigate to subject-specific and reporting screens.
      </Text>
      {/* Add your daily attendance overview widget or navigation links here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default AttendancesScreen;