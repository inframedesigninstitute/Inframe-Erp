import Dashboard from "../screens/Dashboard";
import Reports from "../screens/Reports";
import Settings from "../screens/Settings";
import Users from "../screens/Users";

export const adminRoutes = [
  { name: "Dashboard", component: Dashboard },
  { name: "Users", component: Users },
  { name: "Reports", component: Reports },
  { name: "Settings", component: Settings },
];
