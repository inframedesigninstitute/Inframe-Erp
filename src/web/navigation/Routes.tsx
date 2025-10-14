import React from "react"
import AssignmentListScreen from "../screens/AssignmentList"
import CanteenScreen from "../screens/CanteenScreen"
import Dashboard from "../screens/dashboard"
import DownloadListScreen from "../screens/DownloadListScreen"
import ExamScheduleScreen from "../screens/ExamScheduleScreen"
import FeedbackScreen from "../screens/FeedbackScreen"
import FeesReport from "../screens/FeesReport"
import GenericScreen from "../screens/generic-screen"
import LeaveApplication from "../screens/LeaveApplication"
import LibraryInventoryTable from "../screens/LibraryInventoryTable"
import NoticeBoardScreen from "../screens/NoticeBoardScreen"
import RequestStatusScreen from "../screens/RequestStatusScreen"
import CousersScreen from "../screens/students/CousersScreen"
import Lecture_wise_AttendanceScreen from "../screens/students/Lecture_wise_AttendanceScreen"
import Monthly_AttendanceScreen from "../screens/students/Monthly_AttendanceScreen"
import ProfileScreen from "../screens/students/ProfileScreen"
import Student_Dashboard from "../screens/students/Student_Dashboard"
import Subject_Attendance from "../screens/students/Subject_Attendance"
import TimeTableScreen from "../screens/students/TimeTableScreen"
import StudentTranscript from "../screens/StudentTranscript"

export const ROUTES: string[] = [
  "Dashboard",
  "Admission",
  "Admission/Applications",
  "ExamScheduleScreen",
  "LeaveApplication",
  "Admission/Student List",
  "Admission/Transfers",
  "Admission/Transfers/Transfer In",
  "Admission/Transfers/Transfer Out",
  "Admission/Status Types",
  "Admission/ID Cards",
  "Admission/Settings",
  "students/Student_Dashboard",
  "students/Subject_Attendance",
  "students/Lecture_wise_AttendanceScreen", 
  "students/Monthly_AttendanceScreen", 
  "students/CousersScreen",
   "students/TimeTableScreen",
   "students/ProfileScreen",
  "Academic",
  "Routines",
  "Examinations",
  "Study Materials",
  "Fees Collection",
  "Human Resources",
  "Staff Attendances",
  "Leave Manager",
  "Accounts",
  "Communicates",
  "Library",
  "Inventory",
  "Hostels",
  "Transports",
  "Front Desk",
  "Transcripts",
  "Reports",
  "Front Web",
  "Settings",
  "My Profile",
  "FeesReport",
  "LibraryInventoryTable",
  "NoticeBoardScreen",
  "AssignmentListScreen",
  "DownloadListScreen",
  "StudentTranscript","RequestStatusScreen",
  "FeedbackScreen",
  "CanteenScreen"
]

export function getScreenForRoute(key: string): React.ReactElement {
  console.log("Selected route:", key)

  if (key === "Dashboard") return <Dashboard />
  if (key === "students/Student_Dashboard") return <Student_Dashboard />
  if (key === "students/Subject_Attendance") return <Subject_Attendance />
  if (key === "students/Lecture_wise_AttendanceScreen") return <Lecture_wise_AttendanceScreen />
  if (key === "students/Monthly_AttendanceScreen") return <Monthly_AttendanceScreen />
  if (key === "students/CousersScreen") return <CousersScreen />
  if (key === "students/TimeTableScreen") return <TimeTableScreen />
  if (key === "students/ProfileScreen") return <ProfileScreen />
  if (key === "ExamScheduleScreen") return <ExamScheduleScreen />
  if (key === "LeaveApplication") return <LeaveApplication />
  if (key === "FeesReport") return <FeesReport />
  if (key === "LibraryInventoryTable") return <LibraryInventoryTable />
  if (key === "NoticeBoardScreen") return <NoticeBoardScreen />
  if (key === "AssignmentListScreen") return <AssignmentListScreen />
  if (key === "DownloadListScreen") return <DownloadListScreen />
  if (key === "StudentTranscript") return <StudentTranscript />
  if (key === "RequestStatusScreen") return <RequestStatusScreen />
  if (key === "FeedbackScreen") return <FeedbackScreen />
  if (key === "CanteenScreen") return <CanteenScreen />


  return <GenericScreen title={key} />
}
