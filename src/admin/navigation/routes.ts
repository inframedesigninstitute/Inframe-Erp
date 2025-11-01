import React from "react";
// -------------------------------------------------------------------
// ✅ FIX: Use DEFAULT imports for all components based on TS Error 2614
// -------------------------------------------------------------------
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
import Library from "../screens/Library";
import Reports from "../screens/Reports";
import Routines from "../screens/Routines";
import Settings from "../screens/Settings";
import StaffAttendances from "../screens/StaffAttendances";
import Students from "../screens/Students";
import StudyMaterials from "../screens/StudyMaterials";
import Transports from "../screens/Transports";
import Users from "../screens/Users";

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
import BatchScreen from "../screens/BatchScreen";
import EnrollmentsScreen from "../screens/EnrollmentsScreen";
import FacultiesScreen from "../screens/FacultiesScreen";
import ManageClassesScreen from "../screens/ManageClassesScreen";
import ManageLeaveScreen from "../screens/ManageLeaveScreen";
import ProgramScreen from "../screens/ProgramScreen";
import StudentNotesScreen from "../screens/StudentNotesScreen";
import SubjectAttendancesScreen from "../screens/SubjectAttendancesScreen";

// -------------------------------------------------------------------
// ✅ Route Type
// -------------------------------------------------------------------
export type Route = {
  name: string;
  component: React.ComponentType<any>;
  icon?: string;
  subRoutes?: Route[];
  isSubRoute?: boolean;
};

