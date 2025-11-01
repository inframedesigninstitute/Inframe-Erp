import { LinearGradient } from 'expo-linear-gradient';
import {
  AlertCircle,
  BookOpen,
  Building2,
  DollarSign,
  Home,
  TrendingUp,
  Users,
} from 'lucide-react-native';
import React from 'react';
import {
  ColorValue,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

// --- Constants ---
const { width } = Dimensions.get('window');
const isTablet = width > 768; // Assuming tablet starts at 768px

// --------------------------------------------------------
// --- StatCard Interface and Component (From your code) ---
// --------------------------------------------------------

interface StatCardProps {
  title: string;
  value: string;
  change: string; // Required by StatCardProps
  isPositive: boolean; // Required by StatCardProps
  icon: React.ReactNode;
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
}

const StatCard = ({ title, value, change, isPositive, icon, colors }: StatCardProps) => {
  return (
    <LinearGradient colors={colors} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={[styles.change, { color: isPositive ? '#104232ff' : '#E63946' }]}>
          {change}
        </Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.footerText, { color: isPositive ? '#3f4946ff' : '#E63946' }]}>
        {isPositive ? '↑' : '↓'} {change} from last month
      </Text>
    </LinearGradient>
  );
};

// --------------------------------------------------------
// --- DashboardStats Data (FIXED for TypeScript) ---
// --------------------------------------------------------

const statsData: StatCardProps[] = [
  {
    title: 'Total Students',
    value: '2,847',
    change: '+12.5%',
    isPositive: true,
    icon: <Users size={24} color="#030303ff" />,
    colors: ['#ffffffff', '#e0deddff'] as const,
  },
  {
    title: 'Faculty Members',
    value: '147',
    change: '+2.1%',
    isPositive: true,
    icon: <BookOpen size={24} color="#070606ff" />,
    colors: ['#ffffffff', '#e0deddff'] as const,
  },
  {
    title: 'Departments',
    value: '12',
    change: 'No change',
    isPositive: true,
    icon: <Building2 size={24} color="#000000ff" />,
    colors: ['#ffffffff', '#e0deddff'] as const,
  },
  {
    title: 'Fees Collected',
    value: '₹45.2L',
    change: '+33%',
    isPositive: true,
    icon: <DollarSign size={24} color="#000000ff" />,
    colors: ['#ffffffff', '#e0deddff'] as const,
  },
  {
    title: 'Pending Fees',
    value: '₹12.8L',
    change: '-15.2%',
    isPositive: false,
    icon: <AlertCircle size={24} color="#000000ff" />,
    colors: ['#ffffffff', '#e0deddff'] as const,
  },
  {
    title: 'Growth Rate',
    value: '8.5%',
    change: '+4.2%',
    isPositive: true,
    icon: <TrendingUp size={24} color="#000000ff" />,
    colors: ['#ffffffff', '#e0e3e4ff'] as const,
  },
  { 
    title: 'Hostel Occupancy', 
    value: '65%', 
    change: '+5%', 
    isPositive: true, 
    icon: <Home size={24} color="#000000ff" />, 
    colors: ['#ffffffff', '#e0e3e4ff'] as const,
  },
  { 
    title: ' Complent ', 
    value: '65%', 
    change: '+5%', 
    isPositive: true, 
    icon: <Home size={24} color="#000000ff" />, 
    colors: ['#ffffffff', '#e0e3e4ff'] as const,
  },
  // --- FIXED ITEM 2: Library Books ---
  { 
    title: 'Library Books', 
    value: '15,000',
    change: '+0.5%', 
    isPositive: true, 
    icon: <BookOpen size={24} color="#000000ff" />, 
    colors: ['#ffffffff', '#e0e3e4ff'] as const,
  },
];



interface ActivityItemProps {
  icon: React.ReactNode;
  text: string;
  details: string;
}

