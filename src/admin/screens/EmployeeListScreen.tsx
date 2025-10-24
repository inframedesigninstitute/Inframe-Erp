import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';

// --- MOCK DATA ---
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

const MOCK_EMPLOYEES: Employee[] = [
  { id: 6, role: 'Reception', username: 'simran21121', name: 'Simran Choudhary', email: 'Simranoffice@gmail.com', mobile: '7500996633', joiningTime: '24-08-2021', status: 'Active' },
  { id: 5, role: 'Peon', username: 'kapil234112', name: 'Kapil', email: 'kapiloffice@gmail.com', mobile: '9897033994', joiningTime: '24-05-2021', status: 'Active' },
  { id: 4, role: 'Driver', username: 'sarvesh12923', name: 'Sarvesh Kumar', email: 'sarveshseema@gmail.com', mobile: '9897033994', joiningTime: '16-08-2021', status: 'Active' },
];

// --- ACTION HANDLERS ---
const handleView = (employee: Employee) => Alert.alert('View Employee', `Viewing details for ${employee.name}`);
const handleEdit = (employee: Employee) => Alert.alert('Edit Employee', `Preparing to edit ${employee.name}`);
const handleDelete = (employee: Employee) =>
  Alert.alert('Delete Employee', `Are you sure you want to delete ${employee.name}?`, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: () => console.log(`Deleted ${employee.name}`) },
  ]);

// --- EMPLOYEE ROW ---
const EmployeeRow: React.FC<{ employee: Employee; isEven: boolean }> = ({ employee, isEven }) => (
  <View style={[styles.row, isEven && styles.rowEven]}>
    <Text style={[styles.cell, { width: 30 }]}>{employee.id}</Text>
    <View style={[styles.cell, styles.profileCell]}>
      <Icon name="person-circle-outline" size={40} color="#6c757d" />
    </View>
    <View style={[styles.cell, { flex: 1.5 }]}>
      <Text>{employee.role}</Text>
      <Text style={styles.cellSubText}>{employee.username}</Text>
    </View>
    <View style={[styles.cell, { flex: 3 }]}>
      <Text>Name: <Text style={styles.cellTextBold}>{employee.name}</Text></Text>
      <Text>Email: <Text style={styles.cellTextEmail}>{employee.email}</Text></Text>
      <Text>Mobile: <Text style={styles.cellTextMobile}>{employee.mobile}</Text></Text>
    </View>
    <View style={[styles.cell, { flex: 1.5 }]}>{employee.joiningTime}</View>
    <View style={[styles.cell, { width: 60 }]}>{employee.status}</View>
    <View style={[styles.cell, styles.actionCell]}>
      <TouchableOpacity onPress={() => handleView(employee)} style={styles.actionButton}><Feather name="eye" size={16} color="#007bff" /></TouchableOpacity>
      <TouchableOpacity onPress={() => handleEdit(employee)} style={styles.actionButton}><Feather name="edit" size={16} color="#007bff" /></TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(employee)} style={styles.actionButton}><Feather name="trash-2" size={16} color="#dc3545" /></TouchableOpacity>
    </View>
  </View>
);

// --- MAIN COMPONENT ---
const EmployeeListScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Employees</Text>
      <Text style={styles.subtitle}>All employees you have created so far.</Text>

      <View style={styles.contentCard}>
        {/* Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.addButton}><Icon name="add" size={20} color="#fff" /></TouchableOpacity>
          <View style={styles.searchContainer}>
            <Text style={styles.searchText}>Search:</Text>
            <View style={styles.searchInput} />
          </View>
        </View>

        {/* Table */}
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.headerText, { width: 30 }]}>#</Text>
              <Text style={[styles.headerText, styles.profileCell]}>Profile</Text>
              <Text style={[styles.headerText, { flex: 1.5 }]}>Role / Username</Text>
              <Text style={[styles.headerText, { flex: 3 }]}>User Info</Text>
              <Text style={[styles.headerText, { flex: 1.5 }]}>Joining Time</Text>
              <Text style={[styles.headerText, { width: 60 }]}>Status</Text>
              <Text style={[styles.headerText, styles.actionCell]}>Action</Text>
            </View>

            <View style={styles.borderSeparator} />

            <ScrollView style={{ maxHeight: 400 }}>
              {MOCK_EMPLOYEES.map((emp, index) => (
                <EmployeeRow key={emp.id} employee={emp} isEven={index % 2 === 0} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Showing 1 to {MOCK_EMPLOYEES.length} of {MOCK_EMPLOYEES.length} entries
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 10 },
  title: { fontSize: 24, fontWeight: '600', color: '#343a40' },
  subtitle: { fontSize: 14, color: '#6c757d', marginBottom: 10 },
  contentCard: { flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 10 },
  controlsRow: { flexDirection: 'row', marginBottom: 10 },
  addButton: { backgroundColor: '#007bff', padding: 6, borderRadius: 4, marginRight: 10 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' },
  searchText: { marginRight: 5 },
  searchInput: { width: 150, height: 30, borderWidth: 1, borderColor: '#ced4da', borderRadius: 4 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#f2f2f2', alignItems: 'center', paddingVertical: 8 },
  headerText: { fontWeight: 'bold', paddingHorizontal: 8 },
  borderSeparator: { height: 1, backgroundColor: '#dee2e6' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#dee2e6' },
  rowEven: { backgroundColor: '#ffffff' },
  cell: { paddingHorizontal: 8, justifyContent: 'center' },
  profileCell: { width: 60, alignItems: 'center' },
  actionCell: { width: 80, flexDirection: 'row', justifyContent: 'space-between' },
  cellSubText: { fontSize: 12, color: '#6c757d' },
  cellTextBold: { fontWeight: '600' },
  cellTextEmail: { color: '#007bff' },
  cellTextMobile: { color: '#17a2b8' },
  actionButton: { padding: 4, borderRadius: 4, backgroundColor: '#e9ecef' },
  footer: { paddingTop: 10 },
  footerText: { fontSize: 12, color: '#6c757d' },
});

export default EmployeeListScreen;
