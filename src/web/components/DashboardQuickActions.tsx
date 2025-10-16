import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Note: We are using placeholders (emojis) for icons. You can replace them with icons from @expo/vector-icons (like Feather or MaterialCommunityIcons).

// --- Action Item Data ---
interface QuickAction {
  id: number;
  label: string;
  icon: string; // Placeholder for icon name or emoji
  color: string;
  onPress: () => void;
}

// Dummy Action Handlers
const handleAction = (label: string) => {
    console.log(`Navigating to: ${label}`);
    alert(`Action: ${label}`);
};

// Data for Quick Actions (Based on your image)
const actionData: QuickAction[] = [
  { 
    id: 1, 
    label: 'View Timetable', 
    icon: '🗓️', 
    color: '#e6e6fa', // Light Purple-Blue Background
    onPress: () => handleAction('View Timetable') 
  },
  { 
    id: 2, 
    label: 'Download Reports', 
    icon: '📄', 
    color: '#e8f5e9', // Light Green Background
    onPress: () => handleAction('Download Reports') 
  },
  { 
    id: 3, 
    label: 'Course Materials', 
    icon: '📱', 
    color: '#f3e5f5', // Light Purple Background
    onPress: () => handleAction('Course Materials') 
  },
  { 
    id: 4, 
    label: 'Pay Fees', 
    icon: '💵', 
    color: '#fff3e0', // Light Orange Background
    onPress: () => handleAction('Pay Fees') 
  },
];

// --- Quick Action Item Component (Helper) ---

const ActionItem: React.FC<QuickAction> = ({ label, icon, color, onPress }) => (
    <TouchableOpacity style={itemStyles.itemWrapper} onPress={onPress}>
        <View style={[itemStyles.iconContainer, { backgroundColor: color }]}>
            <Text style={itemStyles.iconText}>{icon}</Text>
        </View>
        <Text style={itemStyles.labelText}>{label}</Text>
    </TouchableOpacity>
);

// --- Main DashboardQuickActions Component ---

const DashboardQuickActions: React.FC = () => {
  return (
    <View style={mainStyles.card}>
      <Text style={mainStyles.title}>Quick Actions</Text>
      <View style={mainStyles.actionsContainer}>
        {actionData.map(action => (
          <ActionItem key={action.id} {...action} />
        ))}
      </View>
    </View>
  );
};

// --- Styling ---

const itemStyles = StyleSheet.create({
    itemWrapper: {
        width: '25%', 
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    iconContainer: {
        width: 55,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconText: {
        fontSize: 24, 
    },
    labelText: {
        fontSize: 11,
        textAlign: 'center',
        color: '#333',
        fontWeight: '500',
    },
});

const mainStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default DashboardQuickActions; // ✅ Component name changed to DashboardQuickActions