// src/admin/navigation/routes.ts
import React from "react";
import Academic from "../screens/AcademicScreen";
import Accounts from "../screens/Accounts";
import Admission from "../screens/AdmissionScreen";
import Communicates from "../screens/Communicates";
import Dashboard from "../screens/Dashboard";
import EmployeeListScreen from "../screens/EmployeeListScreen";
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

// Sub-Menu Placeholders (if no screen yet)
const Applications = () => null;
const NewRegistration = () => null;
const StudentList = () => null; // Only for Students main menu
const Transfers = () => null;
const StatusTypes = () => null;
const IDCards = () => null;
const AdmissionSettings = () => null;

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
      { name: "Applications", component: Applications, isSubRoute: true },
      { name: "New Registration", component: NewRegistration, isSubRoute: true },
      { name: "Student List", component: EmployeeListScreen, isSubRoute: true }, // Updated to EmployeeListScreen
      { name: "Transfers", component: Transfers, isSubRoute: true },
      { name: "Status Types", component: StatusTypes, isSubRoute: true },
      { name: "ID Cards", component: IDCards, isSubRoute: true },
      { name: "Settings", component: AdmissionSettings, isSubRoute: true },
    ],
  },

  {
    name: "Students",
    component: Students,
    icon: "people",
    subRoutes: [
      { name: "Student List", component: StudentList, isSubRoute: true }, // Separate placeholder
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
