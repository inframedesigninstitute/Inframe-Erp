import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Interfaces for Type Safety ---

interface FeeRecord {
    id: number;
    session: string;
    semester: string;
    feesType: string;
    fee: number;
    discount: number;
    fine: number;
    netAmount: number;
    dueDate: string;
    status: 'Pending' | 'Paid';
    payDate: string | null;
}

// --- Mock Data ---

const mockFeesData: FeeRecord[] = [
    {
        id: 1,
        session: 'Spring-2022',
        semester: '1st Semester 2018',
        feesType: 'Paper Fund',
        fee: 200.0,
        discount: 0.0,
        fine: 0.0,
        netAmount: 200.0,
        dueDate: '05-10-2025',
        status: 'Pending',
        payDate: null,
    },
    {
        id: 2,
        session: 'Spring-2022',
        semester: '1st Semester 2018',
        feesType: 'Exam Fees',
        fee: 350.0,
        discount: 0.0,
        fine: 0.0,
        netAmount: 350.0,
        dueDate: '30-09-2024',
        status: 'Pending',
        payDate: null,
    },
    {
        id: 3,
        session: 'Fall-2021',
        semester: '2nd Semester 2017',
        feesType: 'Semester Fees',
        fee: 2000.0,
        discount: 200.0,
        fine: 0.0,
        netAmount: 1800.0,
        dueDate: '20-10-2022',
        status: 'Paid',
        payDate: '04-10-2022',
    },
    {
        id: 4,
        session: 'Spring-2022',
        semester: '1st Semester 2018',
        feesType: 'Hostel Fees',
        fee: 5000.0,
        discount: 0.0,
        fine: 50.0,
        netAmount: 5050.0,
        dueDate: '15-08-2024',
        status: 'Pending',
        payDate: null,
    },
];

const screenWidth = Dimensions.get('window').width;

// Define column flex widths for the table (12 columns total)
const columnFlex = [0.5, 1.5, 2.5, 2.5, 1.5, 1.5, 1.5, 2, 2, 1.5, 2, 2.5];

const tableHeader = [
    '#',
    'Session',
    'Semester',
    'Fees Type',
    'Fee',
    'Discount',
    'Fine',
    'Net Amount',
    'Due Date',
    'Status',
    'Pay Date',
    'Action',
];

// --- UPDATED Dropdown Component with Title ---
interface SelectProps {
    title: string;
    value: string;
    // For demo purposes, we flip between 'All' and a mock session/semester/feesType
    onSelect: (val: string) => void; 
}

const FilterSelect: React.FC<SelectProps> = ({ title, value, onSelect }) => {
    // Determine the next value for demonstration
    const getNextValue = (currentTitle: string, currentValue: string) => {
        if (currentValue !== 'All') return 'All';
        
        // This is simplified logic for demonstration. 
        // In a real app, you would open a modal/picker here.
        if (currentTitle === 'Session') return 'Spring-2022';
        if (currentTitle === 'Semester') return '1st Semester 2018';
        if (currentTitle === 'Fees Type') return 'Paper Fund';
        return 'All';
    };

    return (
        <View style={styles.formGroup}>
            <Text style={styles.dropdownTitle}>{title}</Text>
            <TouchableOpacity 
                style={styles.selectContainer} 
                onPress={() => onSelect(getNextValue(title, value))}
            >
                <Text style={styles.selectText}>{value}</Text>
                <Text style={styles.selectArrow}>▼</Text>
            </TouchableOpacity>
        </View>
    );
};
// --- END Dropdown Component ---


