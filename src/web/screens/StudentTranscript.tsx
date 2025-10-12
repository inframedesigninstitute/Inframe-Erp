import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// --- 1. TypeScript Data Types ---

// Data for the Student Information Card
export type StudentInfo = {
  id: string;
  name: string;
  batch: string;
  program: string;
  totalCredits: number;
  cumulativeGpa: number;
};

// Data for the Grade Scale Table
export type GradeScale = {
  grade: string;
  point: number;
  minMark: string;
  maxMark: string;
};

// Data for a single Course in the Semester Table
export type CourseEntry = {
  code: string;
  course: string;
  creditHours: number;
  point: number | null; // Null for Term Total
  grade: string | null; // Null for Term Total
};

// Data for a Semester Block
export type SemesterData = {
  termName: string; // e.g., 'Spring-2022'
  semesterDetails: string; // e.g., '1st Semester 2018 | Section A'
  termTotalCredits: number;
  termTotalPoint: number;
  courses: CourseEntry[];
};


// --- 2. Mock Data for Demonstration (Matching the image) ---

const MOCK_STUDENT_INFO: StudentInfo = {
  id: '#1014',
  name: 'Rylee Pratt',
  batch: '5th Batch',
  program: 'Computer Engineering (CSE)',
  totalCredits: 0,
  cumulativeGpa: 0.00,
};

const MOCK_GRADE_SCALE: GradeScale[] = [
  { grade: 'A', point: 4.00, minMark: '80.00 %', maxMark: '100.00 %' },
  { grade: 'B+', point: 3.50, minMark: '70.00 %', maxMark: '79.99 %' },
  { grade: 'C', point: 3.00, minMark: '60.00 %', maxMark: '69.99 %' },
  { grade: 'D', point: 2.00, minMark: '50.00 %', maxMark: '59.99 %' },
  { grade: 'E', point: 1.00, minMark: '40.00 %', maxMark: '49.99 %' },
  { grade: 'F', point: 0.00, minMark: '0.00 %', maxMark: '20.00 %' },
];

const MOCK_SEMESTER_DATA: SemesterData[] = [
  {
    termName: 'Spring-2022',
    semesterDetails: '1st Semester 2018 | Section A',
    termTotalCredits: 10,
    termTotalPoint: 0.00,
    courses: [
      { code: 'CSE607', course: 'Data Structures and Algorithms', creditHours: 3, point: null, grade: null },
      { code: 'EN105', course: 'Freshman English (Optional)', creditHours: 2, point: null, grade: null },
      { code: 'MAT211', course: 'Discrete Mathematics', creditHours: 2, point: null, grade: null },
      { code: 'PH308', course: 'Optical Physics', creditHours: 3, point: null, grade: null },
    ],
  },
  // Add more semesters here if needed
];

// --- 3. Sub-Components for UI Sections ---

/**
 * Renders the Student Information Card (Top Left).
 */
const StudentInfoCard: React.FC<{ info: StudentInfo }> = ({ info }) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoTitle}>Transcript</Text>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Student ID :</Text>
      <Text style={styles.infoValue}> {info.id}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Name :</Text>
      <Text style={styles.infoValue}> {info.name}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Batch :</Text>
      <Text style={styles.infoValue}> {info.batch}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Program :</Text>
      <Text style={styles.infoValueBlue}> {info.program}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Total Credits :</Text>
      <Text style={styles.infoValue}> {info.totalCredits}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Cumulative GPA :</Text>
      <Text style={styles.infoValue}> {info.cumulativeGpa.toFixed(2)}</Text>
    </View>
  </View>
);

/**
 * Renders the Grade Scale Table (Top Right).
 */
