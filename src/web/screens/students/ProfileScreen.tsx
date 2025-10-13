import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Using Feather Icons for a clean, modern look (Requires installing @expo/vector-icons or similar)
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

// --- COLORS ---
const PRIMARY_COLOR = '#4a90e2'; // Blue accent
const SECONDARY_COLOR = '#50e3c2'; // Teal accent
const TEXT_COLOR = '#333333';
const LIGHT_GREY = '#f7f7f7';
const BORDER_COLOR = '#e0eeef';

// --- DATA STRUCTURE ---
const profileData = {
  name: 'Alex Johnson',
  role: 'Senior UI/UX Designer',
  profileImage: 'https://i.pravatar.cc/150?img=3',
  stats: [
    { label: 'Followers', value: '1.2K' },
    { label: 'Projects', value: '78' },
    { label: 'Points', value: '950' },
  ],
};

const menuItems = [
  { icon: 'edit', label: 'Edit Profile', screen: 'EditProfile' },
  { icon: 'settings', label: 'App Settings', screen: 'Settings' },
  { icon: 'credit-card', label: 'Payment & Billing', screen: 'Billing' },
  { icon: 'help-circle', label: 'Support & Help', screen: 'Help' },
  { icon: 'log-out', label: 'Logout', screen: 'Logout', isDanger: true },
];

// --- Helper Component: Stats Chip ---
interface StatChipProps {
  label: string;
  value: string;
}
const StatChip: React.FC<StatChipProps> = ({ label, value }) => (
  <View style={styles.statChip}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// --- Helper Component: Menu Item Row ---
interface MenuItemProps {
  item: typeof menuItems[0];
  onPress: () => void;
}
const MenuItem: React.FC<MenuItemProps> = ({ item, onPress }) => {
  const textColor = item.isDanger ? 'red' : TEXT_COLOR;
  
  return (
    <TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIconCircle, { backgroundColor: item.isDanger ? '#ffdddd' : LIGHT_GREY }]}>
          <Icon name={item.icon} size={20} color={item.isDanger ? 'red' : PRIMARY_COLOR} />
        </View>
        <Text style={[styles.menuItemLabel, { color: textColor }]}>{item.label}</Text>
      </View>
      <Icon name="chevron-right" size={20} color="#cccccc" />
    </TouchableOpacity>
  );
};


// --- Main Profile Screen Component ---
export default function ProfessionalProfileScreen() {
  // Mock function for navigation
  const handleMenuItemPress = (screen: string) => {
    console.log(`Navigating to ${screen}`);
    // In a real app, you would use navigation.navigate(screen)
  };
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- 1. Header Section --- */}
        <View style={styles.header}>
            {/* Background for a modern elevated feel */}
            <View style={styles.headerBg} /> 
            
            <Image
                source={{ uri: profileData.profileImage }}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.role}>{profileData.role}</Text>
            
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>

        {/* --- 2. Stats Bar --- */}
        <View style={styles.statsBar}>
          {profileData.stats.map((stat, index) => (
            <StatChip key={index} label={stat.label} value={stat.value} />
          ))}
        </View>

        {/* --- 3. Menu List --- */}
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <MenuItem 
              key={item.screen} 
              item={item} 
              onPress={() => handleMenuItemPress(item.screen)}
            />
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GREY, // Light grey background for entire screen
  },
  
  // --- Header Styles ---
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'white', // White base for the header content
    marginBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerBg: {
    // This creates a subtle rounded rectangle behind the image/text for visual depth
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150, 
    backgroundColor: PRIMARY_COLOR, // Can be a light version of the primary color
    opacity: 0.1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#ffffff',
    marginBottom: 10,
    // Simple shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  role: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // --- Stats Bar Styles ---
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    // Add shadow similar to the previous style for continuity
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statChip: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },

  // --- Menu List Styles ---
  menuList: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginBottom: 20,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});