import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AttendanceReportsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Reports</Text>
      <Text style={styles.content}>
        This screen is designed to generate detailed attendance reports, allowing filtering by class, date range, and subject.
      </Text>
      {/* You would add your report generation UI (filters, tables, download buttons) here */}
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

export default AttendanceReportsScreen;