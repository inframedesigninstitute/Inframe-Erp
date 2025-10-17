import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dummySchedule = [
  { time: '09:00 - 10:00', subject: 'Math: Algebra', teacher: 'Mr. John Smith', location: 'Class C, Block B', color: '#7a70fa' },
  { time: '10:00 - 11:00', subject: 'English Literature', teacher: 'Ms. Clara Jones', location: 'Class A, Block D', color: '#FFC107' },
  { time: '11:00 - 12:00', subject: 'Lunch Break', teacher: '', location: '', color: '#4CAF50' },
  { time: '12:00 - 01:00', subject: 'Biology: Lab', teacher: 'Dr. Emily Watson', location: 'Lab 2', color: '#2196F3' },
];

const MyScheduleSection: React.FC = () => {
  return (
    <View style={styles.sectionContainer}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My schedule</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View all</Text>
        </TouchableOpacity>
      </View>

      {/* Schedule List */}
      <ScrollView style={styles.scheduleList} showsVerticalScrollIndicator={false}>
        {dummySchedule.map((lesson, index) => (
          <View key={index} style={styles.lessonItem}>
            {/* Color Bar */}
            <View style={[styles.colorBar, { backgroundColor: lesson.color }]} />

            {/* Content */}
            <View style={styles.lessonDetails}>
              <Text style={styles.lessonTime}>{lesson.time}</Text>
              <Text style={styles.lessonSubject}>{lesson.subject}</Text>
              {lesson.teacher ? (
                <View style={styles.metaRow}>
                  <FeatherIcon name="user" size={12} color="#888" />
                  <Text style={styles.lessonMetaText}>{lesson.teacher}</Text>
                </View>
              ) : null}
              {lesson.location ? (
                <View style={styles.metaRow}>
                  <FeatherIcon name="map-pin" size={12} color="#888" />
                  <Text style={styles.lessonMetaText}>{lesson.location}</Text>
                </View>
              ) : null}
            </View>

            {/* Time Icon (Clock) */}
            <Icon name="clock-outline" size={24} color="#ccc" style={styles.clockIcon} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#f1f5fb',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    padding: 5,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#7a70fa',
    fontWeight: '600',
  },
  scheduleList: {
    maxHeight: 400,
  },
  lessonItem: {
    flexDirection: 'row',
    backgroundColor: '#f9fafc',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    overflow: 'hidden',
    // 3D / neumorphic shadow
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  colorBar: {
    width: 6,
    height: '100%',
    borderRadius: 3,
    marginRight: 10,
    alignSelf: 'stretch',
  },
  lessonDetails: {
    flex: 1,
    paddingRight: 10,
  },
  lessonTime: {
    fontSize: 12,
    color: '#7a70fa',
    fontWeight: '600',
  },
  lessonSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  lessonMetaText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  clockIcon: {
    opacity: 0.3,
  },
});

export default MyScheduleSection;