// -------------------------------------------------------------------
// ✅ Admin Routes
// -------------------------------------------------------------------
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
      {
        name: "Transfers",
        component: AdmissionTransfersScreen,
        subRoutes: [
          { name: "Transfer In List", component: SubjectAttendancesScreen, isSubRoute: true },
          { name: "Transfer Out List", component: AttendanceReportsScreen, isSubRoute: true },
        ],
      },
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
      {
        name: "Attendances",
        component: AttendancesScreen,
        subRoutes: [
          { name: "Subject Attendances", component: SubjectAttendancesScreen, isSubRoute: true },
          { name: "Attendance Reports", component: AttendanceReportsScreen, isSubRoute: true },
        ],
      },
      { name: "Manage Leave", component: ManageLeaveScreen, isSubRoute: true },
      { name: "Student Notes", component: StudentNotesScreen, isSubRoute: true },
      { name: "Student Class Schedule", component: EnrollmentsScreen, isSubRoute: true },
      { name: "Exam & Result Summary", component: AlumniListScreen, isSubRoute: true },
    ],
  },

  {
    name: "Manage Faculty",
    component: Academic,
    icon: "book",
    subRoutes: [
      { name: "Class & Timetable", component: SubjectAttendancesScreen, isSubRoute: true },
      { name: "Attendance & Evaluation", component: AttendanceReportsScreen, isSubRoute: true },
      { name: "Assignments & Resources", component: ManageLeaveScreen, isSubRoute: true },
      { name: "Student & Department Communication", component: StudentNotesScreen, isSubRoute: true },
      { name: "Leave & Requests", component: EnrollmentsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Academic",
    component: Academic,
    icon: "book",
    subRoutes: [
      { name: "Faculties", component: FacultiesScreen, isSubRoute: true },
      { name: "Programs", component: ProgramScreen, isSubRoute: true },
      { name: "Batchs", component: BatchScreen, isSubRoute: true },
      { name: "Sessions", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Semesters", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Sections", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Class Room", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Courses", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Enroll Courses", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Routines",
    component: Routines,
    icon: "calendar",
    subRoutes: [
      { name: "Manage Classes", component: ManageClassesScreen, isSubRoute: true },
      { name: "Class Schedules", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Exam Manage", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Exam Schedule", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Teacher Routine", component: AdmissionSettingsScreen, isSubRoute: true },
      {
        name: "Settings",
        component: AdmissionSettingsScreen,
        isSubRoute: true,
        subRoutes: [
          { name: "Class Schedule Setting", component: AdmissionSettingsScreen, isSubRoute: true },
          { name: "Exam Schedule Setting", component: AdmissionSettingsScreen, isSubRoute: true },
        ],
      },
    ],
  },

  {
    name: "Examinations",
    component: Examinations,
    icon: "document-text",
    subRoutes: [
      { name: "Exam Attendances", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Exam Mark Ledger", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Exam Results", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Course Mark Ledger", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Course Results", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Grading Systems", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Exam Type", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Admit Card", component: AdmissionSettingsScreen, isSubRoute: true },
      {
        name: "Settings",
        component: AdmissionSettingsScreen,
        isSubRoute: true,
        subRoutes: [
          { name: "Admit Setting", component: AdmissionSettingsScreen, isSubRoute: true },
          { name: "Mark Distribution", component: AdmissionSettingsScreen, isSubRoute: true },
        ],
      },
    ],
  },

  {
    name: "Study Materials",
    component: StudyMaterials,
    icon: "reader",
    subRoutes: [
      { name: "Assignment", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Content List", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Content Type", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Fees Collection",
    component: FeesCollection,
    icon: "wallet",
    subRoutes: [
      {
        name: "Student Fees",
        component: AdmissionSettingsScreen,
        isSubRoute: true,
        subRoutes: [
          { name: "Fees Due", component: AdmissionSettingsScreen, isSubRoute: true },
          { name: "Quick Assign", component: AdmissionSettingsScreen, isSubRoute: true },
          { name: "Quick Received", component: AdmissionSettingsScreen, isSubRoute: true },
          { name: "Fees Report", component: AdmissionSettingsScreen, isSubRoute: true },
        ],
      },
      { name: "Assign Group Fee", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Assigned History", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Fees Type", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Fees Discount", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Fees Fines", component: AdmissionSettingsScreen, isSubRoute: true },
      {
        name: "Settings",
        component: AdmissionSettingsScreen,
        isSubRoute: true,
        subRoutes: [{ name: "Receipt Setting", component: AdmissionSettingsScreen, isSubRoute: true }],
      },
    ],
  },

  {
    name: "Human Resources",
    component: HumanResources,
    icon: "people-circle",
    subRoutes: [
      { name: "Staff List", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Staff Notes", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Payrolls", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Payroll Report", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Work Shift Types", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Designations", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Departments", component: AdmissionSettingsScreen, isSubRoute: true },
      {
        name: "Settings",
        component: AdmissionSettingsScreen,
        isSubRoute: true,
        subRoutes: [
          { name: "Tax Setting", component: AdmissionSettingsScreen, isSubRoute: true },
          { name: "Pay Slip Setting", component: AdmissionSettingsScreen, isSubRoute: true },
        ],
      },
    ],
  },

  {
    name: "Staff Attendances",
    component: StaffAttendances,
    icon: "person-done",
    subRoutes: [
      { name: "Daily Attendances", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Daily Reports", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Hourly Attendances", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Hourly Report", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Library",
    component: Library,
    icon: "library",
    subRoutes: [
      { name: "Books", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Members", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Issue/Return", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Settings", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Hostels",
    component: Hostels,
    icon: "bed",
    subRoutes: [
      { name: "Rooms", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Members", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Fees", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Settings", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Transports",
    component: Transports,
    icon: "bus",
    subRoutes: [
      { name: "Vehicles", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Routes", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Assign Vehicles", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Settings", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Inventory",
    component: Inventory,
    icon: "cube",
    subRoutes: [
      { name: "Stock", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Suppliers", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Purchases", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Sales", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Settings", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Accounts",
    component: Accounts,
    icon: "cash",
    subRoutes: [
      { name: "Transactions", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Income", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Expenses", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Ledger", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Settings", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Reports",
    component: Reports,
    icon: "bar-chart",
    subRoutes: [
      { name: "Student Reports", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Finance Reports", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Attendance Reports", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Exam Reports", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Communicates",
    component: Communicates,
    icon: "chatbubbles",
    subRoutes: [
      { name: "Notice Board", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Email/SMS", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Push Notifications", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Chat", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Front Desk",
    component: FrontDesk,
    icon: "call",
    subRoutes: [
      { name: "Visitor Book", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Phone Log", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "Postal Record", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Complain", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },

  {
    name: "Users",
    component: Users,
    icon: "person",
    subRoutes: [
      { name: "User List", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Roles & Permissions", component: AdmissionNewRegistrationScreen, isSubRoute: true },
    ],
  },

  {
    name: "Settings",
    component: Settings,
    icon: "settings",
    subRoutes: [
      { name: "General Settings", component: AdmissionApplicationsScreen, isSubRoute: true },
      { name: "Email Settings", component: AdmissionNewRegistrationScreen, isSubRoute: true },
      { name: "SMS Settings", component: AdmissionSettingsScreen, isSubRoute: true },
      { name: "Backup", component: AdmissionSettingsScreen, isSubRoute: true },
    ],
  },
];
