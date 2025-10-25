import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';

interface Employee {
  id: number;
  role: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  joiningTime: string;
  status: 'Active' | 'Inactive';
}

// --- INITIAL EMPLOYEES ---
const INITIAL_EMPLOYEES: Employee[] = [
  { id: 1, role: 'Student', username: 'student1001', name: 'Aarav Sharma', email: 'aarav@gmail.com', mobile: '9876543201', joiningTime: '01-06-2023', status: 'Active' },
  { id: 2, role: 'Faculty', username: 'faculty1002', name: 'Meera Singh', email: 'meera@gmail.com', mobile: '9876543202', joiningTime: '02-06-2023', status: 'Active' },
  { id: 3, role: 'Student', username: 'student1003', name: 'Rohan Verma', email: 'rohan@gmail.com', mobile: '9876543203', joiningTime: '03-06-2023', status: 'Active' },
  { id: 4, role: 'Faculty', username: 'faculty1004', name: 'Priya Patel', email: 'priya@example.com', mobile: '9123456789', joiningTime: '15-05-2022', status: 'Active' },
  { id: 5, role: 'Student', username: 'student1005', name: 'Amit Kumar', email: 'amit@test.com', mobile: '8000111222', joiningTime: '10-08-2023', status: 'Inactive' },
  { id: 6, role: 'Staff', username: 'staff1006', name: 'Sunita Rao', email: 'sunita@college.edu', mobile: '7778889990', joiningTime: '20-11-2021', status: 'Active' },
  { id: 7, role: 'Student', username: 'student1007', name: 'David Lee', email: 'david@college.edu', mobile: '6000000001', joiningTime: '05-09-2024', status: 'Inactive' },
];

const { width } = Dimensions.get('window');
const isLargeScreen = width > 800;

