import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import DashboardCalendarView from './DashboardCalendarView.tsx';

interface CourseData {
  id: string;
  category: 'Design' | 'Business' | 'Languages';
  title: string;
  progress: number;
  totalLessons: number;
  color: string;
  avatars: { uri: string }[];
  extraUsersCount: number;
}

const courses: CourseData[] = [
  {
    id: '1',
    category: 'Design',
    title: 'Art, Design',
    progress: 8,
    totalLessons: 24,
    color: '#f9fafc',
    avatars: [
      { uri: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { uri: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { uri: 'https://randomuser.me/api/portraits/women/3.jpg' },
    ],
    extraUsersCount: 110,
  },
  {
    id: '2',
    category: 'Business',
    title: 'Photography',
    progress: 15,
    totalLessons: 30,
    color: '#f9fafc',
    avatars: [
      { uri: 'https://randomuser.me/api/portraits/men/4.jpg' },
      { uri: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { uri: 'https://randomuser.me/api/portraits/men/6.jpg' },
    ],
    extraUsersCount: 86,
  },
  {
    id: '3',
    category: 'Languages',
    title: 'Studio',
    progress: 18,
    totalLessons: 22,
    color: '#f9fafc',
    avatars: [
      { uri: 'https://randomuser.me/api/portraits/women/7.jpg' },
      { uri: 'https://randomuser.me/api/portraits/men/8.jpg' },
      { uri: 'https://randomuser.me/api/portraits/women/9.jpg' },
      { uri: 'https://randomuser.me/api/portraits/men/10.jpg' },
    ],
    extraUsersCount: 25,
  },
  {
    id: '4',
    category: 'Design',
    title: 'Web Dev',
    progress: 5,
    totalLessons: 10,
    color: '#f9fafc',
    avatars: [
      { uri: 'https://randomuser.me/api/portraits/men/11.jpg' },
      { uri: 'https://randomuser.me/api/portraits/women/12.jpg' },
    ],
    extraUsersCount: 45,
  },
];

const CourseCard: React.FC<{ course: CourseData }> = ({ course }) => {
  const progressPercent = (course.progress / course.totalLessons) * 100;

  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.cardContainer, { backgroundColor: course.color }]}>
        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{course.category}</Text>
            </View>
            <Text style={styles.bookmarkIcon}>⭐</Text>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {course.title}
          </Text>

          <View style={styles.progressInfoRow}>
            <Text style={styles.progressText}>Progress</Text>
            <Text style={styles.lessonCount}>
              {course.progress}/{course.totalLessons} lessons
            </Text>
          </View>

          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.avatarGroup}>
            {course.avatars.slice(0, 3).map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.uri }}
                style={[styles.avatar, { marginLeft: index === 0 ? 0 : -10 }]}
              />
            ))}
            <Text style={styles.extraUsers}>+{course.extraUsersCount}</Text>
          </View>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DashboardCourseCard: React.FC = () => {
  return (
    <View style={styles.mainRow}>
    <View style={{ flex: 1 }}>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={true}
    style={{ flexGrow: 0 }}
    contentContainerStyle={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingRight: 20,
    }}
  >
    {courses.map((course) => (
      <View key={course.id} style={{ marginRight: 12 }}>
        <CourseCard course={course} />
      </View>
    ))}
  </ScrollView>
</View>


      <View style={styles.fixedCalendarContainer}>
        <DashboardCalendarView />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: 600,
    height: 220,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  cardWrapper: {
    width: 175,
    marginRight: 12,
    height: 200,
  },
  cardContainer: {
    width: '100%',
    borderRadius: 22,
    padding: 18,
    height: 200,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f9fafc',
    // 🧊 3D Neumorphic shadow
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e5ec',
  },
  contentWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#dfe9f3',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    shadowColor: '#ffffff',
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  tagText: {
    color: '#1a237e',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookmarkIcon: {
    fontSize: 16,
    color: '#1a237e',
  },
  title: {
    color: '#0d1b2a',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  progressInfoRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  progressText: {
    color: '#3d5a80',
    fontSize: 12,
    opacity: 0.8,
    marginRight: 8,
  },
  lessonCount: {
    color: '#1a237e',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d7e3fc',
    marginTop: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#0d47a1',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 110,
    marginLeft: -10,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  extraUsers: {
    color: '#1a237e',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 6,
  },
  continueButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    shadowColor: '#1565c0',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  fixedCalendarContainer: {
    width: 290,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 10,
    borderWidth: 0,
    backgroundColor: '#f1f5fb',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default DashboardCourseCard;
