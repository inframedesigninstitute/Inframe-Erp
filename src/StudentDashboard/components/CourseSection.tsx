// CourseSection.tsx

import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CourseCardProps, CourseSectionProps, ExamBoardProps, ExamRecord } from '../types'; // Import types

// --- CourseCard Component (From original file) ---
const CourseCard: React.FC<CourseCardProps> = ({ course }) => (
    <View style={courseCardStyles.card}>
        <View style={[courseCardStyles.header, { backgroundColor: course.color }]}>
            <Text style={courseCardStyles.title}>{course.title}</Text>
            <Text style={courseCardStyles.code}>{course.code}</Text>
        </View>
        <View style={courseCardStyles.body}>
            <View style={courseCardStyles.infoRow}>
                <MaterialCommunityIcons name="account" size={16} color="#555" />
                <Text style={courseCardStyles.infoText}>{course.professor}</Text>
            </View>
            <View style={courseCardStyles.infoRow}>
                <MaterialCommunityIcons name="calendar" size={16} color="#555" />
                <Text style={courseCardStyles.infoText}>{course.schedule}</Text>
            </View>
            <View style={courseCardStyles.infoRow}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#555" />
                <Text style={courseCardStyles.infoText}>{course.time}</Text>
            </View>
            <View style={courseCardStyles.infoRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#555" />
                <Text style={courseCardStyles.infoText}>{course.location}</Text>
            </View>
        </View>
    </View>
);

const courseCardStyles = StyleSheet.create({
    card: {
        width: 250, 
        backgroundColor: '#fff',
        borderRadius: 10, 
        marginRight: 20, 
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        borderWidth: 1,
        borderColor: '#eee',
    },
    header: {
        padding: 15, 
        minHeight: 70, 
        justifyContent: 'center',
    },
    title: {
        fontSize: 14, 
        fontWeight: '700',
        color: '#fff',
    },
    code: {
        fontSize: 12, 
        color: '#fff',
        marginTop: 4,
        fontWeight: '500',
    },
    body: {
        padding: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8, 
    },
    infoText: {
        fontSize: 12, 
        color: '#555',
        marginLeft: 10,
    },
});

// --- ClubJoinCard Component (From original file) ---
const ClubJoinCard: React.FC = () => (
    <View style={clubJoinStyles.card}>
        <View style={clubJoinStyles.textContainer}>
            <Text style={clubJoinStyles.title}>Get Involved - Join a Club Today!</Text>
            <Text style={clubJoinStyles.description}>
                Explore your interests and meet like-minded students by joining one of our many clubs. 
                Whether you're into sports, arts, or academics, there's a club for you. Find your community!
            </Text>
            <TouchableOpacity style={clubJoinStyles.button}>
                <Text style={clubJoinStyles.buttonText}>Learn More</Text>
                <MaterialCommunityIcons name="arrow-right" size={18} color="#fff" />
            </TouchableOpacity>
        </View>
        <Image 
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsdw7PxvPzcYJIr9T_FDksMVLO0KN8CsIghw&s' }} 
            style={clubJoinStyles.image} 
        />
    </View>
);

const clubJoinStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#eaf3ff', 
        borderRadius: 12, 
        padding: 25, 
        marginBottom: 30, 
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width:"100%",
        height:"20%"
    },
    textContainer: {
        flex: 1.5,
        marginRight: 20, 
    },
    title: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#1e3a8a', 
        marginBottom: 10,
    },
    description: {
        fontSize: 14, 
        color: '#4b5563', 
        marginBottom: 20,
        lineHeight: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e3a8a', 
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff', 
        fontWeight: '600',
        marginRight: 10,
        fontSize: 15,
    },
    image: {
        width: 180, 
        height: 180, 
        flex: 1,
        borderRadius: 6,
    },
});

// --- EnrolledCoursesSection Component ---
export const EnrolledCoursesSection: React.FC<CourseSectionProps> = ({ enrolledCourses }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Enrolled Courses</Text>
            <View style={styles.cardActions}>
                <TouchableOpacity><Text style={styles.actionText}>View All</Text></TouchableOpacity>
                <MaterialCommunityIcons name="chevron-right" size={22} color="#3b82f6" />
            </View>
        </View>
        <FlatList
            horizontal
            data={enrolledCourses}
            renderItem={({ item: course }) => <CourseCard course={course} />} 
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={true} 
            contentContainerStyle={styles.enrolledCoursesList}
        />
    </View>
);

