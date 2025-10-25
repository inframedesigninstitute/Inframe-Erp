import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
// 1. UNCOMMENT AND USE THE ICON IMPORT
import Icon from 'react-native-vector-icons/Feather';

// --- Constants and Type Definitions ---

const { width } = Dimensions.get('window');
const isTablet = width > 768; 

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  iconName: string; // The Feather icon name
  hasProgressBar?: boolean;
}

const statData: StatCardProps[] = [
  { title: 'Total Students', value: '0', subtitle: '0 pending admissions', color: '#E0F0FF', iconName: 'users' },
  { title: 'Fee Collection', value: '$0', subtitle: '0 payments received', color: '#E6FFE6', iconName: 'dollar-sign' },
  { title: 'Hostel Occupancy', value: '0/0', subtitle: ' ', color: '#F4E6FF', iconName: 'home', hasProgressBar: true },
  { title: 'Library Books', value: '0', subtitle: '0 currently borrowed', color: '#FFF5E0', iconName: 'book-open' },
];

const activities = [
  { icon: 'bell', text: 'New admission application', details: 'John Smith applied for Computer Science', iconColor: '#1A73E8' },
  { icon: 'dollar-sign', text: 'Fee payment received', details: '$2,500 tuition fee paid', iconColor: '#00A859' },
  { icon: 'bookmark', text: 'Room assignment', details: 'Room 201A assigned to Sarah Johnson', iconColor: '#995BCC' },
];

const quickActions = [
  { text: 'Add New Student', icon: 'plus' },
  { text: 'Schedule Exam', icon: 'calendar' },
  { text: 'Add Library Book', icon: 'book' },
];

const getIconColor = (bgColor: string): string => {
  if (bgColor === '#E0F0FF') return '#1A73E8';
  if (bgColor === '#E6FFE6') return '#00A859';
  if (bgColor === '#F4E6FF') return '#995BCC';
  if (bgColor === '#FFF5E0') return '#FF9900';
  return '#333';
};

// --- Sub-Component Functions ---

const StatCard: React.FC<StatCardProps> = ({ 
  title, value, subtitle, color, iconName, hasProgressBar 
}) => {
  const iconColor = getIconColor(color);
  const cardWidth = isTablet ? '23.5%' : '48%'; 

  return (
    <View style={[styles.card, { backgroundColor: color, width: cardWidth }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={[styles.iconPlaceholder, { backgroundColor: iconColor + '30' }]}>
          {/* 2. UNCOMMENTED: Render the Icon component */}
          <Icon name={iconName} size={20} color={iconColor} />
        </View>
      </View>

      <Text style={styles.cardValue}>{value}</Text>
      
      <Text style={[styles.cardSubtitle, title === 'Library Books' && styles.subtitleRed]}>
        {subtitle}
      </Text>

      {hasProgressBar && (
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '0%', backgroundColor: iconColor }]} />
        </View>
      )}
    </View>
  );
};

// --- Main Dashboard Component ---

const DashboardSingleComponent: React.FC = () => {
  const recentActivitiesPanelStyle: ViewStyle = isTablet 
    ? { width: '48.5%' } 
    : { width: '100%', marginBottom: 15 };

  const quickActionsPanelStyle: ViewStyle = isTablet 
    ? { width: '48.5%' } 
    : { width: '100%' };
  
  const bottomRowStyle = isTablet ? styles.bottomRow : styles.bottomColumn;

  // --- Render Functions for Bottom Panels ---
  
  const renderRecentActivities = () => (
    <View style={[styles.panel, recentActivitiesPanelStyle]}>
      <Text style={styles.panelHeader}>Recent Activities</Text>
      {activities.map((activity, index) => (
        <View key={index} style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: activity.iconColor + '30' }]}>
            {/* 3. UNCOMMENTED: Render the Icon component */}
            <Icon name={activity.icon} size={16} color={activity.iconColor} />
          </View>

          <View style={styles.activityContent}>
            <Text style={styles.activityText}>{activity.text}</Text>
            <Text style={styles.activityDetails}>{activity.details}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <View style={[styles.panel, quickActionsPanelStyle]}>
      <Text style={styles.panelHeader}>Quick Actions</Text>
      {quickActions.map((action, index) => (
        <TouchableOpacity key={index} style={styles.quickActionButton}>
          {/* 4. UNCOMMENTED: Render the Icon component */}
          <Icon name={action.icon} size={20} color="#555" style={styles.buttonIcon} />
          <Text style={styles.quickActionButtonText}>{action.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );


  // --- Main Render ---

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* TOP ROW: Stat Cards */}
        <View style={styles.statCardsRow}>
          {statData.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </View>

        {/* BOTTOM ROW: Recent Activities & Quick Actions */}
        <View style={bottomRowStyle}>
          {renderRecentActivities()}
          {renderQuickActions()}
        </View>

      </ScrollView>
    </View>
  );
};

// --- Stylesheet ---

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f3', // lighter background for 3D effect
    padding: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // --- Layout Styles ---
  statCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bottomColumn: {
    flexDirection: 'column',
    marginTop: 10,
  },

  // --- Stat Card Styles (3D look) ---
  card: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f0f0f3',
    shadowColor: '#a3b1c6',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 4,
    height: 140,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  iconPlaceholder: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#aaa',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: '#fff',
  },
  cardValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  subtitleRed: {
    color: '#FF4D4F',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },

  // --- Panel Styles (3D look) ---
  panel: {
    backgroundColor: '#f0f0f3',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#a3b1c6',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 4,
    minHeight: 250,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  panelHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  // --- Activities Styles ---
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  activityIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
    shadowColor: '#aaa',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: '#f0f0f3',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 12,
    color: '#666',
  },

  // --- Quick Actions Styles (3D look buttons) ---
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#f0f0f3',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#a3b1c6',
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  buttonIcon: {
    marginRight: 10,
  },
});


export default DashboardSingleComponent;