// --- MAIN COMPONENT ---
const EmployeeListScreen: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchText, setSearchText] = useState('');

  // --- MODAL STATES ---
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);

  // --- DERIVED STATE (Quick Stats/Activity Overview) ---
  const stats = useMemo(() => {
    const totalUsers = employees.length;
    const activeUsers = employees.filter(emp => emp.status === 'Active').length;
    const inactiveUsers = totalUsers - activeUsers;
    const activeRate = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;
    const inactiveRate = 100 - activeRate;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      activeRate,
      inactiveRate,
      activeRateRounded: Math.round(activeRate),
      inactiveRateRounded: Math.round(inactiveRate),
    };
  }, [employees]);

  // --- ACTION HANDLERS ---
  const handleView = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setViewModalVisible(true);
  }, []);

  // Handle Edit
  const handleEdit = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setEditedEmployee({ ...employee }); // Create a copy for editing
    setEditModalVisible(true);
  }, []);

  // Save Edit
  const handleSaveEdit = () => {
    if (editedEmployee) {
      setEmployees(prev =>
        prev.map(emp => (emp.id === editedEmployee.id ? editedEmployee : emp))
      );
      setEditModalVisible(false);
      setSelectedEmployee(null);
      setEditedEmployee(null);
      Alert.alert('Success', `${editedEmployee.name}'s data updated successfully!`);
    }
  };

  // Handle Delete (open custom modal)
  const handleDelete = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteModalVisible(true);
  }, []);

  // Confirm Delete (actual deletion)
  const confirmDelete = () => {
    if (selectedEmployee) {
      const deletedId = selectedEmployee.id;
      setEmployees(prev => prev.filter(e => e.id !== deletedId));
      setDeleteModalVisible(false);
      setSelectedEmployee(null);
      Alert.alert('Deleted', `Program ID ${deletedId} has been deleted.`);
    }
  };

  // --- ADD STUDENT ---
  const addStudent = () => {
    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    const newStudent: Employee = {
      id: newId,
      role: 'Student',
      username: `student${1000 + newId}`,
      name: `New Student ${newId}`,
      email: `student${newId}@gmail.com`,
      mobile: '9876543210',
      joiningTime: new Date().toLocaleDateString('en-GB'),
      status: 'Active',
    };
    setEmployees(prev => [...prev, newStudent]);
  };

  // --- FILTERED LIST ---
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.username.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchText.toLowerCase())
  );

  // --- EMPLOYEE ROW ---
  const EmployeeRow: React.FC<{ employee: Employee; isEven: boolean }> = React.memo(({ employee, isEven }) => (
    <View style={[styles.row, isEven && styles.rowEven]}>
      <Text style={[styles.cell, { flex: 0.5 }]}>{employee.id}</Text>
      <View style={[styles.cell, { flex: 1, alignItems: 'center' }]}>
        <Icon name="person-circle-outline" size={40} color="#6c757d" />
      </View>
      <View style={[styles.cell, { flex: 2 }]}>
        <Text>Name: <Text style={styles.cellTextBold}>{employee.name}</Text></Text>
      </View>
      <View style={[styles.cell, { flex: 3 }]}>
        {/* <Text>Name: <Text style={styles.cellTextBold}>{employee.name}</Text></Text> */}
        <Text>Email: <Text style={styles.cellTextEmail}>{employee.email}</Text></Text>
        {/* <Text>Mobile: <Text style={styles.cellTextMobile}>{employee.mobile}</Text></Text> */}
      </View>
      <Text style={[styles.cell, { flex: 1.5 }]}>{employee.joiningTime}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{employee.status}</Text>
      <View style={[styles.cell, { flex: 1.5, flexDirection: 'row', justifyContent: 'space-around' }]}>
        {/* View Button */}
        <TouchableOpacity onPress={() => handleView(employee)} style={styles.actionButton}>
          <Feather name="eye" size={16} color="#007bff" />
        </TouchableOpacity>
        {/* Edit Button */}
        <TouchableOpacity onPress={() => handleEdit(employee)} style={styles.actionButton}>
          <Feather name="edit" size={16} color="#007bff" />
        </TouchableOpacity>
        {/* Delete Button */}
        <TouchableOpacity onPress={() => handleDelete(employee)} style={styles.actionButton}>
          <Feather name="trash-2" size={16} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  ));

  // --- QUICK STATS CARD COMPONENT ---
  const QuickStatsCard: React.FC = React.memo(() => (
    <View style={styles.quickStatsContainer}>
      <Text style={styles.quickStatsTitle}>Quick Stats</Text>
      <View style={styles.quickStatBox}>
        <Text style={styles.statLabel}>Total Users</Text>
        <View style={styles.statValueRow}>
          <Text style={styles.totalUsersValue}>{stats.totalUsers}</Text>
          <Icon name="people-circle-outline" size={40} color="#333" />
        </View>
      </View>

      <View style={styles.statItem}>
        <View style={styles.statIconBackground}>
          <Icon name="person-add-outline" size={24} color="#28a745" />
        </View>
        <View>
          <Text style={styles.statDetailValue}>{stats.activeUsers}</Text>
          <Text style={styles.statDetailLabel}>Active Users</Text>
        </View>
        <Text style={[styles.statPercentage, { color: '#28a745' }]}>{stats.activeRateRounded}%</Text>
      </View>

      <View style={styles.statItem}>
        <View style={[styles.statIconBackground, { backgroundColor: '#f5c6cb' }]}>
          <Icon name="person-remove-outline" size={24} color="#dc3545" />
        </View>
        <View>
          <Text style={styles.statDetailValue}>{stats.inactiveUsers}</Text>
          <Text style={styles.statDetailLabel}>Inactive Users</Text>
        </View>
        <Text style={[styles.statPercentage, { color: '#dc3545' }]}>{stats.inactiveRateRounded}%</Text>
      </View>

      {/* Quick Actions/Settings Section */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickStatsTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.quickActionLink}>
          <Feather name="file-text" size={16} color="#007bff" />
          <Text style={styles.quickActionText}>Export user list</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionLink}>
          <Feather name="bar-chart-2" size={16} color="#007bff" />
          <Text style={styles.quickActionText}>Generate report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionLink}>
          <Feather name="settings" size={16} color="#007bff" />
          <Text style={styles.quickActionText}>System settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  ));

  // --- ACTIVITY OVERVIEW CARD COMPONENT (Simplified) ---
  const ActivityOverviewCard: React.FC = React.memo(() => {
    // Placeholder data for the rate chart (e.g., last 7 days active count)
    const data = [10, 15, 12, 18, stats.activeUsers, 16, 20];
    const maxActive = Math.max(...data);

    return (
      <View style={styles.activityOverviewContainer}>
        <Text style={styles.quickStatsTitle}>Activity Overview</Text>

        {/* Activity Rate (Progress Bar/Chart Placeholder) */}
        <View style={styles.activityRateRow}>
          <Text style={styles.activityRateLabel}>Active Rate</Text>
          <Text style={styles.activityRateValue}>{stats.activeRateRounded}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarForeground, { width: `${stats.activeRate}%` }]} />
        </View>

        {/* Chart Placeholder (using Text/View for simplicity without installing heavy libraries) */}
        <View style={styles.chartPlaceholder}>
          <View style={styles.chartBarContainer}>
            {/* Simulate chart with bars */}
            {data.map((value, index) => (
              <View
                key={index}
                style={[
                  styles.chartBar,
                  { height: `${(value / maxActive) * 100}%`, backgroundColor: index === data.length - 1 ? '#007bff' : '#4caf50' }
                ]}
              />
            ))}
          </View>
          {/* Active/Inactive Count */}
          <View style={styles.activityCountRow}>
            <Text style={styles.activityCountText}>Active <Text style={styles.activityCountValue}>{stats.activeUsers}</Text></Text>
            <Text style={styles.activityCountText}>Inactive <Text style={styles.activityCountValue}>{stats.inactiveUsers}</Text></Text>
          </View>
        </View>
      </View>
    );
  });


  // --- MODAL COMPONENTS ---

  // NOTE: View and Delete modals are fine since they don't involve continuous input changes.

  const ViewEmployeeModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={viewModalVisible}
      onRequestClose={() => setViewModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Employee Details</Text>
          {selectedEmployee && (
            <ScrollView style={{ width: '100%' }}>
              <Text style={styles.detailText}><Text style={styles.detailLabel}>ID:</Text> {selectedEmployee.id}</Text>
              <Text style={styles.detailText}><Text style={styles.detailLabel}>Role:</Text> {selectedEmployee.role}</Text>
              <Text style={styles.detailText}><Text style={styles.detailLabel}>Username:</Text> {selectedEmployee.username}</Text>
              <Text style={styles.detailText}><Text style={styles.detailLabel}>Name:</Text> {selectedEmployee.name}</Text>
              <Text style={styles.detailText}><Text style={styles.detailLabel}>Email:</Text> {selectedEmployee.email}</Text>
              <Text style={styles.detailText}><Text style={styles.detailLabel}>Mobile:</Text> {selectedEmployee.mobile}</Text>
              <Text style={styles.detailText}><Text style={styles.detailLabel}>Joining Date:</Text> {selectedEmployee.joiningTime}</Text>
              <Text style={styles.detailText}><Text style={styles.detailLabel}>Status:</Text> {selectedEmployee.status}</Text>
            </ScrollView>
          )}
          <TouchableOpacity
            style={[styles.modalButton, styles.buttonClose]}
            onPress={() => setViewModalVisible(false)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  /**
   * FIX APPLIED HERE:
   * 1. The component is wrapped in React.memo().
   * 2. The setEditedEmployee function now uses the functional update form (prev => ({...prev, name: text}))
   * or a simple merge ({ ...editedEmployee, name: text }) to ensure a clean update 
   * that doesn't trigger unnecessary re-renders in the parent.
   */
  const EditEmployeeModal = React.memo(() => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Edit Employee: {selectedEmployee?.name}</Text>
          {editedEmployee && (
            <ScrollView style={{ width: '100%', paddingHorizontal: 10 }}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.modalInput}
                value={editedEmployee.name}
                onChangeText={text => setEditedEmployee(prev => (prev ? { ...prev, name: text } : null))} // FIX
              />
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.modalInput}
                value={editedEmployee.email}
                onChangeText={text => setEditedEmployee(prev => (prev ? { ...prev, email: text } : null))} // FIX
                keyboardType="email-address"
              />
              <Text style={styles.inputLabel}>Mobile</Text>
              <TextInput
                style={styles.modalInput}
                value={editedEmployee.mobile}
                onChangeText={text => setEditedEmployee(prev => (prev ? { ...prev, mobile: text } : null))} // FIX
                keyboardType="phone-pad"
              />
              <Text style={styles.inputLabel}>Status</Text>
              <TextInput
                style={styles.modalInput}
                value={editedEmployee.status}
                onChangeText={text => setEditedEmployee(prev => (prev ? { ...prev, status: text as 'Active' | 'Inactive' } : null))} // FIX
                placeholder="Active or Inactive"
              />
            </ScrollView>
          )}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonSave]}
              onPress={handleSaveEdit}
            >
              <Text style={styles.textStyle}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonClose]}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  ));
  
  // NOTE: React.memo() should be used on all stateless/pure components that render the same with the same props.
  // We'll apply it to the other functional components as a best practice to prevent potential future issues,
  // although EditEmployeeModal was the most critical one for the input bug.

  const DeleteConfirmationModal = React.memo(() => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={deleteModalVisible}
      onRequestClose={() => setDeleteModalVisible(false)}
    >
      <Pressable style={styles.centeredView} onPress={() => setDeleteModalVisible(false)}>
        <Pressable style={styles.deleteModalBox}>
          <View style={styles.deleteModalHeader}>
            <Text style={styles.deleteModalHeaderText}>Change Department Status</Text>
          </View>
          <View style={styles.deleteModalBody}>
            <Text style={styles.deleteModalBodyText}>
              Are You sure want to delete <Text style={styles.deleteIdText}>{selectedEmployee?.id || 'ID'}</Text>?
            </Text>
          </View>
          <View style={styles.deleteModalFooter}>
            <TouchableOpacity
              style={styles.deleteButtonYes}
              onPress={confirmDelete}
            >
              <Text style={styles.deleteButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButtonNo}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.deleteButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  ));


  // --- MAIN RENDER ---
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Students list </Text>
      <Text style={styles.subtitle}>All entries from ID 1 to {employees.length}</Text>

      <View style={styles.mainContentArea}>
        {/* Left/Main Table Content */}
        <View style={styles.contentCard}>
          {/* Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.addButton} onPress={addStudent}><Icon name="add" size={20} color="#fff" /></TouchableOpacity>
            <View style={styles.searchContainer}>
              <Text style={styles.searchText}>Search:</Text>
              <TextInput
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search..."
              />
            </View>
          </View>

          {/* Table */}
          <ScrollView style={{ width: '100%' }}>
            <View style={{ width: '100%' }}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.headerText, { flex: 0.5 }]}>#</Text>
                <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Profile</Text>
                <Text style={[styles.headerText, { flex: 2 }]}>Role / Username</Text>
                <Text style={[styles.headerText, { flex: 3 }]}>User Info</Text>
                <Text style={[styles.headerText, { flex: 1.5 }]}>Joining Time</Text>
                <Text style={[styles.headerText, { flex: 1 }]}>Status</Text>
                <Text style={[styles.headerText, { flex: 1.5, textAlign: 'center' }]}>Action</Text>
              </View>

              <View style={styles.borderSeparator} />

              <ScrollView style={{ maxHeight: 500 }}>
                {filteredEmployees.map((emp, index) => (
                  <EmployeeRow key={emp.id} employee={emp} isEven={index % 2 === 0} />
                ))}
              </ScrollView>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Showing 1 to {filteredEmployees.length} of {employees.length} entries
            </Text>
          </View>
        </View>

        {/* Right Quick Stats Column (Only visible on larger screens) */}
        {isLargeScreen && (
          <View style={styles.quickStatsColumn}>
            <QuickStatsCard />
            <ActivityOverviewCard />
          </View>
        )}
      </View>

      {/* Modals */}
      <ViewEmployeeModal />
      <EditEmployeeModal />
      <DeleteConfirmationModal />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  // Main Layout Styles
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    padding: 5
  },
  title: { fontSize: 24, fontWeight: '700', color: '#222' },
  subtitle: { fontSize: 14, color: '#0c0909ff', marginBottom: 10 },

  // NEW: Dual-column layout setup
  mainContentArea: {
    flex: 1,
    flexDirection: isLargeScreen ? 'row' : 'column',
  },
  contentCard: {
    flex: isLargeScreen ? 12 : 2, // Takes 3/4ths of the space on large screens
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginRight: isLargeScreen ? 5 : 0, // Space between main card and stats column
    marginBottom: isLargeScreen ? 0 : 1, // Space on small screens
  },
  quickStatsColumn: {
    flex: isLargeScreen ? 2 : 2, // Takes 1/4th of the space on large screens
    flexDirection: 'column',
    minWidth: 250,
  },

  // Controls Styles (Unchanged)
  controlsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' },
  searchText: { marginRight: 5, color: '#222' },
  searchInput: {
    width: 160,
    height: 38,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // Table Styles (Unchanged)
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: { fontWeight: '700', paddingHorizontal: 4, color: '#222' },
  borderSeparator: { height: 1, backgroundColor: '#ddd' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  rowEven: { backgroundColor: '#f7f9fc' },
  cell: { paddingHorizontal: 6, justifyContent: 'center' },
  cellSubText: { fontSize: 12, color: '#888' },
  cellTextBold: { fontWeight: '600', color: '#222' },
  cellTextEmail: { color: '#1e88e5' },
  cellTextMobile: { color: '#009688' },
  actionButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },

  // Footer Styles (Unchanged)
  footer: { paddingTop: 12, borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 15 },
  footerText: { fontSize: 12, color: '#555' },

  // --- NEW: QUICK STATS STYLES ---
  quickStatsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  quickStatsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },
  quickStatBox: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  statLabel: { fontSize: 14, color: '#555', marginBottom: 5 },
  statValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalUsersValue: { fontSize: 28, fontWeight: '900', color: '#333' },

  // Active/Inactive Stats
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  statIconBackground: {
    backgroundColor: '#d4edda', // Light green
    padding: 8,
    borderRadius: 50,
  },
  statDetailValue: { fontSize: 18, fontWeight: '700', color: '#333' },
  statDetailLabel: { fontSize: 12, color: '#777' },
  statPercentage: { fontSize: 18, fontWeight: 'bold' },

  // Quick Actions
  quickActionsContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  quickActionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  quickActionText: {
    marginLeft: 10,
    color: '#007bff',
    fontSize: 14,
  },

  // --- NEW: ACTIVITY OVERVIEW STYLES ---
  activityOverviewContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  activityRateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  activityRateLabel: { fontSize: 14, color: '#555' },
  activityRateValue: { fontSize: 16, fontWeight: '600', color: '#4caf50' },

  progressBarBackground: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginBottom: 15,
  },
  progressBarForeground: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: 4,
  },

  chartPlaceholder: {
    height: 100, // Fixed height for the chart area
    paddingVertical: 10,
  },
  chartBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flex: 1,
  },
  chartBar: {
    width: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  activityCountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  activityCountText: {
    fontSize: 12,
    color: '#555',
  },
  activityCountValue: {
    fontWeight: '700',
    color: '#222',
  },

  // --- GENERAL MODAL STYLES (Unchanged) ---
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
    width: '85%',
    maxWidth: 500, // Added maxWidth for better presentation
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    width: '100%',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonClose: { backgroundColor: '#9e9e9e' },
  buttonSave: { backgroundColor: '#4caf50' },
  textStyle: { color: 'white', fontWeight: '700', textAlign: 'center' },

  // View Modal Specific Styles (Unchanged)
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 4,
  },
  detailLabel: { fontWeight: '600', minWidth: 100 },

  // Edit Modal Specific Styles (Unchanged)
  inputLabel: { marginTop: 10, marginBottom: 5, fontWeight: '500', color: '#222' },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // --- DELETE MODAL STYLES (Unchanged) ---
  deleteModalBox: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  deleteModalHeader: {
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteModalHeaderText: { fontSize: 16, fontWeight: '700', color: '#222' },
  deleteModalBody: { padding: 20, justifyContent: 'center' },
  deleteModalBodyText: { fontSize: 16, color: '#222' },
  deleteIdText: { fontWeight: '700', color: '#e53935' },
  deleteModalFooter: { flexDirection: 'row', justifyContent: 'flex-end', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#f3f3f3' },
  deleteButtonYes: { backgroundColor: '#4caf50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginLeft: 10 },
  deleteButtonNo: { backgroundColor: '#e53935', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginLeft: 10 },
  deleteButtonText: { color: '#fff', fontWeight: '700' },
});

export default EmployeeListScreen;