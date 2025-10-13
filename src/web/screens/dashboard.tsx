// src/web/screens/StudentDashboard.tsx

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LeftColumnSection } from '../components/CourseSection'; // Import the left column
import { RightColumnSection } from '../components/EventsSection'; // Import the right column
import { Course, EventProps, ExamRecord } from '../types'; // Import types

const StudentDashboard: React.FC = () => {
    // --- Data ---
    const enrolledCourses: Course[] = [
        { id: '1', title: 'Graphic Fundamentals - ART101', code: 'ART101', professor: 'Prof. Smith', schedule: 'Monday & Wednesday', time: '9:00 AM - 10:30 AM', location: 'Design Studio A', color: '#8854D0', icon: 'account' },
        { id: '2', title: 'Advanced Web Design - ITD201', code: 'ITD201', professor: 'Dr. Johnson', schedule: 'Tuesday & Thursday', time: '1:30 PM - 3:00 PM', location: 'Computer Lab 3', color: '#FFB800', icon: 'calendar' },
        { id: '3', title: 'User Experience Research - UXD301', code: 'UXD301', professor: 'Prof. Davis', schedule: 'Monday & Saturday', time: '11:00 AM - 12:30 AM', location: 'Design Lab 2', color: '#10B981', icon: 'map-marker' },
        { id: '4', title: '3D Animation Techniques - ANI301', code: 'ANI301', professor: 'Dr. Martinez', schedule: 'Monday & Wednesday', time: '2:00 PM - 5:00 PM', location: 'Animation Studio', color: '#4F46E5', icon: 'clock-outline' },
    ];

    const examRecords: ExamRecord[] = [
        { id: 'e1', examName: 'Graphic Design Fundamentals', course: 'ART101', date: 'Jan 25, 2024', time: '10:00 AM', location: 'Design Studio A', status: 'Completed' },
        { id: 'e2', examName: 'Digital Illustration', course: 'ART103', date: 'Feb 5, 2024', time: '02:00 PM', location: 'Computer Lab 2', status: 'Completed' },
        { id: 'e3', examName: 'UX/UI Design Principles', course: 'UXD301', date: 'Mar 10, 2024', time: '01:00 PM', location: 'Design Lab 1', status: 'Upcoming' },
        { id: 'e4', examName: 'History of Design Essay', course: 'ART201', date: 'Apr 2, 2024', time: '09:45 AM', location: 'Lecture Hall B', status: 'Upcoming' },
        { id: 'e5', examName: 'Product Design Prototype', course: 'ITD201', date: 'May 15, 2024', time: '11:15 AM', location: 'Prototype Lab', status: 'Upcoming' },
        { id: 'e6', examName: 'Color Theory and Application', course: 'ART103', date: 'June 8, 2024', time: '02:15 PM', location: 'Design Studio B', status: 'Upcoming' },
        { id: 'e7', examName: 'Visual Communication Design', course: 'ART202', date: 'Nov 20, 2024', time: '2:00 PM', location: 'Design Studio B', status: 'Upcoming' },
    ];
    
    const upcomingEvents: EventProps[] = [
        { id: 'v1', date: '15 Mar', title: 'Design Club Meeting', time: '4:00 PM' },
        { id: 'v2', date: '20 Mar', title: 'Guest Lecture: AI in Art', time: '11:00 AM' },
        { id: 'v3', date: '01 Apr', title: 'Portfolio Review Session', time: '9:00 AM' },
        { id: 'v4', date: '10 Apr', title: 'Annual Student Exhibition', time: '6:00 PM' },
        { id: 'v5', date: '25 Apr', title: 'Library Book Due Date', time: '11:59 PM' },
        { id: 'v6', date: '05 May', title: 'Semester Project Deadline', time: '5:00 PM' },
        { id: 'v7', date: '15 May', title: 'Final Exams Begin', time: '8:30 AM' },
        { id: 'v8', date: '20 May', title: 'Graduation Rehearsal', time: '2:00 PM' },
    ];
    // --- End Data ---

    return (
     <ScrollView 
    style={styles.container} 
    showsVerticalScrollIndicator={true} 
    contentContainerStyle={styles.contentWrapper} 
>
    <View style={styles.headerRow}>
        {/* Left Column */}
        <LeftColumnSection 
            enrolledCourses={enrolledCourses} 
            examRecords={examRecords} 
        />

        {/* Right Column */}
        <RightColumnSection 
            upcomingEvents={upcomingEvents} 
        />
    </View>
</ScrollView>

    );
};

export default StudentDashboard;

// Only global and structural styles remain here
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f8ff",
        padding: 5,
    },
    contentWrapper: {
        paddingBottom: 40,
        // Remove flexGrow/flexDirection from here
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // important
    },
});

