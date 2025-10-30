// LeaveRequestsScreen.tsx (Admin View)
import React, { useCallback, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- 1. TYPE DEFINITIONS AND DUMMY DATA ---

export interface LeaveRequest {
  id: string;
  studentId: string;
  name: string;
  leaveDates: string; 
  applyDay: number;
  status: 'Approved' | 'Rejected' | 'Pending';
  leaveType: 'Family event' | 'Travel' | 'No'; 
}

export const DUMMY_DATA: LeaveRequest[] = [
  {
    id: '1',
    studentId: '#1014',
    name: 'Rylex Pratt',
    leaveDates: '24-10-2024 to 26-10-2024',
    applyDay: 3,
    status: 'Approved',
    leaveType: 'Travel',
  },
  {
    id: '2',
    studentId: '#1015',
    name: 'Alex Pratt',
    leaveDates: '26-10-2024 to 01-11-2024',
    applyDay: 6,
    status: 'Rejected',
    leaveType: 'Family event',
  },
  {
    id: '3',
    studentId: '#1016',
    name: 'Mia Cartel',
    leaveDates: '10-11-2024 to 12-11-2024',
    applyDay: 3,
    status: 'Pending',
    leaveType: 'Family event',
  },
  {
    id: '4',
    studentId: '#1017',
    name: 'John Doe',
    leaveDates: '01-12-2024 to 05-12-2024',
    applyDay: 5,
    status: 'Pending',
    leaveType: 'Travel',
  },
];

// --- 2. LEAVE REQUEST ROW COMPONENT (LeaveRow) ---

interface LeaveRowProps {
  request: LeaveRequest;
  onUpdateStatus: (id: string, newStatus: LeaveRequest['status']) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const getStatusStyle = (status: LeaveRequest['status']) => {
  switch (status) {
    case 'Approved':
      return { backgroundColor: '#4CAF50', color: '#FFFFFF' }; // Green
    case 'Rejected':
      return { backgroundColor: '#F44336', color: '#FFFFFF' }; // Red
    case 'Pending':
      return { backgroundColor: '#FFC107', color: '#333333' }; // Amber
    default:
      return { backgroundColor: '#9E9E9E', color: '#FFFFFF' };
  }
};

const LeaveRow: React.FC<LeaveRowProps> = ({ request, onUpdateStatus, onEdit, onDelete }) => {
  const statusStyle = getStatusStyle(request.status);
  
  // Action Button Placeholder (using simple text icons)
  const ActionButton = ({ icon, color, onPress }: { icon: string, color: string, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={[rowStyles.actionButton, { backgroundColor: color }]}>
      <Text style={rowStyles.actionIcon}>{icon}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={rowStyles.card}>
      
      {/* Name and ID Header */}
      <View style={rowStyles.mainInfo}>
        <Text style={rowStyles.nameText}>{request.name}</Text>
        <Text style={rowStyles.idText}>{request.studentId}</Text>
      </View>

      {/* Details Row */}
      <View style={rowStyles.detailsRow}>
        <View style={rowStyles.detailItem}>
          <Text style={rowStyles.detailLabel}>Dates:</Text>
          <Text style={rowStyles.detailValue}>{request.leaveDates}</Text>
        </View>
        <View style={rowStyles.detailItem}>
          <Text style={rowStyles.detailLabel}>Type:</Text>
          <Text style={rowStyles.detailValue}>{request.leaveType}</Text>
        </View>
        <View style={rowStyles.detailItem}>
          <Text style={rowStyles.detailLabel}>Days:</Text>
          <Text style={rowStyles.detailValue}>{request.applyDay}</Text>
        </View>
      </View>

      {/* Status Badge and Actions */}
      <View style={rowStyles.statusActionRow}>
        {/* Status Badge */}
        <View style={rowStyles.statusBadgeContainer}>
            <Text style={[rowStyles.statusBadge, { backgroundColor: statusStyle.backgroundColor, color: statusStyle.color }]}>
                {request.status.toUpperCase()}
            </Text>
        </View>

        {/* Action Buttons (Admin Permissions) */}
        <View style={rowStyles.actionsContainer}>
          
          {/* 1. Approval/Rejection Buttons (Only for Pending) */}
          {request.status === 'Pending' && (
              <>
                  <ActionButton icon="✓" color="#4CAF50" onPress={() => onUpdateStatus(request.id, 'Approved')} />
                  <ActionButton icon="✕" color="#F44336" onPress={() => onUpdateStatus(request.id, 'Rejected')} />
              </>
          )}

          {/* 2. Edit Button (Admin Permission) - Available for all requests */}
          <ActionButton icon="✎" color="#FF9800" onPress={() => onEdit(request.id)} />
          
          {/* 3. Delete Button (Admin Permission) - Available for all requests */}
          <ActionButton icon="🗑" color="#9E9E9E" onPress={() => onDelete(request.id)} />
        </View>
      </View>
    </View>
  );
};

// --- 3. MAIN SCREEN COMPONENT (LeaveRequestsScreen) ---

const LeaveRequestsScreen: React.FC = () => {
  const [data, setData] = useState<LeaveRequest[]>(DUMMY_DATA);
  const [filterStatus, setFilterStatus] = useState<LeaveRequest['status'] | 'All'>('All');
  const [searchText, setSearchText] = useState<string>('');
  
  // *** CORE FUNCTIONALITY: Admin Actions ***

  const updateRequestStatus = useCallback((id: string, newStatus: LeaveRequest['status']) => {
    setData(prevData =>
      prevData.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    console.log(`[STATUS UPDATE]: Request ${id} changed to ${newStatus}`);
    // NOTE: Here you would typically make an API call (axios.put/fetch)
  }, []);

  const handleEdit = useCallback((id: string) => {
      console.log(`[ADMIN ACTION]: Editing request ID: ${id}. (Open Modal/Navigate)`);
      // NOTE: Here you would open a modal or navigate to an Edit screen
  }, []);

  const handleDelete = useCallback((id: string) => {
      // Simple confirmation dialog logic would go here before deletion
      setData(prevData => prevData.filter(req => req.id !== id));
      console.log(`[ADMIN ACTION]: Deleting request ID: ${id}.`);
      // NOTE: Here you would typically make an API call (axios.delete/fetch)
  }, []);

  // Filtering logic
  const filteredData = data.filter(item => {
    const statusMatch = filterStatus === 'All' || item.status === filterStatus;
    const searchMatch = item.name.toLowerCase().includes(searchText.toLowerCase()) || 
                        item.studentId.includes(searchText);
    return statusMatch && searchMatch;
  });

  return (
    <View style={mainStyles.container}>
      {/* Header */}
      <View style={mainStyles.header}>
        <Text style={mainStyles.headerTitle}>Student Leave Portal (Admin)</Text>
      </View>

      {/* Filter/Controls Area */}
      <View style={mainStyles.controlsContainer}>
        <Text style={mainStyles.sectionTitle}>Manage Leave Requests</Text>
        
        {/* Status Filter Buttons */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={mainStyles.filterBar}>
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                <TouchableOpacity
                    key={status}
                    style={[mainStyles.filterButton, filterStatus === status && mainStyles.activeFilter]}
                    onPress={() => setFilterStatus(status as LeaveRequest['status'] | 'All')}
                >
                    <Text style={[mainStyles.filterText, filterStatus === status && mainStyles.activeFilterText]}>{status}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>

        {/* Search Input and Apply Button */}
        <View style={mainStyles.searchContainer}>
            <TextInput
                style={mainStyles.input}
                placeholder="Student ID or Name"
                placeholderTextColor="#A0A0A0"
                value={searchText}
                onChangeText={setSearchText}
            />
            <TouchableOpacity style={mainStyles.applyFilterButton} onPress={() => console.log("Filters applied!")}>
                <Text style={mainStyles.applyFilterText}>Search</Text>
            </TouchableOpacity>
        </View>
      </View>
      
      {/* Leave Requests List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <LeaveRow 
                request={item} 
                onUpdateStatus={updateRequestStatus} 
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        )}
        contentContainerStyle={mainStyles.listContainer}
        ListEmptyComponent={<Text style={mainStyles.emptyList}>No leave requests found.</Text>}
      />
    </View>
  );
};

export default LeaveRequestsScreen;


// --- 4. STYLESHEETS (3D / Neumorphic Modern Design) ---

const rowStyles = StyleSheet.create({
  card: {
    backgroundColor: '#E9EEF5',
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    marginHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  nameText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    textShadowColor: '#C5D0E6',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  idText: {
    fontSize: 14,
    color: '#555',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDE3F0',
    paddingBottom: 10,
  },
  detailItem: {
    flex: 1,
    paddingHorizontal: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: '#748AA1',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  statusActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadgeContainer: {},
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 25,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: '#E0E7FF',
    shadowColor: '#A0AEC0',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
    color: '#3B82F6',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '#F3F6FA',
    shadowColor: '#94A3B8',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  actionIcon: {
    color: '#1E40AF',
    fontWeight: 'bold',
    fontSize: 18,
  },
})

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEF5',
  },
  header: {
    backgroundColor: '#1E40AF',
    paddingTop: 40,
    paddingBottom: 18,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.6,
    textShadowColor: '#475569',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  controlsContainer: {
    backgroundColor: '#F7F9FC',
    margin: 14,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#A3B1C6',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1E293B',
  },
  filterBar: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginRight: 10,
    backgroundColor: '#E2E8F0',
    shadowColor: '#CBD5E1',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },
  activeFilter: {
    backgroundColor: '#2563EB',
    shadowColor: '#1E3A8A',
  },
  filterText: {
    color: '#334155',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#E9EEF5',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowColor: '#94A3B8',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  applyFilterButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  applyFilterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6B7280',
    marginHorizontal: 20,
  },
})
