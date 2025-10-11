import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import ApplyLeaveFormModal from '../components/ApplyLeaveFormModal';
import ViewLeaveModal from '../components/ViewLeaveModal';

// --- 1. Data Types ---
export type LeaveApplication = {
    id: string;
    subject: string;
    leaveDates: string;
    days: number;
    applyDate: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    reason?: string;
    name?: string;
    start_date?: string;
    end_date?: string;
};

// --- Mock Data ---
const MOCK_DATA: LeaveApplication[] = [
    { id: '1', name: 'Rylee Pratt', subject: 'Testing', leaveDates: '08-10-2025 - 09-10-2025', days: 2, applyDate: '07-10-2025', status: 'Approved', reason: 'Some reason for testing.', start_date: '08-10-2025', end_date: '09-10-2025' },
    { id: '2', name: 'John Doe', subject: 'AUTOCAD renew', leaveDates: '27-09-2025 - 27-09-2025', days: 1, applyDate: '27-09-2025', status: 'Pending', reason: '', start_date: '27-09-2025', end_date: '27-09-2025' },
    { id: '3', name: 'Jane Smith', subject: 'arsfdf', leaveDates: '24-09-2025 - 27-09-2025', days: 4, applyDate: '25-09-2025', status: 'Rejected', reason: 'Incomplete information.', start_date: '24-09-2025', end_date: '27-09-2025' },
];

// --- Helper Components ---
const StatusBadge: React.FC<{ status: LeaveApplication['status'] }> = ({ status }) => {
    const style = status === 'Approved' ? styles.statusApproved : (status === 'Pending' ? styles.statusPending : styles.statusRejected);
    return (
        <View style={[styles.statusBadge, style]}>
            <Text style={styles.statusText}>{status}</Text>
        </View>
    );
};

// --- Main Component ---
const ApplyLeaveScreen: React.FC = () => {
    const [data, setData] = useState<LeaveApplication[]>(MOCK_DATA);
    const [searchText, setSearchText] = useState('');
    const [entriesToShow, setEntriesToShow] = useState('10');
    const [showFormModal, setShowFormModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState<LeaveApplication | null>(null);

    const handleSearch = (text: string) => setSearchText(text);

    const handleAddNew = () => setShowFormModal(true);

    const handleRefresh = () => {
        setData([...MOCK_DATA]);
        Alert.alert("Refreshed", "Leave list has been refreshed.");
    };

    const handleViewLeave = (leave: LeaveApplication) => {
        setSelectedLeave(leave);
        setShowViewModal(true);
    };

    const renderHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 0.3 }]}>#</Text>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>Subject</Text>
            <Text style={[styles.headerCell, { flex: 2.2 }]}>Leave Dates</Text>
            <Text style={[styles.headerCell, { flex: 0.8 }]}>Days</Text>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>Apply Date</Text>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>Status</Text>
            <Text style={[styles.headerCell, { flex: 1.8 }]}>Action</Text>
        </View>
    );

    const renderItem = ({ item, index }: { item: LeaveApplication; index: number }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.dataCell, { flex: 0.3 }]}>{index + 1}</Text>
            <Text style={[styles.dataCell, { flex: 1.5, textAlign: 'left' }]}>{item.subject}</Text>
            <Text style={[styles.dataCell, { flex: 2.2 }]}>{item.leaveDates}</Text>
            <Text style={[styles.dataCell, { flex: 0.8 }]}>{item.days}</Text>
            <Text style={[styles.dataCell, { flex: 1.5 }]}>{item.applyDate}</Text>
            <View style={[styles.dataCell, { flex: 1.5 }]}>
                <StatusBadge status={item.status} />
            </View>
            <View style={[styles.dataCell, styles.actionCell, { flex: 1.8 }]}>
                <TouchableOpacity 
                    style={[styles.actionButton, styles.viewButton]}
                    onPress={() => handleViewLeave(item)}
                >
                    <MaterialIcons name="remove-red-eye" size={14} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.actionButton, styles.downloadButton]}
                    onPress={() => console.log('Download:', item.id)}
                >
                    <Ionicons name="download-outline" size={14} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Apply Leave</Text>

            {/* --- Toolbar Section --- */}
            <View style={styles.card}>
                <View style={styles.topToolbar}>
                    <TouchableOpacity style={[styles.toolbarButton, styles.primaryButton]} onPress={handleAddNew}>
                        <FontAwesome5 name="plus" size={14} color="#fff" />
                        <Text style={styles.toolbarButtonText}>Add New</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toolbarButton, styles.secondaryButton]} onPress={handleRefresh}>
                        <Ionicons name="refresh" size={14} color="#000" />
                        <Text style={[styles.toolbarButtonText, { color: '#000' }]}>Refresh</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomToolbar}>
                    <View style={styles.entriesControl}>
                        <Text style={styles.controlText}>Show</Text>
                        <TextInput
                            style={styles.entriesInput}
                            value={entriesToShow}
                            onChangeText={setEntriesToShow}
                            keyboardType="numeric"
                        />
                        <Text style={styles.controlText}>entries</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <Text style={styles.controlText}>Search:</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder=""
                            value={searchText}
                            onChangeText={handleSearch}
                            placeholderTextColor="#888"
                        />
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderHeader}
                        stickyHeaderIndices={[0]}
                        scrollEnabled={false}
                    />
                </View>
            </View>

            {/* --- Apply Leave Modal --- */}
            <ApplyLeaveFormModal 
                isVisible={showFormModal}
                onClose={() => setShowFormModal(false)}
                onSave={(newLeave) => {
                    const newId = (data.length + 1).toString();
                    const fullNewLeave: LeaveApplication = { 
                        ...newLeave, 
                        id: newId, 
                        status: 'Pending', 
                        leaveDates: `${newLeave.start_date} - ${newLeave.end_date}`, 
                    };
                    setData(prev => [fullNewLeave, ...prev]);
                    setShowFormModal(false);
                    Alert.alert("Success", "Leave application saved successfully! Status: Pending");
                }}  onRefresh={handleRefresh}  
            />

            {/* --- View Leave Modal --- */}
            {selectedLeave && (
                <ViewLeaveModal 
                    isVisible={showViewModal}
                    onClose={() => setShowViewModal(false)}
                    leaveData={selectedLeave}
                />
            )}
        </View>
    );
};

