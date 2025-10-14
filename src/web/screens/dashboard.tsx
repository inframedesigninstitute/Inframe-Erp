import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import DashboardCourseCard from '../components/DashboardCourseCard';
import MyNotesSection from '../components/MyNotesSection';
import MyScheduleSection from '../components/MyScheduleSection';
import MyTasksSection from '../components/MyTasksSection';
import PromotionBanner from '../components/PromotionBanner';

const { width } = Dimensions.get('window');
const cardData = {
        category: 'Development',
        title: 'React Native Basics: Building Mobile Apps',
        progress: 0.5, 
        lessons: '10/20 lessons',
        participants: 12, 
        backgroundColor: '#3C6AFF',
        participantAvatars: [{ uri: 'a1' }, { uri: 'a2' }, { uri: 'a3' }], 
    };
const StudentDashboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
       <PromotionBanner
  userName="Vikram"
  courseName="React Native Basics"
  completedUsers={12}
/>
<DashboardCourseCard  
                category={cardData.category}
                title={cardData.title}
                progress={cardData.progress}
                lessons={cardData.lessons}
                participants={cardData.participants}
                backgroundColor={cardData.backgroundColor}
                participantAvatars={cardData.participantAvatars}
            />

        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.mainContentLayout}>
            <View style={styles.leftColumn}>
              <MyTasksSection />
            </View>

            <View style={styles.rightColumn}>
              <MyNotesSection />
              <MyScheduleSection />
            </View>
          </View>
          <View style={{ height: 30 }} /> {/* Spacer at the bottom */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa', // Light background color for the overall screen
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 15, // Padding for the main content
  },
  mainContentLayout: {
    flexDirection: width > 768 ? 'row' : 'column', // Desktop-like layout for wide screens
    justifyContent: 'space-between',
    paddingTop: 20, // Space below the header
  },
  leftColumn: {
    flex: width > 768 ? 0.45 : 1, // Takes ~45% width on wide screens, full width on small
    marginRight: width > 768 ? 15 : 0,
    marginBottom: 20, // Space between sections on small screens
  },
  rightColumn: {
    flex: width > 768 ? 0.55 : 1, // Takes ~55% width on wide screens, full width on small
  },
});

export default StudentDashboardScreen;