const GradeScaleTable: React.FC<{ scale: GradeScale[] }> = ({ scale }) => {
  const tableHeaders = ['Grade', 'Point', 'Min Mark', 'Max Mark'];
  
  const HeaderRow = () => (
    <View style={[styles.scaleRow, styles.scaleHeader]}>
      {tableHeaders.map((text, index) => (
        <Text key={index} style={styles.scaleHeaderText}>{text}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.scaleContainer}>
      <HeaderRow />
      {scale.map((item, index) => (
        <View key={item.grade} style={[styles.scaleRow, index % 2 === 1 && styles.scaleRowEven]}>
          <Text style={styles.scaleCell}>{item.grade}</Text>
          <Text style={styles.scaleCell}>{item.point.toFixed(2)}</Text>
          <Text style={styles.scaleCell}>{item.minMark}</Text>
          <Text style={styles.scaleCell}>{item.maxMark}</Text>
        </View>
      ))}
    </View>
  );
};

/**
 * Renders a single Semester Block with the Course Table (Bottom Section).
 */
const SemesterBlock: React.FC<{ data: SemesterData }> = ({ data }) => {
  
  const CourseRow: React.FC<{ course: CourseEntry, isTermTotal: boolean }> = ({ course, isTermTotal }) => (
    <View style={[styles.courseRow, isTermTotal && styles.termTotalRow]}>
      <Text style={[styles.courseCell, styles.courseColCode]}>{course.code}</Text>
      <Text style={[styles.courseCell, styles.courseColCourse, isTermTotal && styles.termTotalLabel]}>{course.course}</Text>
      <Text style={[styles.courseCell, styles.courseColCredits]}>{course.creditHours || ''}</Text>
      <Text style={[styles.courseCell, styles.courseColPoint]}>{course.point !== null ? course.point.toFixed(2) : ''}</Text>
      <Text style={[styles.courseCell, styles.courseColGrade]}>{course.grade || ''}</Text>
    </View>
  );

  const termTotal: CourseEntry = {
    code: '',
    course: 'Term Total',
    creditHours: data.termTotalCredits,
    point: data.termTotalPoint,
    grade: '',
  };

  return (
    <View style={styles.semesterBlock}>
      <Text style={styles.semesterTitle}>{data.termName} | {data.semesterDetails}</Text>
      
      {/* Course Table */}
      <View style={styles.courseTable}>
        {/* Header */}
        <View style={[styles.courseRow, styles.courseHeader]}>
          <Text style={[styles.courseHeaderText, styles.courseColCode]}>Code</Text>
          <Text style={[styles.courseHeaderText, styles.courseColCourse]}>Course</Text>
          <Text style={[styles.courseHeaderText, styles.courseColCredits]}>Credit Hours</Text>
          <Text style={[styles.courseHeaderText, styles.courseColPoint]}>Point</Text>
          <Text style={[styles.courseHeaderText, styles.courseColGrade]}>Grade</Text>
        </View>
        
        {/* Course Rows */}
        {data.courses.map((course, index) => (
          <CourseRow key={index} course={course} isTermTotal={false} />
        ))}

        {/* Term Total Row */}
        <CourseRow course={termTotal} isTermTotal={true} />
      </View>
    </View>
  );
};

// --- 4. Main Transcript Component ---

const StudentTranscript: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Row: Info Card and Grade Scale */}
      <View style={styles.topSection}>
        <StudentInfoCard info={MOCK_STUDENT_INFO} />
        <GradeScaleTable scale={MOCK_GRADE_SCALE} />
      </View>

      {/* Semester Sections */}
      {MOCK_SEMESTER_DATA.map((semester, index) => (
        <SemesterBlock key={index} data={semester} />
      ))}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

// --- 5. Stylesheet (Highly customized to match the image) ---

const mainBlue = '#007aff';
const lightBlue = '#eaf5ff';
const lightGray = '#f8f8f8';
const borderGray = '#e0e0e0';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background as in the image
    padding: 10,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 20,
    // Add a slight shadow/elevation to the whole top area if desired
  },

  // --- Student Info Card Styles (Top Left) ---
  infoCard: {
    flex: 1,
    padding: 15,
    marginRight: 10,
    backgroundColor: lightGray, 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: borderGray,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: mainBlue,
    borderBottomWidth: 1,
    borderBottomColor: borderGray,
    paddingBottom: 10,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    width: 120, // Fixed width for alignment
  },
  infoValue: {
    fontSize: 14,
    color: '#666',
  },
  infoValueBlue: {
    fontSize: 14,
    color: mainBlue,
  },
  
  // --- Grade Scale Table Styles (Top Right) ---
  scaleContainer: {
    flex: 1.2, // Slightly wider than the info card
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: borderGray,
    overflow: 'hidden',
  },
  scaleHeader: {
    backgroundColor: mainBlue,
  },
  scaleRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: borderGray,
  },
  scaleRowEven: {
    backgroundColor: lightBlue, // Light blue for even rows
  },
  scaleHeaderText: {
    flex: 1,
    padding: 8,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scaleCell: {
    flex: 1,
    padding: 8,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },

  // --- Semester Block Styles (Bottom) ---
  semesterBlock: {
    marginBottom: 20,
    backgroundColor: lightGray,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: borderGray,
    overflow: 'hidden',
  },
  semesterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: mainBlue,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: borderGray,
    backgroundColor: '#f1f1f1', // Lighter background for the semester heading
  },
  
  // Course Table
  courseTable: {
    borderWidth: 1,
    borderColor: borderGray,
    borderRadius: 5,
    margin: 10,
    overflow: 'hidden',
  },
  courseHeader: {
    backgroundColor: mainBlue,
    borderBottomWidth: 0,
  },
  courseRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: borderGray,
    backgroundColor: '#fff',
  },
  termTotalRow: {
    backgroundColor: lightBlue, 
    borderTopWidth: 2,
    borderTopColor: mainBlue,
  },
  courseHeaderText: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  courseCell: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 13,
    color: '#333',
    textAlign: 'left',
  },
  termTotalLabel: {
    fontWeight: 'bold',
    textAlign: 'right',
  },

  courseColCode: { flex: 1.5, textAlign: 'left' },
  courseColCourse: { flex: 4, textAlign: 'left' },
  courseColCredits: { flex: 1.5, textAlign: 'center' },
  courseColPoint: { flex: 1.5, textAlign: 'center' },
  courseColGrade: { flex: 1.5, textAlign: 'center' },
});

export default StudentTranscript;