// --- Styles (same as original) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa', padding: 16 },
    title: { fontSize: 24, fontWeight: '700', color: '#343a40', marginBottom: 16 },
    card: { backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, padding: 10 },
    topToolbar: { flexDirection: 'row', marginBottom: 10 },
    toolbarButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 4, marginRight: 8 },
    primaryButton: { backgroundColor: '#38bdf8' },
    secondaryButton: { backgroundColor: '#cee0e6', borderWidth: 1, borderColor: '#cee0e6' },
    toolbarButtonText: { color: '#fff', fontWeight: '600', fontSize: 14, marginLeft: 5 },
    bottomToolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
    entriesControl: { flexDirection: 'row', alignItems: 'center' },
    entriesInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, width: 40, height: 30, textAlign: 'center', marginHorizontal: 5, color: '#000', paddingVertical: 0 },
    controlText: { fontSize: 14, color: '#495057' },
    searchContainer: { flexDirection: 'row', alignItems: 'center' },
    searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, width: 120, height: 30, marginLeft: 8, paddingHorizontal: 8, color: '#000', paddingVertical: 0 },
    tableContainer: { marginTop: 10, borderWidth: 1, borderColor: '#e9ecef', borderRadius: 4, overflow: 'hidden' },
    tableHeader: { flexDirection: 'row', backgroundColor: '#e9ecef', borderBottomWidth: 1, borderBottomColor: '#dee2e6' },
    headerCell: { paddingVertical: 12, paddingHorizontal: 4, fontWeight: 'bold', color: '#495057', fontSize: 12, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#dee2e6' },
    tableRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f8f9fa', backgroundColor: '#fff' },
    dataCell: { paddingVertical: 10, paddingHorizontal: 4, fontSize: 12, color: '#495057', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#f8f9fa', flexWrap: 'wrap' },
    statusBadge: { paddingVertical: 3, paddingHorizontal: 6, borderRadius: 15, alignSelf: 'center' },
    statusApproved: { backgroundColor: '#d4edda' },
    statusPending: { backgroundColor: '#fff3cd' },
    statusRejected: { backgroundColor: '#f8d7da' },
    statusText: { fontSize: 12, fontWeight: '600', color: '#155724' },
    actionCell: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
    actionButton: { padding: 5, borderRadius: 4 },
    viewButton: { backgroundColor: '#17a2b8' },
    downloadButton: { backgroundColor: '#adb5bd' },
});

export default ApplyLeaveScreen;
