import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Row, Table } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Feather';

// --- Type Definitions ---
interface LeaveRequest {
    id: string;
    studentId: string;
    name: string;
    leaveDates: string;
    days: number;
    applyDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    reason: 'Emergency' | 'Family event' | 'Travel' | 'No'; 
}

// --- Data Structure and Constants ---

const initialData: LeaveRequest[] = [
    { id: '1', studentId: '#1014', name: 'Rylee Pratt', leaveDates: '24-10-2024 - 25-10-2025', days: 2, applyDate: '26-10-2024', status: 'Approved', reason: 'Emergency' },
    { id: '2', studentId: '#1015', name: 'Rylex Pratt', leaveDates: '26-10-2024 - 26-10-2025', days: 2, applyDate: '26-10-2024', status: 'Approved', reason: 'Emergency' },
    { id: '3', studentId: '#1016', name: 'Alex Chen', leaveDates: '26-10-2024 - 26-10-2025', days: 2, applyDate: '26-10-2024', status: 'Approved', reason: 'Emergency' },
    { id: '4', studentId: '#1016', name: 'Alex Chen', leaveDates: '27-10-2025 - 27-10-2025', days: 2, applyDate: '26-10-2024', status: 'Pending', reason: 'Family event' },
    { id: '5', studentId: '#1017', name: 'Ben Carter', leaveDates: '28-10-2025 - 29-10-2025', days: 2, applyDate: '26-10-2024', status: 'Rejected', reason: 'Emergency' },
    { id: '6', studentId: '#1018', name: 'Mia Patel', leaveDates: '27-10-2025 - 27-10-2025', days: 2, applyDate: '26-10-2024', status: 'Pending', reason: 'Travel' },
    { id: '7', studentId: '#1017', name: 'Ben Carter', leaveDates: '26-10-2025 - 26-10-2025', days: 2, applyDate: '26-10-2024', status: 'Pending', reason: 'No' },
];

const tableHead = ['#', 'Student ID', 'Name', 'Leave Dates', 'Days', 'Apply Date', 'Status', 'Action'];
const widthArr = [30, 80, 80, 150, 40, 70, 70, 90]; 
const totalTableWidth = widthArr.reduce((sum, width) => sum + width, 0); 

// --- Custom Cell Renderers ---

const getStatusColor = (status: LeaveRequest['status'] | LeaveRequest['reason']): string => {
    switch (status) {
        case 'Approved':
            return '#2ecc71';
        case 'Rejected':
            return '#e74c3c';
        case 'Pending':
        case 'No':
            return '#f1c40f'; // Pending/Generic yellow
        case 'Family event':
        case 'Travel':
        case 'Emergency':
            return '#3498db'; // Custom reason blue
        default:
            return '#95a5a6';
    }
};

const CustomStatusElement = (item: LeaveRequest) => {
    const badgeText = item.status === 'Pending' ? item.reason : item.status;
    const badgeStatus = item.status === 'Pending' ? item.reason : item.status;
    const color = getStatusColor(badgeStatus);

    return (
        <View style={[styles.statusBadge, { backgroundColor: color }]}>
            <Text style={styles.statusText}>{badgeText}</Text>
        </View>
    );
};

const ActionElement = (data: LeaveRequest, handleAction: (id: string, action: 'view' | 'approve' | 'reject') => void) => (
  <View style={styles.actionContainer}>
    {/* View Button (Blue question mark in image) */}
    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3498db' }]} onPress={() => handleAction(data.id, 'view')}>
      <Icon name="help-circle" size={16} color="#fff" />
    </TouchableOpacity>
    
    {/* Delete/Action Buttons */}
    {data.status === 'Pending' ? (
      <>
        {/* Reject/X icon */}
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#e74c3c' }]} onPress={() => handleAction(data.id, 'reject')}>
          <Icon name="x" size={16} color="#fff" />
        </TouchableOpacity>
        {/* Settings/Gear icon for more actions */}
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#bdc3c7' }]} onPress={() => Alert.alert('More Actions', `Opening settings for ${data.id}`)}>
          <Icon name="settings" size={16} color="#fff" />
        </TouchableOpacity>
      </>
    ) : (
        // Trash icon for Approved/Rejected records
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#e74c3c' }]} onPress={() => Alert.alert('Delete', `Delete record ${data.id}?`)}>
            <Icon name="trash" size={16} color="#fff" />
        </TouchableOpacity>
    )}
  </View>
);

