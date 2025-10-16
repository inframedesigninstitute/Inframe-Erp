import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// --- 1. Data Structure ---
interface SubjectAttendance {
  subject: string;
  attended: number;
  total: number;
  percentage: number;
}

// Mock Data
const mockAttendanceData: SubjectAttendance[] = [
  { subject: 'Programming in Java', attended: 28, total: 30, percentage: 93 },
  { subject: 'Database Management Systems', attended: 26, total: 30, percentage: 87 },
  { subject: 'Web Development', attended: 29, total: 30, percentage: 97 },
  { subject: 'Computer Networks', attended: 25, total: 30, percentage: 83 },
  { subject: 'Software Engineering', attended: 27, total: 30, percentage: 90 },
];

// --- 2. Helper Component: SubjectAttendanceBar ---
const SubjectAttendanceBar: React.FC<SubjectAttendance> = ({
  subject,
  attended,
  total,
  percentage,
}) => {
  const progressBarWidth = (percentage / 100) * 100;
  
  // Percentage color logic (Green >= 90, Orange >= 85, Red < 85)
  const percentageColor = percentage >= 90 ? '#22c438ff' : percentage >= 85 ? '#faa237ff' : '#c01616ff';

  return (
    <View style={styles.barContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.subjectText}>{subject}</Text>
        <Text style={[styles.percentageText, { color: percentageColor }]}>
          {percentage}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progressBarWidth}%` },
          ]}
        />
        <Text style={styles.countText}>{`${attended}/${total}`}</Text>
      </View>
    </View>
  );
};

// --- 3. Main Component: AttendanceOverview ---
const AttendanceOverview: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.mainHeader}>
          <Text style={styles.title}>Attendance Overview</Text>
          {/* Using a simple Text for the calendar icon as in the image */}
          <Text style={styles.iconPlaceholder}>📅</Text> 
        </View>
        
        {/* Render Attendance Bars */}
        {mockAttendanceData.map((item) => (
          <SubjectAttendanceBar
            key={item.subject}
            subject={item.subject}
            attended={item.attended}
            total={item.total}
            percentage={item.percentage}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f7fb', marginBottom:39
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    transform: [{ perspective: 1000 }],
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e6ebf1',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000ff',
    // letterSpacing: 0.1,
  },
  iconPlaceholder: {
    fontSize: 20,
    color: '#136ff0ff',
  },

  // Subject bar container with subtle 3D shadow
  barContainer: {
    marginBottom: 18,
    backgroundColor: '#f9fafc',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#a1a1aa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 0.6,
    borderColor: '#e2e8f0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  subjectText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#14181fff',
  },
  percentageText: {
    fontSize: 15,
    fontWeight: '500',
  },

  // Refined progress bar — clear, clean, and modern
  progressBarBackground: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6', // calm professional blue
    borderRadius: 6,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  countText: {
    position: 'absolute',
    right: 6,
    fontSize: 10,
    fontWeight: '500',
    color: '#000000ff',
  },
});


export default AttendanceOverview;