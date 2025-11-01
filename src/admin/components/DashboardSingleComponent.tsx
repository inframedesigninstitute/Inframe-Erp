// import React from 'react';
// import {
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   ViewStyle,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

// // --- Constants ---
// const { width } = Dimensions.get('window');
// const isTablet = width > 768;

// interface StatCardProps {
//   title: string;
//   value: string;
//   subtitle: string;
//   color: string;
//   iconName: string;
//   hasProgressBar?: boolean;
// }

// const statData: StatCardProps[] = [
//   { title: 'Total Students', value: '0', subtitle: '0 pending admissions', color: '#E0F0FF', iconName: 'users' },
//   { title: 'Fee Collection', value: '$0', subtitle: '0 payments received', color: '#E6FFE6', iconName: 'dollar-sign' },
//   { title: 'Hostel Occupancy', value: '0/0', subtitle: ' ', color: '#F4E6FF', iconName: 'home', hasProgressBar: true },
//   { title: 'Library Books', value: '0', subtitle: '0 currently borrowed', color: '#FFF5E0', iconName: 'book-open' },
// ];

// const activities = [
//   { icon: 'bell', text: 'New admission application', details: 'John Smith applied for Computer Science', iconColor: '#1A73E8' },
//   { icon: 'dollar-sign', text: 'Fee payment received', details: '$2,500 tuition fee paid', iconColor: '#00A859' },
//   { icon: 'bookmark', text: 'Room assignment', details: 'Room 201A assigned to Sarah Johnson', iconColor: '#995BCC' },
// ];

// const getIconColor = (bgColor: string): string => {
//   switch (bgColor) {
//     case '#E0F0FF': return '#1A73E8';
//     case '#E6FFE6': return '#00A859';
//     case '#F4E6FF': return '#995BCC';
//     case '#FFF5E0': return '#FF9900';
//     default: return '#333';
//   }
// };

// // --- StatCard Component ---
// const StatCard: React.FC<StatCardProps> = ({
//   title,
//   value,
//   subtitle,
//   color,
//   iconName,
//   hasProgressBar,
// }) => {
//   const iconColor = getIconColor(color);
//   const cardWidth = isTablet ? '23.5%' : '48%';

//   return (
//     <View style={[styles.card, { backgroundColor: color, width: cardWidth }]}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.cardTitle}>{title}</Text>
//         <View style={[styles.iconWrapper, { backgroundColor: iconColor + '22' }]}>
//           <Icon name={iconName} size={22} color={iconColor} />
//         </View>
//       </View>

//       <Text style={styles.cardValue}>{value}</Text>
//       <Text
//         style={[styles.cardSubtitle, title === 'Library Books' && styles.subtitleRed]}>
//         {subtitle}
//       </Text>

//       {hasProgressBar && (
//         <View style={styles.progressBarContainer}>
//           <View style={[styles.progressBar, { width: '30%', backgroundColor: iconColor }]} />
//         </View>
//       )}
//     </View>
//   );
// };

// // --- Main Dashboard ---
// const DashboardSingleComponent: React.FC = () => {
//   const recentActivitiesPanelStyle: ViewStyle = isTablet
//     ? { width: '48.5%' }
//     : { width: '100%', marginBottom: 15 };

//   const bottomRowStyle = isTablet ? styles.bottomRow : styles.bottomColumn;

//   const renderRecentActivities = () => (
//     <View style={[styles.panel, recentActivitiesPanelStyle]}>
//       <Text style={styles.panelHeader}>Recent Activities</Text>
//       {activities.map((activity, index) => (
//         <View key={index} style={styles.activityItem}>
//           <View style={[styles.activityIcon, { backgroundColor: activity.iconColor + '25' }]}>
//             <Icon name={activity.icon} size={18} color={activity.iconColor} />
//           </View>
//           <View style={styles.activityContent}>
//             <Text style={styles.activityText}>{activity.text}</Text>
//             <Text style={styles.activityDetails}>{activity.details}</Text>
//           </View>
//         </View>
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Stat Cards */}
//         <View style={styles.statCardsRow}>
//           {statData.map((item, index) => (
//             <StatCard key={index} {...item} />
//           ))}
//         </View>

//         {/* Recent Activities */}
//         <View style={bottomRowStyle}>{renderRecentActivities()}</View>
//       </ScrollView>
//     </View>
//   );
// };

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6ebf0',
//     padding: 12,
//   },
//   scrollContent: {
//     paddingBottom: 25,
//   },

//   // Layout
//   statCardsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   bottomColumn: {
//     flexDirection: 'column',
//     marginTop: 15,
//   },

//   // Card 3D Design
//   card: {
//     padding: 18,
//     marginBottom: 12,
//     borderRadius: 15,
//     shadowColor: '#b8c6db',
//     shadowOffset: { width: -5, height: -5 },
//     shadowOpacity: 1,
//     shadowRadius: 6,
//     elevation: 6,
//     borderWidth: 1,
//     borderColor: '#d0d7de',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   iconWrapper: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#9ea7b8',
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//     backgroundColor: '#f9f9f9',
//   },
//   cardValue: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#222',
//     marginTop: 10,
//     marginBottom: 4,
//   },
//   cardSubtitle: {
//     fontSize: 12,
//     color: '#666',
//   },
//   subtitleRed: {
//     color: '#e63946',
//   },
//   progressBarContainer: {
//     height: 6,
//     backgroundColor: '#dfe6ed',
//     borderRadius: 3,
//     marginTop: 8,
//     overflow: 'hidden',
//   },
//   progressBar: {
//     height: '100%',
//     borderRadius: 3,
//   },

//   // Panels
//   panel: {
//     backgroundColor: '#f2f4f8',
//     borderRadius: 15,
//     padding: 15,
//     shadowColor: '#b8c6db',
//     shadowOffset: { width: -4, height: -4 },
//     shadowOpacity: 0.9,
//     shadowRadius: 6,
//     elevation: 6,
//     minHeight: 240,
//   },
//   panelHeader: {
//     fontSize: 17,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#333',
//   },

//   // Activities
//   activityItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   activityIcon: {
//     width: 34,
//     height: 34,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//     shadowColor: '#b8c6db',
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     backgroundColor: '#ffffff',
//   },
//   activityContent: {
//     flex: 1,
//   },
//   activityText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   activityDetails: {
//     fontSize: 12,
//     color: '#666',
//   },
// });

// export default DashboardSingleComponent;
