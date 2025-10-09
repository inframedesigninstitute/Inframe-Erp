import React from "react"
import NewAdmissionScreen from "../screens/admission/NewAdmissionScreen"
import Dashboard from "../screens/dashboard"
import GenericScreen from "../screens/generic-screen"
import CousersScreen from "../screens/students/CousersScreen"
import Lecture_wise_AttendanceScreen from "../screens/students/Lecture_wise_AttendanceScreen"
import Monthly_AttendanceScreen from "../screens/students/Monthly_AttendanceScreen"
import ProfileScreen from "../screens/students/ProfileScreen"
import Student_Dashboard from "../screens/students/Student_Dashboard"
import Subject_Attendance from "../screens/students/Subject_Attendance"
import TimeTableScreen from "../screens/students/TimeTableScreen"

export const ROUTES: string[] = [
  "Dashboard",
  "Admission",
  "Admission/Applications",
  "Admission/New Registration",
  "Admission/Student List",
  "Admission/Transfers",
  "Admission/Transfers/Transfer In",
  "Admission/Transfers/Transfer Out",
  "Admission/Status Types",
  "Admission/ID Cards",
  "Admission/Settings",
  "students/Student_Dashboard",
  "students/Subject_Attendance",
  "students/Lecture_wise_AttendanceScreen", // ✅ no leading space
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
]

export function getScreenForRoute(key: string): React.ReactElement {
  console.log("Selected route:", key)

  if (key === "Dashboard") return <Dashboard />
  if (key === "Admission/New Registration") return <NewAdmissionScreen />
  if (key === "students/Student_Dashboard") return <Student_Dashboard />
  if (key === "students/Subject_Attendance") return <Subject_Attendance />
  if (key === "students/Lecture_wise_AttendanceScreen") return <Lecture_wise_AttendanceScreen />
  if (key === "students/Monthly_AttendanceScreen") return <Monthly_AttendanceScreen />
  if (key === "students/CousersScreen") return <CousersScreen />
  if (key === "students/TimeTableScreen") return <TimeTableScreen />
  if (key === "students/ProfileScreen") return <ProfileScreen />


  return <GenericScreen title={key} />
}