const FeesReport: React.FC = () => {
    // 1. Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSession, setSelectedSession] = useState('All');
    const [selectedSemester, setSelectedSemester] = useState('All');
    const [selectedFeesType, setSelectedFeesType] = useState('All');

    // 2. Main Filtering and Searching Logic (Optimized with useMemo)
    const filteredData = useMemo(() => {
        return mockFeesData.filter(record => {
            // A. Search Logic
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                record.feesType.toLowerCase().includes(searchLower) ||
                record.session.toLowerCase().includes(searchLower) ||
                record.semester.toLowerCase().includes(searchLower);

            // B. Filter Logic
            const matchesSession = selectedSession === 'All' || record.session === selectedSession;
            const matchesSemester = selectedSemester === 'All' || record.semester === selectedSemester;
            const matchesFeesType = selectedFeesType === 'All' || record.feesType === selectedFeesType;

            return matchesSearch && matchesSession && matchesSemester && matchesFeesType;
        });
    }, [searchTerm, selectedSession, selectedSemester, selectedFeesType]); 
    
    // Placeholder for actual filter application
    const handleFilter = () => {
        // Since filtering is dynamic via useMemo, this button can trigger a refresh/API call
        console.log('Filter button manually applied.');
    };

    const renderStatusBadge = (status: 'Pending' | 'Paid') => (
        <View
            style={[
                styles.badge,
                status === 'Paid' ? styles.badgePaid : styles.badgePending,
            ]}>
            <Text
                style={[
                    styles.badgeText,
                    status === 'Paid' ? styles.textPaid : styles.textPending,
                ]}>
                {status}
            </Text>
        </View>
    );

    const renderActionButton = (record: FeeRecord) => {
        if (record.status === 'Pending') {
            return (
                <TouchableOpacity style={styles.payButton}>
                    <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
            );
        }
        return <Text style={{ textAlign: 'center' }}>-</Text>;
    };

    // --- Table Row Rendering Logic ---
    const renderRow = (record: FeeRecord, index: number) => {
        const rowData = [
            index + 1,
            record.session,
            record.semester,
            record.feesType,
            `$ ${record.fee.toFixed(2)}`,
            `$ ${record.discount.toFixed(2)}`,
            `$ ${record.fine.toFixed(2)}`,
            `$ ${record.netAmount.toFixed(2)}`,
            record.dueDate,
            renderStatusBadge(record.status),
            record.payDate || '-',
            renderActionButton(record),
        ];

        return (
            <View key={record.id} style={styles.tableRow}>
                {rowData.map((cellData, cellIndex) => (
                    <View
                        key={cellIndex}
                        style={[
                            styles.tableCell,
                            { flex: columnFlex[cellIndex] },
                        ]}>
                        {typeof cellData === 'string' || typeof cellData === 'number' ? (
                            <Text style={styles.tableCellText}>{cellData}</Text>
                        ) : (
                            cellData
                        )}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fees Report</Text>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* --- Filter and Search Section --- */}
                <View style={styles.filterCard}>
                    
                    {/* Filter Dropdowns with Titles */}
                    <View style={styles.filterContainer}>
                        <FilterSelect 
                            title="Session" 
                            value={selectedSession} 
                            onSelect={setSelectedSession} 
                        />
                        <FilterSelect 
                            title="Semester" 
                            value={selectedSemester} 
                            onSelect={setSelectedSemester} 
                        />
                        <FilterSelect 
                            title="Fees Type" 
                            value={selectedFeesType} 
                            onSelect={setSelectedFeesType} 
                        />
                        <TouchableOpacity onPress={handleFilter} style={styles.filterButton}>
                            <Text style={styles.filterButtonText}>🔎 Filter</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Show Entries and Search */}
                    <View style={styles.showSearchContainer}>
                        <View style={styles.showEntries}>
                            <Text style={styles.showText}>Show </Text>
                            <View style={styles.entriesInput}>
                                <Text style={styles.entriesText}>10</Text>
                            </View>
                            <Text style={styles.showText}> entries</Text>
                        </View>
                        <View style={styles.searchBox}>
                            <Text style={styles.showText}>Search: </Text>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                value={searchTerm}
                                onChangeText={setSearchTerm} 
                            />
                        </View>
                    </View>

                    {/* --- Data Table Section --- */}
                    <ScrollView horizontal style={styles.tableScroll}>
                        <View style={styles.tableWrapper}>
                            {/* Table Header */}
                            <View style={[styles.tableHeader, styles.tableRow]}>
                                {tableHeader.map((header, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.tableHeaderCell,
                                            { flex: columnFlex[index] },
                                        ]}>
                                        <Text style={styles.tableHeaderText}>{header}</Text>
                                    </View>
                                ))}
                            </View>
                            
                            {/* Table Body - Now uses filteredData */}
                            {filteredData.length > 0 ? (
                                filteredData.map(renderRow)
                            ) : (
                                <View style={styles.noDataRow}>
                                    <Text style={styles.noDataText}>No records found matching your criteria.</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    {/* --- Pagination & Info --- */}
                    <View style={styles.paginationContainer}>
                        <Text style={styles.paginationText}>
                            Showing 1 to {filteredData.length} of {filteredData.length} entries
                        </Text>
                        <View style={styles.paginationControls}>
                            <TouchableOpacity style={styles.paginationButtonDisabled}>
                                <Text style={styles.paginationButtonTextDisabled}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.currentPage}>
                                <Text style={styles.currentPageText}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.paginationButtonDisabled}>
                                <Text style={styles.paginationButtonTextDisabled}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

// --- Stylesheet ---

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    scrollContent: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        padding: 15,
    },
    filterCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
        padding: 15,
    },

    // --- Filter Styles ---
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15,
        marginHorizontal: -5,
    },
    formGroup: {
        flex: 1,
        paddingHorizontal: 5,
        // Added space for title
    },
    // NEW style for the dropdown title
    dropdownTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    selectContainer: {
        height: 38,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectText: {
        fontSize: 14,
        color: '#333',
    },
    selectArrow: {
        color: '#888',
        fontSize: 10,
    },
    filterButton: {
        height: 38,
        backgroundColor: '#17a2b8',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginLeft: 5,
        // Aligned with the bottom of the select containers
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },

    // --- Show Entries and Search ---
    showSearchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    showEntries: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    showText: {
        fontSize: 12,
        color: '#555',
    },
    entriesInput: {
        height: 28,
        width: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    entriesText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    searchInput: {
        height: 28,
        width: 120,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginLeft: 5,
        paddingHorizontal: 8,
        fontSize: 12,
    },

    // --- Table Styles ---
    tableScroll: {
        width: '100%',
    },
    tableWrapper: {
        minWidth: 950,
    },
    tableHeader: {
        backgroundColor: '#343a40',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        minHeight: 40,
        alignItems: 'center',
    },
    tableHeaderCell: {
        padding: 8,
        justifyContent: 'center',
    },
    tableHeaderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
    },
    tableCell: {
        padding: 8,
        justifyContent: 'center',
        minHeight: 40,
    },
    tableCellText: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
    noDataRow: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        minWidth: 750,
    },
    noDataText: {
        color: '#6c757d',
        fontSize: 14,
        fontWeight: '500',
    },

    // --- Status Badge ---
    badge: {
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignSelf: 'center',
        width: 65,
    },
    badgePending: {
        backgroundColor: '#e6f7ff',
    },
    badgePaid: {
        backgroundColor: '#ebfdf3',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '600',
        textAlign: 'center',
    },
    textPending: {
        color: '#1890ff',
    },
    textPaid: {
        color: '#52c41a',
    },

    // --- Action Button (Pay Now) ---
    payButton: {
        backgroundColor: '#007bff',
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },

    // --- Pagination Styles ---
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    paginationText: {
        fontSize: 12,
        color: '#666',
    },
    paginationControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paginationButtonDisabled: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    paginationButtonTextDisabled: {
        color: '#6c757d',
        fontSize: 14,
    },
    currentPage: {
        backgroundColor: '#007bff',
        width: 30,
        height: 30,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    currentPageText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default FeesReport;