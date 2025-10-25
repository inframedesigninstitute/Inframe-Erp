import React from "react";
import Academic from "../screens/AcademicScreen";
import Accounts from "../screens/Accounts";
import Admission from "../screens/AdmissionScreen";
import Communicates from "../screens/Communicates";
import Dashboard from "../screens/Dashboard";
import Examinations from "../screens/Examinations";
import FeesCollection from "../screens/FeesCollection";
import FrontDesk from "../screens/FrontDesk";
import Hostels from "../screens/Hostels";
import HumanResources from "../screens/HumanResources";
import Inventory from "../screens/Inventory";
import LeaveManager from "../screens/LeaveManager";
import Library from "../screens/Library";
import Reports from "../screens/Reports";
import Routines from "../screens/Routines";
import Settings from "../screens/Settings";
import StaffAttendances from "../screens/StaffAttendances";
import Students from "../screens/Students";
import StudyMaterials from "../screens/StudyMaterials";
import Transports from "../screens/Transports";
import Users from "../screens/Users";

// --- Admission Submenu Screens ---
import AdmissionApplicationsScreen from "../screens/AdmissionApplicationsScreen";
import AdmissionIDCardsScreen from "../screens/AdmissionIDCardsScreen";
import AdmissionNewRegistrationScreen from "../screens/AdmissionNewRegistrationScreen";
import AdmissionSettingsScreen from "../screens/AdmissionSettingsScreen";
import AdmissionStatusTypesScreen from "../screens/AdmissionStatusTypesScreen";
import AdmissionStudentListScreen from "../screens/AdmissionStudentListScreen";
import AdmissionTransfersScreen from "../screens/AdmissionTransfersScreen";
import AlumniListScreen from "../screens/AlumniListScreen";
import AttendanceReportsScreen from "../screens/AttendanceReportsScreen";
import AttendancesScreen from "../screens/AttendancesScreen";
import EnrollmentsScreen from "../screens/EnrollmentsScreen";
import ManageLeaveScreen from "../screens/ManageLeaveScreen";
import StudentNotesScreen from "../screens/StudentNotesScreen";
import SubjectAttendancesScreen from "../screens/SubjectAttendancesScreen";

export type Route = {
  name: string;
  component: React.ComponentType<any>;
  icon?: string;
  subRoutes?: Route[];
  isSubRoute?: boolean;
};

// --- Admin Routes ---
export const adminRoutes: Route[] = [
  { name: "Dashboard", component: Dashboard, icon: "home" },

  {
    name: "Admission",
    component: Admission,
    icon: "business",
    subRoutes: [
      { name: "Applications", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "New Registration", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Student List", component: AdmissionStudentListScreen, isSubRoute: true },
      { name: "Transfers", component: AdmissionTransfersScreen, isSubRoute: true },
      { name: "Status Types", component: AdmissionStatusTypesScreen, isSubRoute: true },
      { name: "ID Cards", component: AdmissionIDCardsScreen, isSubRoute: true },
      { name: "Settings", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  { 
    name: "Students", 
    component: Students, 
    icon: "people",
    subRoutes: [
      // Matches the "Attendances" section with its own submenu
      { 
        name: "Attendances", 
        component: AttendancesScreen, // This could be the main attendance overview screen
        // icon: "...", // Add an icon if needed
        subRoutes: [
          { name: "Subject Attendances", component: SubjectAttendancesScreen, isSubRoute: true },
          { name: "Attendance Reports", component: AttendanceReportsScreen, isSubRoute: true },
        ]
      },
      // Individual menu items
      { name: "Manage Leave", component: ManageLeaveScreen, isSubRoute: true },
      { name: "Student Notes", component: StudentNotesScreen, isSubRoute: true },
      // Matches the "Enrollments" item (which has a right arrow in the image, suggesting a submenu)
      { name: "Enrollments", component: EnrollmentsScreen, isSubRoute: true }, // Add subRoutes if Enrollments is a further nested menu
      { name: "Alumni List", component: AlumniListScreen, isSubRoute: true },
    ],
  },
  { name: "Academic", component: Academic, icon: "book" },
  { name: "Routines", component: Routines, icon: "calendar" },
  { name: "Examinations", component: Examinations, icon: "document-text" },
  { name: "Study Materials", component: StudyMaterials, icon: "reader" },
  { name: "Fees Collection", component: FeesCollection, icon: "wallet" },
  { name: "Human Resources", component: HumanResources, icon: "people-circle" },
  { name: "Staff Attendances", component: StaffAttendances, icon: "person-done" },
  { name: "Leave Manager", component: LeaveManager, icon: "calendar-outline" },
  { name: "Accounts", component: Accounts, icon: "card" },
  { name: "Communicates", component: Communicates, icon: "volume-high" },
  { name: "Library", component: Library, icon: "library" },
  { name: "Inventory", component: Inventory, icon: "cube" },
  { name: "Hostels", component: Hostels, icon: "bed" },
  { name: "Transports", component: Transports, icon: "bus" },
  { name: "Front Desk", component: FrontDesk, icon: "desktop" },
  { name: "Users", component: Users, icon: "person-circle-outline" },
  { name: "Reports", component: Reports, icon: "analytics-outline" },
  { name: "Settings (Main)", component: Settings, icon: "settings-outline" },
];
