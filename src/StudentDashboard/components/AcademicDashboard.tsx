import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Gradient Fallback ---
const GradientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (Platform.OS === 'web') {
    // Web fallback using backgroundImage
    return <View style={styles.webGradient}>{children}</View>;
  } else {
    const LinearGradient = require('expo-linear-gradient').LinearGradient;
    return (
      <LinearGradient colors={['#f9fafb', '#d1d5db']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        {children}
      </LinearGradient>
    );
  }
};

// --- Interface ---
interface MetricData {
  title: string;
  value: string;
  subtitle: string;
  iconName: string;
  valueColor?: string;
}

// --- Card Component ---
const DashboardMetricCard: React.FC<MetricData> = ({
  title,
  value,
  subtitle,
  iconName,
  valueColor = '#000000',
}) => {
  return (
    <GradientWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icon name={iconName} size={22} color="#555" />
      </View>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </GradientWrapper>
  );
};

// --- Main Dashboard ---
const AcademicDashboard: React.FC = () => {
  const dashboardMetrics: MetricData[] = [
    { title: 'Current GPA', value: '3.7', subtitle: '+0.2 from last semester', iconName: 'book-open-page-variant', valueColor: '#34d399' },
    { title: 'Attendance', value: '88%', subtitle: 'Overall this semester', iconName: 'clipboard-check-outline', valueColor: '#60a5fa' },
    { title: 'Pending Tasks', value: '3', subtitle: 'Assignments due soon', iconName: 'file-document-multiple-outline', valueColor: '#f59e0b' },
    { title: 'Credits', value: '16', subtitle: 'This semester', iconName: 'medal-outline', valueColor: '#a78bfa' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        {dashboardMetrics.map((metric, index) => (
          <DashboardMetricCard key={index} {...metric} />
        ))}
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    width: '98%',
    marginTop: 25,
    marginLeft: 15,
    marginRight: 25,paddingTop:15,
    backgroundColor: '#e5e7eb',paddingLeft:20,paddingRight:15, borderRadius:30
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '23%',
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  webGradient: {
    width: '23%',
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    backgroundImage: 'linear-gradient(145deg, #f9fafb, #d1d5db)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  value: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default AcademicDashboard;
