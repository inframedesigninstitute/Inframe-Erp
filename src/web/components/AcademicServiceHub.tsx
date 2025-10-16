import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Get screen width for responsive layout
const { width } = Dimensions.get('window');

// --- 1. Data Structures ---

type ServiceStatus = 'Pending' | 'Paid' | 'Processing' | 'Completed';

interface ServiceRequest {
    id: number;
    serviceName: string;
    fees: number;
    status: ServiceStatus;
    dateRequested: string;
}

// Mock Data (Final Data Set based on requirements)
const mockRequests: ServiceRequest[] = [
    { 
        id: 1, 
        serviceName: 'Final Transcript / All Marks Document', 
        fees: 500, 
        status: 'Pending', 
        dateRequested: '20 May, 2024' 
    },
    { 
        id: 2, 
        serviceName: 'Migration Certificate Application', 
        fees: 750, 
        status: 'Pending', 
        dateRequested: '20 May, 2024' 
    },
    { 
        id: 3, 
        serviceName: 'T.C. / C.C. Application Form', 
        fees: 200, 
        status: 'Paid', 
        dateRequested: '20 May, 2024' 
    },
    { 
        id: 4, 
        serviceName: 'Semester Marksheets (All Sem)', 
        fees: 300, 
        status: 'Processing', 
        dateRequested: '20 May, 2024' 
    },
    { 
        id: 5, 
        serviceName: 'Degree Certificate (2024)', 
        fees: 0, 
        status: 'Completed', 
        dateRequested: '20 May, 2024' 
    },
];

// Calculate Summary Data
const totalPendingFees = mockRequests
    .filter(r => r.status === 'Pending')
    .reduce((sum, r) => sum + r.fees, 0);

const activeRequests = mockRequests
    .filter(r => r.status === 'Pending' || r.status === 'Processing').length;

const documentsReady = mockRequests
    .filter(r => r.status === 'Completed').length;


// --- 2. Helper Components ---

// Status Badge Component (Renders the colored dot and text)
const StatusBadge: React.FC<{ status: ServiceStatus }> = ({ status }) => {
    let color: string;
    let icon: string;

    switch (status) {
        case 'Pending':
            color = '#E91E63'; // Pink/Red
            icon = '●';
            break;
        case 'Paid':
            color = '#FFB300'; // Yellow
            icon = '◉';
            break;
        case 'Processing':
            color = '#FF9800'; // Orange
            icon = '◌';
            break;
        case 'Completed':
            color = '#4CAF50'; // Green
            icon = '✓';
            break;
    }

    return (
        <View style={badgeStyles.container}>
            <Text style={[badgeStyles.text, { color }]}>
                {icon} {status}
            </Text>
        </View>
    );
};

// Summary Card Component (Renders the top summary boxes)
interface SummaryCardProps {
    title: string;
    value: number | string;
    bgColor: string;
    valueColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, bgColor, valueColor }) => (
    <View style={[cardStyles.summaryCard, { backgroundColor: bgColor }]}>
        <Text style={[cardStyles.summaryValue, { color: valueColor }]}>
            {typeof value === 'number' ? `₹ ${value.toLocaleString('en-IN')}` : value}
        </Text>
        <Text style={cardStyles.summaryTitle}>{title}</Text>
    </View>
);


// --- 3. Main Component: AcademicServiceHub ---

