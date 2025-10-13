// TimeTableScreen.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-web-linear-gradient'; // Works for web & mobile

// --- Type Definitions ---
interface ClassItem {
  code: string;
  subject: string;
  time: string;
  room: string;
  instructor: string;
  color: string;
}

interface Day {
  name: string;
  classes: ClassItem[];
}

const DAYS: Day[] = [
  { name: 'Sunday', classes: [] },
  {
    name: 'Monday',
    classes: [
      { code: 'MCSC', subject: 'MCSC', time: '9-10', room: 'Design Studio A', instructor: 'Prof. Smith', color: '#20B2AA' },
      { code: 'MICRO', subject: 'Microprocessor', time: '11-12', room: 'Computer Lab 1', instructor: 'Dr. Johnson', color: '#008080' },
    ],
  },
  {
    name: 'Tuesday',
    classes: [
      { code: 'DIFF', subject: 'Differential', time: '9-10', room: 'Math Lab', instructor: 'Prof. Davis', color: '#20B2AA' },
      { code: 'COMM', subject: 'Communication', time: '1-2', room: 'Comm Lab', instructor: 'Dr. Martinez', color: '#008080' },
    ],
  },
  {
    name: 'Wednesday',
    classes: [
      { code: 'COMM', subject: 'Communication', time: '9-10', room: 'Comm Lab', instructor: 'Dr. Martinez', color: '#008080' },
      { code: 'DIFF', subject: 'Differential', time: '11-12', room: 'Math Lab', instructor: 'Prof. Davis', color: '#20B2AA' },
      { code: 'COMLAB', subject: 'Com - Lab', time: '2-3', room: 'Computer Lab 2', instructor: 'Prof. Wilson', color: '#8FBC8F' },
    ],
  },
  {
    name: 'Thursday',
    classes: [
      { code: 'MCSC', subject: 'MCSC', time: '9-10', room: 'Design Studio A', instructor: 'Prof. Smith', color: '#20B2AA' },
      { code: 'DB', subject: 'Database', time: '1-2', room: 'Database Lab', instructor: 'Dr. Brown', color: '#008080' },
    ],
  },
  {
    name: 'Friday',
    classes: [
      { code: 'DB', subject: 'Database', time: '9-10', room: 'Database Lab', instructor: 'Dr. Brown', color: '#008080' },
      { code: 'MICRO', subject: 'Microprocessor', time: '12-1', room: 'Computer Lab 1', instructor: 'Dr. Johnson', color: '#008080' },
      { code: 'DIFF', subject: 'Differential', time: '2-3', room: 'Math Lab', instructor: 'Prof. Davis', color: '#20B2AA' },
    ],
  },{
    name: 'Friday',
    classes: [
      { code: 'DB', subject: 'Database', time: '9-10', room: 'Database Lab', instructor: 'Dr. Brown', color: '#008080' },
      { code: 'MICRO', subject: 'Microprocessor', time: '12-1', room: 'Computer Lab 1', instructor: 'Dr. Johnson', color: '#008080' },
      { code: 'DIFF', subject: 'Differential', time: '2-3', room: 'Math Lab', instructor: 'Prof. Davis', color: '#20B2AA' },
    ],
  },
];

const TIME_SLOTS = ['9-10', '10-11', '11-12', '12-1', '1-2', '2-3', ];

// --- Helper Function for 3D Shade ---
function shadeColor(color: string, percent: number) {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

// --- 3D Gradient Class Card ---
const ClassCard: React.FC<{ classItem: ClassItem }> = ({ classItem }) => {
  const darkerColor = shadeColor(classItem.color, -20);
  return (
    <LinearGradient
      colors={[classItem.color, darkerColor]}
      style={styles.classCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Text style={styles.classSubject}>{classItem.subject}</Text>
      <Text style={styles.classRoom}>{classItem.room}</Text>
    </LinearGradient>
  );
};

// --- Main Component ---
export default function TimeTableScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView horizontal>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.universityName}>KATHMANDU UNIVERSITY</Text>
            <View style={styles.courseInfo}>
              <Text style={styles.courseName}>Computer Engineering</Text>
              <Text style={styles.semesterInfo}>Year-II Semester-II</Text>
            </View>
          </View>

          {/* Time Table */}
          <View style={styles.timetableContainer}>
            {/* Time Header Row */}
            <View style={styles.timeHeaderRow}>
              <View style={styles.dayLabelCell}></View>
              {TIME_SLOTS.map((time) => (
                <View key={time} style={styles.timeHeaderCell}>
                  <Text style={styles.timeHeaderText}>{time}</Text>
                </View>
              ))}
            </View>

            {/* Day Rows */}
            {DAYS.map((day) => (
              <View key={day.name} style={styles.dayRow}>
                <View style={styles.dayLabelCell}>
                  <Text style={styles.dayLabelText}>{day.name}</Text>
                </View>
                {TIME_SLOTS.map((timeSlot) => {
                  const classForTime = day.classes.find((cls) => cls.time === timeSlot);
                  return (
                    <View key={timeSlot} style={styles.timeSlotCell}>
                      {classForTime ? <ClassCard classItem={classForTime} /> : <View style={styles.emptySlot} />}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f0f0', padding: 20 },
  container: { flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  header: { alignItems: 'center', marginBottom: 30 },
  universityName: { fontSize: 16, color: '#999999', fontWeight: '400', marginBottom: 8, textTransform: 'uppercase' },
  courseInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  courseName: { fontSize: 20, fontWeight: 'bold', color: '#333333' },
  semesterInfo: { fontSize: 14, color: '#999999', fontWeight: '400' },
  timetableContainer: { backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', overflow: 'hidden' },
  timeHeaderRow: { flexDirection: 'row', backgroundColor: '#f8f9fa', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  dayRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  dayLabelCell: { width: 120, height: 60, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#e0e0e0', backgroundColor: '#f8f9fa' },
  dayLabelText: { fontSize: 14, color: '#222121ff', fontWeight: '600' },
  timeHeaderCell: { width: 120, height: 50, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#e0e0e0' },
  timeHeaderText: { fontSize: 14, color: '#252424ff', fontWeight: '600' },
  timeSlotCell: { width: 120, height: 60, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#f0f0f0', paddingHorizontal: 4, paddingVertical: 4 },
  emptySlot: { width: '100%', height: '100%', backgroundColor: 'transparent' },
  classCard: { width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.35, shadowRadius: 6, elevation: 6, padding: 4 },
  classSubject: { color: '#ffffff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  classRoom: { color: '#ffffff', fontSize: 10, textAlign: 'center', marginTop: 2 },
});
