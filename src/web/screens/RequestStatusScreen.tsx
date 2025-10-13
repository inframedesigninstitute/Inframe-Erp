import React, { ComponentProps, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Note: Expo BlurView is used here; remove if dependency is not installed.
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// --- 1. TYPESCRIPT INTERFACES & TYPES ---

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type FontAwesome5IconName = ComponentProps<typeof FontAwesome5>['name'];

interface UpdateItem {
  id: string;
  type: 'Hostel' | 'Transport';
  title: string;
  subtitle: string;
  icon: MaterialIconName | FontAwesome5IconName;
  posted: string;
  isImportant?: boolean; // For the little red dot/notification count
}

type TabKey = 'Hostel' | 'Transport' | 'All';

// --- 2. MOCK DATA (Updates/Status) ---

const MOCK_UPDATES: UpdateItem[] = [
  { id: 'H1', type: 'Hostel', title: 'Mess Menu Change', subtitle: 'Dinner timings are changed from 8:00 PM to 7:30 PM starting tomorrow.', icon: 'restaurant-menu', posted: '3 minutes ago', isImportant: true },
  { id: 'H2', type: 'Hostel', title: 'New Library Hours', subtitle: 'Library will now open at 7:00 AM daily. Please check the notice board.', icon: 'library-books', posted: '1 hour ago' },
  { id: 'T1', type: 'Transport', title: 'Route 1 - Main Gate', subtitle: 'Running 10 mins Late due to unexpected traffic congestion.', icon: 'bus', posted: '10 minutes ago', isImportant: true },
  { id: 'H3', type: 'Hostel', title: 'Gym Equipment Maintenance', subtitle: 'Gym will be closed for maintenance on Oct 15th (Full Day).', icon: 'fitness-center', posted: '5 minutes ago' },
];

// --- 3. COMPONENTS ---

// Component for a single Update Card with Light Theme/Blur effect
const UpdateCard: React.FC<{ item: UpdateItem }> = ({ item }) => {
  const isTransport = item.type === 'Transport';
  const IconComponent = isTransport ? FontAwesome5 : MaterialIcons;
  const iconColor = isTransport ? '#FF9800' : '#007AFF'; 
  const isBus = item.icon === 'bus';

  // Determine the correct icon name type for the component
  const iconName = isBus ? (item.icon as FontAwesome5IconName) : (item.icon as MaterialIconName);

  return (
    <View style={styles.cardWrapper}>
      {/* BlurView tint is now 'light' for a white theme */}
      <BlurView intensity={30} tint="light" style={styles.blurContainer}> 
        <View style={styles.cardContent}>
          
          <View style={styles.iconCircle}>
            <IconComponent 
              name={iconName} 
              size={24} 
              color={iconColor} 
            />
            {item.isImportant && <View style={styles.notificationDot} />}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={2}>
              {item.subtitle}
            </Text>
            <Text style={styles.cardPostedTime}>Posted {item.posted}</Text>
          </View>
        
        </View>
      </BlurView>
    </View>
  );
};

// --- 4. MAIN SCREEN COMPONENT ---

const RequestStatusScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Hostel');
  
  const filteredUpdates = MOCK_UPDATES.filter(item => 
    activeTab === 'All' ? true : item.type === activeTab
  );

  const hostelCount = MOCK_UPDATES.filter(item => item.type === 'Hostel' && item.isImportant).length;
  const transportCount = MOCK_UPDATES.filter(item => item.type === 'Transport' && item.isImportant).length;

  return (
    <View style={styles.container}>
      
      {/* Header/Title matching the image */}
      <Text style={styles.mainHeader}>HOSTEL & TRANSPORT</Text>
      <Text style={styles.subHeader}>UPDATES</Text>

      {/* Modern Tab Toggle */}
      <View style={styles.tabToggleContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'All' && styles.activeTab]}
          onPress={() => setActiveTab('All')}>
          <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Hostel' && styles.activeTab]}
          onPress={() => setActiveTab('Hostel')}>
          <Ionicons name="bed" size={16} color={activeTab === 'Hostel' ? '#fff' : '#333'} />
          <Text style={[styles.tabText, activeTab === 'Hostel' && styles.activeTabText]}>Hostel</Text>
          {hostelCount > 0 && <View style={styles.tabNotification}><Text style={styles.tabNotificationText}>{hostelCount}</Text></View>}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Transport' && styles.activeTab]}
          onPress={() => setActiveTab('Transport')}>
          <Ionicons name="bus" size={16} color={activeTab === 'Transport' ? '#fff' : '#333'} />
          <Text style={[styles.tabText, activeTab === 'Transport' && styles.activeTabText]}>Transport</Text>
          {transportCount > 0 && <View style={styles.tabNotification}><Text style={styles.tabNotificationText}>{transportCount}</Text></View>}
        </TouchableOpacity>
      </View>

      {/* Updates List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredUpdates.map(item => (
          <UpdateCard key={item.id} item={item} />
        ))}
        
        {/* Read More Button (As seen at the bottom of the image) */}
        <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Read More</Text>
            <MaterialIcons name="arrow-forward-ios" size={14} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// --- 5. STYLESHEET ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // FIX: White background
    backgroundColor: '#F0F0F0', 
    paddingTop: 60,
  },
  // FIX: Black Text
  mainHeader: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a', 
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  // FIX: Black Text
  subHeader: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a', 
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1.5,
  },
  
  // Tabs
  tabToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 15,
    // FIX: Light transparent background
    backgroundColor: 'rgba(0, 0, 0, 0.05)', 
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  // FIX: Black text when inactive
  tabText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
  activeTabText: {
    color: '#fff',
  },
  tabNotification: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: '#FF3B30', 
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  tabNotificationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },

  // Cards (Light Glassmorphism/Shadow Effect)
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    // Light shadow for floating effect on white background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
    borderWidth: 1,
    // FIX: Light border
    borderColor: 'rgba(0, 0, 0, 0.1)', 
    backgroundColor: '#fff', // Fallback background for cards
  },
  blurContainer: {
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 10, 
    // FIX: Very light circle background
    backgroundColor: 'rgba(0, 0, 0, 0.05)', 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
  },
  textContainer: {
    flex: 1,
  },
  // FIX: Black Text
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a', 
  },
  // FIX: Dark grey text
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  // FIX: Lighter grey text
  cardPostedTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
  },

  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF', 
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: '700',
    marginRight: 5,
  }
});

export default RequestStatusScreen;