const activitiesData: ActivityItemProps[] = [
  {
    icon: <Users size={18} color="#1A73E8" />,
    text: 'New admission application',
    details: 'John Smith applied for Computer Science',
  },
  {
    icon: <DollarSign size={18} color="#00A859" />,
    text: 'Fee payment received',
    details: '$2,500 tuition fee paid',
  },
  {
    icon: <Building2 size={18} color="#995BCC" />,
    text: 'Room assignment',
    details: 'Room 201A assigned to Sarah Johnson',
  },
  {
    icon: <Home size={18} color="#FF9900" />,
    text: 'Hostel check-in',
    details: 'Student A checked into Room 102B',
  },
  {
    icon: <BookOpen size={18} color="#995BCC" />,
    text: 'Library Book Issued',
    details: 'Book: Calculus III issued to Jane Doe',
  },
  {
    icon: <AlertCircle size={18} color="#E63946" />,
    text: 'Fee payment overdue',
    details: 'Reminder sent to 5 students',
  },
  {
    icon: <TrendingUp size={18} color="#00A859" />,
    text: 'New course approval',
    details: 'Data Science curriculum finalized',
  },
];

// --- Recent Activities Component (Recreated for 40% panel) ---
const RecentActivitiesPanel: React.FC<{ style: ViewStyle }> = ({ style }) => (
  <View style={[styles.panel, style]}>
    <Text style={styles.panelHeader}>Recent Activities</Text>
    {activitiesData.map((activity, index) => (
      <View key={index} style={styles.activityItem}>
        {/* Activity Icon wrapper maintains the 3D look/shading */}
        <View style={styles.activityIcon}>{activity.icon}</View>
        <View style={styles.activityContent}>
          <Text style={styles.activityText}>{activity.text}</Text>
          <Text style={styles.activityDetails}>{activity.details}</Text>
        </View>
      </View>
    ))}
  </View>
);

// --------------------------------------------------------
// --- Main Combined Component ---
// --------------------------------------------------------

export default function CombinedDashboard() {
  const statsContainerStyle: ViewStyle = isTablet
    ? { width: '58%', marginRight: '2%' } // Adjusted for 60% with gap
    : { width: '100%', marginBottom: 15 };

  const activitiesPanelStyle: ViewStyle = isTablet
    ? { width: '40%' }
    : { width: '100%', marginBottom: 15 };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.mainContentContainer}>
        {/* 60% Width for Stats on Tablet */}
        <View style={statsContainerStyle}>
          <View style={styles.statsContainer}>
            {statsData.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </View>
        </View>

        {/* 40% Width for Activities on Tablet - Now 3D Styled */}
        <RecentActivitiesPanel style={activitiesPanelStyle} />
      </View>
    </ScrollView>
  );
}

// --------------------------------------------------------
// --- Styles (Combined and Adjusted) ---
// --------------------------------------------------------

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background for the whole screen
    padding: 12, // Increased padding slightly for better look
    height: 'auto',
  },
  mainContentContainer: {
    flexDirection: isTablet ? 'row' : 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },

  // --- STATS (60% Area) Styles ---
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: isTablet ? '31%' : '48%',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#b8c6db', // Soft light shadow
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#d0d7de',
    minHeight: 120,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 13,
    color: '#000000ff',
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    color: '#0e0c0cff',
    fontWeight: '700',
  },
  footerText: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 6,
  },
  change: {
    fontSize: 11,
    fontWeight: '600',
  },

  // --- ACTIVITIES (40% Area) Styles - UPDATED FOR 3D LOOK ---
  panel: {
    backgroundColor: '#f8f8f8', // Matching the background color
    borderRadius: 15,
    padding: 15,
    minHeight: 250,
    
    // 3D/Neumorphism Styles (Similar to card but slightly adjusted)
    shadowColor: '#b8c6db', // Soft light shadow
    shadowOffset: { width: -5, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#d0d7de',
  },
  panelHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#e6f0ff',
    // Adding subtle 3D shadow to the icon wrapper for depth
    shadowColor: '#b8c6db',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activityDetails: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});