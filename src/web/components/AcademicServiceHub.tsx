import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TranscriptPreRegistrationForm from './TranscriptPreRegistrationForm';

const { width } = Dimensions.get('window');

type ServiceStatus = 'Pending' | 'Paid' | 'Processing' | 'Completed';

interface ServiceRequest {
    id: number;
    serviceName: string;
    fees: number;
    status: ServiceStatus;
    dateRequested: string;
}

const mockRequests: ServiceRequest[] = [
    { id: 1, serviceName: 'Final Transcript / All Marks Document', fees: 500, status: 'Pending', dateRequested: '20 May, 2024' },
    { id: 2, serviceName: 'Migration Certificate Application', fees: 750, status: 'Pending', dateRequested: '20 May, 2024' },
    { id: 3, serviceName: 'T.C. / C.C. Application Form', fees: 200, status: 'Paid', dateRequested: '20 May, 2024' },
    { id: 4, serviceName: 'Semester Marksheets (All Sem)', fees: 300, status: 'Processing', dateRequested: '20 May, 2024' },
    { id: 5, serviceName: 'Degree Certificate (2024)', fees: 0, status: 'Completed', dateRequested: '20 May, 2024' },
];

const totalPendingFees = mockRequests.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.fees, 0);
const activeRequests = mockRequests.filter(r => r.status === 'Pending' || r.status === 'Processing').length;
const documentsReady = mockRequests.filter(r => r.status === 'Completed').length;

// --- Status Badge ---
const StatusBadge: React.FC<{ status: ServiceStatus }> = ({ status }) => {
    let color: string, icon: string;
    switch (status) {
        case 'Pending': color = '#E91E63'; icon = '●'; break;
        case 'Paid': color = '#FFB300'; icon = '◉'; break;
        case 'Processing': color = '#FF9800'; icon = '◌'; break;
        case 'Completed': color = '#4CAF50'; icon = '✓'; break;
    }
    return (
        <View style={[badgeStyles.container, { backgroundColor: `${color}33` /* translucent */ }]}>
            <Text style={[badgeStyles.text, { color }]}>{icon} {status}</Text>
        </View>
    );
};

// --- Summary Card ---
interface SummaryCardProps {
    title: string;
    value: number | string;
    bgColor: string;
    valueColor: string;
}
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, bgColor, valueColor }) => (
    <View style={[cardStyles.summaryCard, { backgroundColor: bgColor }]}>
        <Text style={[cardStyles.summaryValue, { color: valueColor }]}>{typeof value === 'number' ? `₹ ${value.toLocaleString('en-IN')}` : value}</Text>
        <Text style={cardStyles.summaryTitle}>{title}</Text>
    </View>
);

