import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import AcademicDashboard from '../components/AcademicDashboard';
import DashboardCourseCard from '../components/DashboardCourseCard';
import DashboardQuickActions from '../components/DashboardQuickActions';
import MyNotesSection from '../components/MyNotesSection';
import MyScheduleSection from '../components/MyScheduleSection';
import MyTasksSection from '../components/MyTasksSection';
import PromotionBanner from '../components/PromotionBanner';

const { width } = Dimensions.get('window');

const StudentDashboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <PromotionBanner
            userName="Vikram"
            courseName="React Native Basics"
            completedUsers={12}
          />

          {/* Wrap DashboardCourseCard & AcademicDashboard in 3D container */}
          <View style={styles.cardContainer3D}>
            <DashboardCourseCard/>
            <AcademicDashboard/>
          </View>

          <View style={styles.mainContentLayout}>
            <View style={styles.leftColumn}>
              <View style={styles.section3D}>
                <MyTasksSection />
              </View>
            </View>

            <View style={styles.rightColumn}>
              <View style={styles.section3D}>
                <MyNotesSection />
              </View>
              <View style={styles.section3D}>
                <MyScheduleSection />
                <DashboardQuickActions />
              </View>
            </View>
          </View>

          <View style={{ height: 30 }} /> {/* Spacer at the bottom */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f3f7', // Soft background for 3D effect
  },
  scrollViewContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  mainContentLayout: {
    flexDirection: width > 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  leftColumn: {
    flex: width > 768 ? 0.45 : 1,
    marginRight: width > 768 ? 15 : 0,
    marginBottom: 20,
  },
  rightColumn: {
    flex: width > 768 ? 0.55 : 1,
  },
  section3D: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
    padding: 0,
  },
  cardContainer3D: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    marginVertical: 15,
    padding: 10,
  },
});

export default StudentDashboardScreen;