// --- ExamBoardSection Component ---
export const ExamBoardSection: React.FC<ExamBoardProps> = ({ examRecords }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Exam Board</Text>
            <View style={styles.cardActions}>
                <TouchableOpacity><Text style={styles.actionText}>View All</Text></TouchableOpacity>
                <MaterialCommunityIcons name="chevron-right" size={22} color="#3b82f6" />
            </View>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={true}> 
            <View style={styles.fixedTableWidth}> 
                {/* Table Header - Added minWidth to cells */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.tableHeaderText, { flex: 2.5, minWidth: 150 }]}>Exam Name</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText, { minWidth: 80 }]}>Course</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText, { flex: 1.5, minWidth: 100 }]}>Date</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText, { minWidth: 80 }]}>Time</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText, { minWidth: 120 }]}>Location</Text>
                    <Text style={[styles.tableCell, styles.tableHeaderText, { minWidth: 100 }]}>Status</Text>
                </View>
                
                {/* Table Body - Added minWidth to cells */}
                {examRecords.map((record: ExamRecord) => (
                    <View style={styles.tableRow} key={record.id}>
                        <Text style={[styles.tableCell, { flex: 2.5, minWidth: 150 }]}>{record.examName}</Text>
                        <Text style={[styles.tableCell, { minWidth: 80 }]}>{record.course}</Text>
                        <Text style={[styles.tableCell, { flex: 1.5, minWidth: 100 }]}>{record.date}</Text>
                        <Text style={[styles.tableCell, { minWidth: 80 }]}>{record.time}</Text>
                        <Text style={[styles.tableCell, { minWidth: 120 }]}>{record.location}</Text>
                        <View style={[styles.statusCell, { minWidth: 100 }]}>
                            <Text style={[styles.statusBadge, record.status === 'Completed' ? styles.statusCompleted : styles.statusUpcoming]}>
                                {record.status}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    </View>
);

// --- Combined CourseSection Component (Main export for the left column) ---
export const LeftColumnSection: React.FC<CourseSectionProps & ExamBoardProps> = ({ enrolledCourses, examRecords }) => (
    <View style={styles.leftColumn}>
        <View style={styles.headerInfo}>
            <Text style={styles.greeting}>Welcome, Vikram</Text>
            <Text style={styles.headerDate}>12 oce. 2025, Sunday</Text>
        </View>
        
        <ClubJoinCard />

        <EnrolledCoursesSection enrolledCourses={enrolledCourses} />

        <ExamBoardSection examRecords={examRecords} />
    </View>
);


const styles = StyleSheet.create({
    leftColumn: {
        flex: 3, 
        minWidth: 650, 
        paddingRight: 25, 
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 20, 
    },
    greeting: {
        fontSize: 28, 
        fontWeight: 'bold',
        color: '#1f2937', 
    },
    headerDate: {
        fontSize: 14, 
        color: '#000000ff',
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12, 
        marginBottom: 30, 
        padding: 20, 
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15, 
        shadowRadius: 8, width:"100%"
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 18, 
        fontWeight: "700",
        color: "#1f2937",
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        color: '#3b82f6', 
        fontSize: 14, 
        fontWeight: '600',
        marginRight: 8,
    },
    enrolledCoursesList: {
        paddingVertical: 10,
        paddingBottom: 15,
    },
    // --- Table Styles ---
    fixedTableWidth: {
        width: 930, 
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12, 
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tableHeader: {
        backgroundColor: "#f9fafb", 
        paddingVertical: 14, 
        borderBottomWidth: 2,
        borderBottomColor: "#e5e7eb",
    },
    tableHeaderText: {
        color: "#6b7280",
        fontWeight: "bold",
        fontSize: 12, 
        paddingHorizontal: 10,
        textTransform: 'uppercase', 
    },
    tableCell: {
        flex: 1,
        fontSize: 13, 
        color: "#333",
        paddingHorizontal: 10,
    },
    statusCell: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    statusBadge: {
        fontSize: 12, 
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 15,
        color: "#fff",
        fontWeight: '600',
        overflow: "hidden",
    },
    statusCompleted: {
        backgroundColor: '#10b981', 
    },
    statusUpcoming: {
        backgroundColor: '#3b82f6', 
    },
    // Keep other necessary styles for the components
});