// --- Academic Service Hub ---
const AcademicServiceHub: React.FC = () => {
    const [requests, setRequests] = useState(mockRequests);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handlePayNow = (id: number, fees: number) => {
        Alert.alert(
            'Payment Required',
            `Do you want to proceed and pay ₹ ${fees.toLocaleString('en-IN')} now?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Pay', onPress: () => {
                    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Paid' } : r));
                    Alert.alert('Success', `Payment successful for request ${id}!`);
                }}
            ]
        );
    };

    const handleAction = (request: ServiceRequest) => {
        if (request.status === 'Pending') handlePayNow(request.id, request.fees);
        else if (request.status === 'Completed') Alert.alert('Download', `Downloading document for ${request.serviceName}`);
        else Alert.alert('Track Status', `Checking detailed status for ${request.serviceName}.`);
    };

    const renderActionButton = (request: ServiceRequest) => {
        let label = 'View Status', bgColor = '#007BFF', icon = 'ⓘ';
        if (request.status === 'Pending') { label = 'Pay Now'; bgColor = '#17A2B8'; icon = '💳'; }
        else if (request.status === 'Completed') { label = 'Download'; bgColor = '#28A745'; icon = '⬇'; }
        else { label = 'Track'; bgColor = '#6C757D'; icon = '◎'; }

        return (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: bgColor }]} onPress={() => handleAction(request)}>
                <Text style={styles.actionButtonText}>{icon} {label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.outerContainer} contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🎓 Academic Service Hub</Text>
                    <TouchableOpacity style={styles.newRequestButton} onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.newRequestButtonText}>+ Apply New</Text>
                    </TouchableOpacity>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryContainer}>
                    <SummaryCard title="Total Pending Fees" value={totalPendingFees} bgColor="#FADBD8" valueColor="#E74C3C"  />
                    <SummaryCard title="Active Requests" value={activeRequests} bgColor="#FCF3CF" valueColor="#F39C12" />
                    <SummaryCard title="Documents Ready" value={documentsReady} bgColor="#D4EFDF" valueColor="#27AE60" />
                </View>

                {/* Service Table */}
                <Text style={styles.tableTitle}>Service Requests</Text>
                <View style={styles.tableHeaderRow}>
                    <Text style={[styles.headerCell, { flex: 4 }]}>Service</Text>
                    <Text style={[styles.headerCell, styles.centerText, { flex: 1.5 }]}>Fees (₹)</Text>
                    <Text style={[styles.headerCell, styles.centerText, { flex: 1.5 }]}>Date</Text>
                    <Text style={[styles.headerCell, styles.centerText, { flex: 2.5 }]}>Status</Text>
                    <Text style={[styles.headerCell, styles.centerText, { flex: 3 }]}>Action</Text>
                </View>

                {requests.map(request => (
                    <View key={request.id} style={styles.tableRow}>
                        <Text style={[styles.dataCell, { flex: 4 }]}>{request.serviceName}</Text>
                        <Text style={[styles.dataCell, styles.feesCell, styles.centerText, { flex: 1.5 }]}>{request.fees.toLocaleString('en-IN')}</Text>
                        <Text style={[styles.dataCell, styles.dateCell, styles.centerText, { flex: 1.5 }]}>{request.dateRequested}</Text>
                        <View style={[styles.dataCell, styles.centerContent, { flex: 2.5 }]}><StatusBadge status={request.status} /></View>
                        <View style={[styles.dataCell, styles.centerContent, { flex: 3 }]}>{renderActionButton(request)}</View>
                    </View>
                ))}
            </View>

            <View style={{ height: 50 }} />

            <TranscriptPreRegistrationForm isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </ScrollView>
    );
};

// --- Styles (3D Professional Look) ---
const styles = StyleSheet.create({
    outerContainer: { flex: 1, backgroundColor: '#f0f2f5' },
    scrollContent: { padding: 20 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: { fontSize: 22, fontWeight: '800', color: '#333' },
    newRequestButton: { backgroundColor: '#17A2B8', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 6 },
    newRequestButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
    summaryContainer: {flexDirection:"row", width:"20%", marginBottom: 30 },
    tableTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15 },
    tableHeaderRow: { flexDirection: 'row', backgroundColor: '#f8f9fa', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#dee2e6' },
    headerCell: { fontWeight: 'bold', fontSize: 14, color: '#343a40', paddingHorizontal: 5 },
    tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#c9c7c7ff', alignItems: 'center', backgroundColor: '#fff', marginBottom: 8, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
    dataCell: { fontSize: 14, color: '#000000ff', paddingHorizontal: 5, justifyContent: 'center' },
    feesCell: { fontWeight: '600', color: '#0a0b0cff' },
    dateCell: { color: '#6C757D', fontSize: 11 },
    centerText: { textAlign: 'center' },
    centerContent: { alignItems: 'center' },
    actionButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 4 },
    actionButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});

const cardStyles = StyleSheet.create({
    summaryCard: { width: 250,margin:10, padding: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    summaryValue: { fontSize: 18, fontWeight: '800', marginBottom: 5 },
    summaryTitle: { fontSize: 12, color: '#333', fontWeight: '500' },
});

const badgeStyles = StyleSheet.create({
    container: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 },
    text: { fontSize: 12, fontWeight: '700' },
});

export default AcademicServiceHub;