const AcademicServiceHub: React.FC = () => {
    const [requests, setRequests] = useState(mockRequests);

    const handlePayNow = (id: number, fees: number) => {
        // Functionality: Handles the payment process
        Alert.alert(
            'Payment Required',
            `Do you want to proceed and pay ₹ ${fees.toLocaleString('en-IN')} now?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Pay', 
                    onPress: () => {
                        // Simulate payment and update status to 'Paid'
                        setRequests(prev => prev.map(r => 
                            r.id === id ? { ...r, status: 'Paid' } : r
                        ));
                        Alert.alert('Success', `Payment successful for request ${id}!`);
                    } 
                }
            ]
        );
    };

    const handleAction = (request: ServiceRequest) => {
        // Functionality: Routes the user based on request status
        if (request.status === 'Pending') {
            handlePayNow(request.id, request.fees);
        } else if (request.status === 'Completed') {
            Alert.alert('Download', `Downloading document for ${request.serviceName}`);
        } else {
            Alert.alert('Track Status', `Checking detailed status for ${request.serviceName}.`);
        }
    };

    const renderActionButton = (request: ServiceRequest) => {
        // Functionality: Renders the correct button based on status
        let label = 'View Status';
        let bgColor = '#007BFF'; // Blue
        let icon = 'ⓘ';

        if (request.status === 'Pending') {
            label = 'Pay Now';
            bgColor = '#007BFF'; // Blue for payment
            icon = '💳';
        } else if (request.status === 'Completed') {
            label = 'Download Doc';
            bgColor = '#28A745'; // Green for download
            icon = '⬇';
        } else if (request.status === 'Paid' || request.status === 'Processing') {
            label = 'Track Status';
            bgColor = '#6C757D'; // Grey for viewing status
            icon = '◎';
        }

        return (
            <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: bgColor }]} 
                onPress={() => handleAction(request)}
            >
                <Text style={styles.actionButtonText}>{icon} {label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        // The main ScrollView allows the table to scroll if it gets long
        <ScrollView style={styles.outerContainer} contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
                
                {/* --- Card Header --- */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🎓 Academic Service Hub</Text>
                    <TouchableOpacity style={styles.newRequestButton} onPress={() => Alert.alert('Apply', 'Redirecting to new application form...')}>
                        <Text style={styles.newRequestButtonText}>+ Apply for New Document</Text>
                    </TouchableOpacity>
                </View>

                {/* --- Quick Summary Cards --- */}
                <View style={styles.summaryContainer}>
                    <SummaryCard 
                        title="Total Pending Fees" 
                        value={totalPendingFees} 
                        bgColor="#FADBD8" // Light Red
                        valueColor="#E74C3C" 
                    />
                    <SummaryCard 
                        title="Active Requests" 
                        value={activeRequests} 
                        bgColor="#FCF3CF" // Light Yellow
                        valueColor="#F39C12" 
                    />
                    <SummaryCard 
                        title="Documents Ready" 
                        value={documentsReady} 
                        bgColor="#D4EFDF" // Light Green
                        valueColor="#27AE60" 
                    />
                </View>

                {/* --- Service Table --- */}
                <Text style={styles.tableTitle}>Service Requests</Text>
                
                {/* Table Header */}
                <View style={styles.tableHeaderRow}>
                    <Text style={[styles.headerCell, { flex: 4 }]}>Service</Text>
                    <Text style={[styles.headerCell, styles.centerText, { flex: 1.5 }]}>Fees (₹)</Text>
                    <Text style={[styles.headerCell, styles.centerText, { flex: 1.5 }]}>Date</Text>
                    <Text style={[styles.headerCell, styles.centerText, { flex: 2.5 }]}>Status</Text>
                    <Text style={[styles.headerCell, styles.centerText, { flex: 3 }]}>Action</Text>
                </View>

                {/* Table Rows */}
                {requests.map((request) => (
                    <View key={request.id} style={styles.tableRow}>
                        <Text style={[styles.dataCell, { flex: 4 }]}>{request.serviceName}</Text>
                        <Text style={[styles.dataCell, styles.feesCell, styles.centerText, { flex: 1.5 }]}>
                            {request.fees.toLocaleString('en-IN')}
                        </Text>
                        <Text style={[styles.dataCell, styles.dateCell, styles.centerText, { flex: 1.5 }]}>
                            {request.dateRequested}
                        </Text>
                        <View style={[styles.dataCell, styles.centerContent, { flex: 2.5 }]}>
                            <StatusBadge status={request.status} />
                        </View>
                        <View style={[styles.dataCell, styles.centerContent, { flex: 3 }]}>
                            {renderActionButton(request)}
                        </View>
                    </View>
                ))}
            </View>
            {/* Added spacing at the bottom of the content */}
            <View style={{ height: 50 }} />
        </ScrollView>
    );
};

// --- 4. Styling ---

const styles = StyleSheet.create({
    outerContainer: {
        // Set flex: 1 if this is the main component on the screen
        flex: 1, 
        backgroundColor: '#f5f7fa', // Light background outside the main card
    },
    scrollContent: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    
    // Header Styles
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#333',
    },
    newRequestButton: {
        backgroundColor: '#17A2B8', // Teal/Cyan Blue
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    newRequestButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },

    // Summary Card Container Styles
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },

    // Table Styles
    tableHeaderRow: {
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#dee2e6',
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#343a40',
        paddingHorizontal: 5,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
    },
    dataCell: {
        fontSize: 13,
        color: '#495057',
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    feesCell: {
        fontWeight: '600',
        color: '#007BFF',
    },
    dateCell: {
        color: '#6C757D',
        fontSize: 11,
    },
    centerText: {
        textAlign: 'center',
    },
    centerContent: {
        alignItems: 'center',
    },

    // Action Button Styles
    actionButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        alignSelf: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
});

const cardStyles = StyleSheet.create({
    summaryCard: {
        width: width * 0.25, // Responsive width (approx. 1/3rd of the screen)
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // Note: Individual card background colors are passed via props
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 5,
    },
    summaryTitle: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
});

const badgeStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    text: {
        fontSize: 12,
        fontWeight: '700',
    },
});

export default AcademicServiceHub;