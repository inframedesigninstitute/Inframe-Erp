// types.ts (FIXED CODE)

export interface Course {
    id: string;
    title: string;
    code: string;
    professor: string;
    schedule: string;
    time: string;
    location: string;
    color: string;
    icon: string;
}

export interface ExamRecord {
    id: string;
    examName: string;
    course: string;
    date: string;
    time: string;
    location: string;
    status: 'Completed' | 'Upcoming';
}

export interface EventProps {
    // 💡 FIX APPLIED HERE: Added the missing 'id' property
    id: string; 
    date: string;
    title: string;
    time: string;
}

// Interfaces for the sub-components
export interface CourseCardProps {
    course: Course;
}

export interface CourseSectionProps {
    enrolledCourses: Course[];
}

export interface ExamBoardProps {
    examRecords: ExamRecord[];
}

export interface UpcomingEventsProps {
    upcomingEvents: EventProps[];
}

export interface SubjectAttendance {
  subject: string;
  attended: number;
  total: number;
  percentage: number;
}