// --- Main Component ---

const ManageLeaveScreen: React.FC = () => {
    const [data, setData] = useState<LeaveRequest[]>(initialData);

    const handleAction = (id: string, action: 'view' | 'approve' | 'reject') => {
        switch (action) {
            case 'view':
                Alert.alert('View Details', `Viewing detailed request for ID: ${id}`);
                break;
            case 'approve':
                Alert.alert('Confirm Approval', `Are you sure you want to APPROVE request ${id}?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Yes, Approve', onPress: () => updateStatus(id, 'Approved') },
                ]);
                break;
            case 'reject':
                Alert.alert('Confirm Rejection', `Are you sure you want to REJECT request ${id}?`, [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Yes, Reject', onPress: () => updateStatus(id, 'Rejected') },
                ]);
                break;
        }
    };

    const updateStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
        setData(prevData =>
            prevData.map(req => (req.id === id ? { ...req, status: newStatus } : req))
        );
    };

    const tableData = data.map((item, index) => [
        <Text key={`#${item.id}`} style={styles.textCell}>{index + 1}</Text>,
        <Text key={`id${item.id}`} style={styles.textCell}>{item.studentId}</Text>,
        <Text key={`name${item.id}`} style={styles.textCell}>{item.name}</Text>,
        <Text key={`dates${item.id}`} style={styles.textCell}>{item.leaveDates}</Text>,
        <Text key={`days${item.id}`} style={styles.textCell}>{item.days}</Text>,
        <Text key={`apply${item.id}`} style={styles.textCell}>{item.applyDate}</Text>,
        CustomStatusElement(item),
        ActionElement(item, handleAction),
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon name="feather" size={24} color="#1abc9c" /> 
                <Text style={styles.headerText}>Student Leave Portal</Text>
            </View>

            <ScrollView contentContainerStyle={styles.mainScrollContent} horizontal={false}>
                <View style={styles.mainCard}> 
                    <View style={styles.cardTitleRow}>
                        <Text style={styles.cardTitle}>Manage Leave Requests</Text>
                        <Icon name="menu" size={24} color="#ecf0f1" />
                    </View>

                    {/* --- Filters/Search Section --- */}
                    <View style={styles.filterBar}>
                        {/* Filter Group 1: Status */}
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterLabel}>Status</Text>
                            <TextInput placeholder="All" placeholderTextColor="#bdc3c7" style={styles.filterInput} />
                        </View>
                        
                        {/* Filter Group 2: Status (Duplicate filter for styling accuracy) */}
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterLabel}>Status</Text>
                            <TextInput placeholder="All" placeholderTextColor="#bdc3c7" style={styles.filterInput} />
                        </View>

                        {/* Filter Group 3: Days and To Date (Date inputs are simplified to TextInput) */}
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterLabel}>Days</Text>
                            <TextInput placeholder="20/25/2024" placeholderTextColor="#bdc3c7" style={styles.filterInput} />
                        </View>
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterLabel}>To Date</Text>
                            <TextInput placeholder="26-10-2024" placeholderTextColor="#bdc3c7" style={styles.filterInput} />
                            {/* Icon is positioned outside the TextInput for visual accuracy */}
                            <Icon name="calendar" size={16} color="#bdc3c7" style={styles.calendarIcon} />
                        </View>

                        {/* Apply Filters Button */}
                        <TouchableOpacity style={styles.applyButton} onPress={() => Alert.alert('Filter Applied', 'Applying filters...')}>
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>

                    {/* --- Table Section --- */}
                    {/* Inner Horizontal ScrollView to contain the wide table */}
                    <ScrollView horizontal={true}> 
                        <View style={[styles.tableWrapper, { width: totalTableWidth }]}> 
                            <Table borderStyle={{ borderWidth: 0 }}>
                                {/* Table Header */}
                                <Row
                                    data={tableHead}
                                    widthArr={widthArr}
                                    style={styles.tableHeaderStyle}
                                    textStyle={styles.tableHeaderText}
                                />
                                
                                {/* Table Rows */}
                                {tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={widthArr}
                                        style={index % 2 ? styles.tableRowOdd : styles.tableRowEven}
                                    />
                                ))}
                            </Table>
                        </View>
                    </ScrollView>


                    {/* --- Pagination Bar --- */}
                    <View style={styles.paginationBar}>
                        <Text style={styles.paginationText}>
                            Showing 1 to {tableData.length} of {initialData.length * 2 + 1} entries
                        </Text>
                        
                        <View style={styles.pageButtonRow}>
                            <TouchableOpacity style={styles.pageButton} onPress={() => { /* Prev logic */ }}>
                                <Text style={styles.pageButtonText}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.pageButton, styles.pageButtonActive]}>
                                <Text style={styles.pageButtonText}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pageButton}>
                                <Text style={styles.pageButtonText}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pageButton}>
                                <Text style={styles.pageButtonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- Stylesheet for ManageLeaveScreen ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5', 
    },
    mainScrollContent: {
        paddingBottom: 20,
    },
    // Header
    headerContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#333',
        marginLeft: 10,
    },
    // Main Card
    mainCard: {
        margin: 20,
        backgroundColor: '#2c3e50', 
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 5,
        overflow: 'hidden',
    },
    cardTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 20,
        backgroundColor: '#2c3e50',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ecf0f1', 
    },
    // Filter Bar
    filterBar: {
        padding: 15,
        paddingHorizontal: 20,
        backgroundColor: '#34495e', 
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: '#445a70',
    },
    filterGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 10,
    },
    filterLabel: {
        color: '#bdc3c7',
        fontSize: 14,
        marginRight: 8,
    },
    filterInput: {
        height: 35,
        minWidth: 100,
        paddingHorizontal: 10,
        backgroundColor: '#4a637a',
        borderRadius: 6,
        color: '#ecf0f1',
        fontSize: 14,
    },
    calendarIcon: {
        marginLeft: -25, 
        position: 'absolute', 
        right: 5,
    },
    applyButton: {
        backgroundColor: '#1abc9c', 
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto', 
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    // Table Styles
    tableHeaderStyle: { 
        height: 40, 
        backgroundColor: '#34495e',
    },
    tableHeaderText: { 
        margin: 6, 
        fontWeight: 'bold', 
        color: '#ecf0f1', 
        fontSize: 12, 
        textAlign: 'center',
    },
    tableWrapper: {
        borderWidth: 0,
        marginTop: 5,
    },
    tableRowOdd: { 
        height: 45, 
        backgroundColor: '#2c3e50',
    },
    tableRowEven: { 
        height: 45, 
        backgroundColor: '#34495e',
    },
    textCell: {
        margin: 'auto',
        fontSize: 13,
        color: '#ecf0f1',
        textAlign: 'center',
    },
    // Status Badge (Dynamic background color is set inline using the helper function)
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        alignSelf: 'center',
    },
    statusText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    // Action Buttons
    actionButton: {
        width: 25,
        height: 25,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    // Pagination
    paginationBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: '#2c3e50',
        borderTopWidth: 1,
        borderTopColor: '#445a70',
    },
    paginationText: {
        color: '#bdc3c7',
        fontSize: 13,
    },
    pageButtonRow: {
        flexDirection: 'row',
    },
    pageButton: {
        backgroundColor: '#34495e',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    pageButtonActive: {
        backgroundColor: '#3498db',
    },
    pageButtonText: {
        color: '#fff',
        fontSize: 13,
    },
});

export default ManageLeaveScreen;