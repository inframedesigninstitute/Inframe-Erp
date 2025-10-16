import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import FeeStatusCard, { FeeStatusProps } from '../components/FeeStatusCard'; // **पाथ को अपने कंपोनेंट्स फ़ोल्डर के अनुसार बदलें**
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

// --- Mock Data (Kept the same for consistency) ---

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
    // Adding more mock data for better multi-select demo
    {
        id: 5,
        session: 'Fall-2022',
        semester: '2nd Semester 2018',
        feesType: 'Exam Fees',
        fee: 400.0,
        discount: 0.0,
        fine: 0.0,
        netAmount: 400.0,
        dueDate: '01-12-2024',
        status: 'Pending',
        payDate: null,
    },
    {
        id: 6,
        session: 'Spring-2023',
        semester: '3rd Semester 2019',
        feesType: 'Semester Fees',
        fee: 2500.0,
        discount: 0.0,
        fine: 0.0,
        netAmount: 2500.0,
        dueDate: '01-05-2025',
        status: 'Pending',
        payDate: null,
    },
];

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

// ===========================================
// ✅ NEW MULTI-SELECT FILTER COMPONENT
// ===========================================

interface MultiSelectProps {
    title: string;
    options: string[];
    selectedValues: string[];
    onValuesChange: (vals: string[]) => void;
}

const MultiSelectFilter: React.FC<MultiSelectProps> = ({
    title,
    options,
    selectedValues,
    onValuesChange,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleSelect = (value: string) => {
        if (selectedValues.includes(value)) {
            // Remove value
            onValuesChange(selectedValues.filter(v => v !== value));
        } else {
            // Add value
            onValuesChange([...selectedValues, value]);
        }
    };

    const displayValue = useMemo(() => {
        if (selectedValues.length === 0) return `All ${title}s`;
        if (selectedValues.length === options.length) return `All ${title}s Selected`;
        return selectedValues.join(', ');
    }, [selectedValues, options, title]);

    return (
        <View style={modernStyles.formGroup}>
            <Text style={modernStyles.dropdownTitle}>{title}</Text>
            <TouchableOpacity
                style={modernStyles.selectContainer}
                onPress={() => setModalVisible(true)}
            >
                <Text style={[modernStyles.selectText, { color: selectedValues.length > 0 ? '#1a202c' : '#888' }]} numberOfLines={1}>
                    {displayValue}
                </Text>
                <AntDesign name="down" size={12} color="#888" />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={modernStyles.modalBackground}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)} // Close modal on background press
                >
                    <View style={modernStyles.modalContent}>
                        <Text style={modernStyles.modalTitle}>Select {title}s</Text>
                        
                        <ScrollView style={{ maxHeight: 200, paddingVertical: 10 }}>
                            {options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={modernStyles.checkboxItem}
                                    onPress={() => toggleSelect(option)}
                                >
                                    <View style={modernStyles.checkbox}>
                                        {selectedValues.includes(option) && (
                                            <AntDesign name="check" size={14} color="#007bff" />
                                        )}
                                    </View>
                                    <Text style={modernStyles.checkboxText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity 
                            style={modernStyles.modalCloseButton} 
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={modernStyles.modalCloseButtonText}>Done ({selectedValues.length})</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

// ===========================================
// END MULTI-SELECT FILTER COMPONENT
// ===========================================

const FeesReport: React.FC = () => {
    // 1. Filter States (Now arrays for multiple selection)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSession, setSelectedSession] = useState<string[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<string[]>([]);
    const [selectedFeesType, setSelectedFeesType] = useState<string[]>([]);

    // 2. Extract Unique Options for the MultiSelects
    const uniqueSessions = useMemo(() => Array.from(new Set(mockFeesData.map(d => d.session))).sort(), []);
    const uniqueSemesters = useMemo(() => Array.from(new Set(mockFeesData.map(d => d.semester))).sort(), []);
    const uniqueFeesTypes = useMemo(() => Array.from(new Set(mockFeesData.map(d => d.feesType))).sort(), []);

const overallFeeData: FeeStatusProps = {
        totalFee: 75000,
        paidAmount: 45000,
        dueDate: '2025-08-30',
        currencySymbol: '₹', // या आपकी जरूरत के अनुसार
    };
    // 3. Main Filtering and Searching Logic (Optimized with useMemo)
    const filteredData = useMemo(() => {
        return mockFeesData.filter(record => {
            // A. Search Logic
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                record.feesType.toLowerCase().includes(searchLower) ||
                record.session.toLowerCase().includes(searchLower) ||
                record.semester.toLowerCase().includes(searchLower);

            // B. Filter Logic (Uses array check for multiple selection)
            const matchesSession = selectedSession.length === 0 || selectedSession.includes(record.session);
            const matchesSemester = selectedSemester.length === 0 || selectedSemester.includes(record.semester);
            const matchesFeesType = selectedFeesType.length === 0 || selectedFeesType.includes(record.feesType);

            return matchesSearch && matchesSession && matchesSemester && matchesFeesType;
        });
    }, [searchTerm, selectedSession, selectedSemester, selectedFeesType]); 
    
    // Placeholder for actual filter application
    const handleFilter = () => {
        console.log('Filter button applied/Search executed. Filters are automatically applied via useMemo.');
    };

    const handleDownloadReceipt = (recordId: number) => {
        console.log(`Attempting to download receipt for record ID: ${recordId}`);
        alert(`Downloading Receipt for ID: ${recordId}`); // Mock action
    };

    const handlePayNow = (recordId: number) => {
        console.log(`Initiating payment for record ID: ${recordId}`);
        alert(`Redirecting to Payment for ID: ${recordId}`); // Mock action
    };


    const renderStatusBadge = (status: 'Pending' | 'Paid') => (
        <View
            style={[
                modernStyles.badge,
                status === 'Paid' ? modernStyles.badgePaid : modernStyles.badgePending,
            ]}>
            <Text
                style={[
                    modernStyles.badgeText,
                    status === 'Paid' ? modernStyles.textPaid : modernStyles.textPending,
                ]}>
                {status}
            </Text>
        </View>
    );

    // --- Action Button Logic with Download ---
    const renderActionButton = (record: FeeRecord) => {
        if (record.status === 'Paid') {
            return (
                <TouchableOpacity 
                    style={modernStyles.downloadButton}
                    onPress={() => handleDownloadReceipt(record.id)}
                >
                    <Feather name="download" size={14} color="#fff" />
                    <Text style={modernStyles.downloadButtonText}> Download</Text>
                </TouchableOpacity>
            );
        }
        
        if (record.status === 'Pending') {
            return (
                <TouchableOpacity 
                    style={modernStyles.payButton}
                    onPress={() => handlePayNow(record.id)}
                >
                    <Text style={modernStyles.payButtonText}>Pay Now</Text>
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
            <View key={record.id} style={modernStyles.tableRow}>
                {rowData.map((cellData, cellIndex) => (
                    <View
                        key={cellIndex}
                        style={[
                            modernStyles.tableCell,
                            { flex: columnFlex[cellIndex] },
                        ]}>
                        {typeof cellData === 'string' || typeof cellData === 'number' ? (
                            <Text style={modernStyles.tableCellText}>{cellData}</Text>
                        ) : (
                            cellData
                        )}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={modernStyles.container}>
            {/* Main Header */}
            <View style={modernStyles.headerContainer}>
                <Text style={modernStyles.title}>🧾 Fee Payment & Receipt</Text>
            </View>
            <ScrollView contentContainerStyle={modernStyles.scrollContent}>
               <FeeStatusCard 
                    totalFee={overallFeeData.totalFee}
                    paidAmount={overallFeeData.paidAmount}
                    dueDate={overallFeeData.dueDate}
                    currencySymbol={overallFeeData.currencySymbol}
                /> 
                <View style={modernStyles.filterCard}>
                    
                    {/* Filter Dropdowns with Titles - NOW MULTI-SELECT */}
                    <View style={modernStyles.filterContainer}>
                        <MultiSelectFilter 
                            title="Session" 
                            options={uniqueSessions}
                            selectedValues={selectedSession} 
                            onValuesChange={setSelectedSession} 
                        />
                        <MultiSelectFilter 
                            title="Semester" 
                            options={uniqueSemesters}
                            selectedValues={selectedSemester} 
                            onValuesChange={setSelectedSemester} 
                        />
                        <MultiSelectFilter 
                            title="Fees Type" 
                            options={uniqueFeesTypes}
                            selectedValues={selectedFeesType} 
                            onValuesChange={setSelectedFeesType} 
                        />
                        <TouchableOpacity onPress={handleFilter} style={modernStyles.filterButton}>
                            <Feather name="filter" size={16} color="#fff" />
                            <Text style={modernStyles.filterButtonText}>Filter</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Show Entries and Search */}
                    <View style={modernStyles.showSearchContainer}>
                        <View style={modernStyles.showEntries}>
                            <Text style={modernStyles.showText}>Showing {filteredData.length} Records</Text>
                        </View>
                        <View style={modernStyles.searchBox}>
                            <Feather name="search" size={16} color="#888" style={{marginRight: 5}}/>
                            <TextInput
                                style={modernStyles.searchInput}
                                placeholder="Search: Type, Session, or Semester"
                                value={searchTerm}
                                onChangeText={setSearchTerm} 
                            />
                        </View>
                    </View>

                    {/* ✅ DATA TABLE SECTION TITLE */}
                    <Text style={modernStyles.sectionTitle}>Fees Record Details</Text>
                    
                    <ScrollView horizontal style={modernStyles.tableScroll}>
                        <View style={modernStyles.tableWrapper}>
                            {/* Table Header */}
                            <View style={[modernStyles.tableHeader, modernStyles.tableRow]}>
                                {tableHeader.map((header, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            modernStyles.tableHeaderCell,
                                            { flex: columnFlex[index] },
                                        ]}>
                                        <Text style={modernStyles.tableHeaderText}>{header}</Text>
                                    </View>
                                ))}
                            </View>
                            
                            {/* Table Body - Now uses filteredData */}
                            {filteredData.length > 0 ? (
                                filteredData.map(renderRow)
                            ) : (
                                <View style={modernStyles.noDataRow}>
                                    <Text style={modernStyles.noDataText}>No records found matching your criteria.</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    {/* --- Pagination & Info --- */}
                    <View style={modernStyles.paginationContainer}>
                        <Text style={modernStyles.paginationText}>
                            Showing 1 to {filteredData.length} of {mockFeesData.length} total entries
                        </Text>
                        <View style={modernStyles.paginationControls}>
                            <TouchableOpacity style={modernStyles.paginationButtonDisabled}>
                                <Text style={modernStyles.paginationButtonTextDisabled}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={modernStyles.currentPage}>
                                <Text style={modernStyles.currentPageText}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={modernStyles.paginationButton}>
                                <Text style={modernStyles.paginationButtonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

// --- MODERN STYLESHEET ---

const modernStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', // Lighter background
    },
    headerContainer: {
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    scrollContent: {
        padding: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a202c', // Darker text for title
    },
    filterCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05, // Softer shadow
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 15,
        padding: 15,
    },

    // --- Filter Styles ---
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 15,
        marginHorizontal: -5,
    },
    formGroup: {
        flex: 1,
        paddingHorizontal: 5,
    },
    dropdownTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
        marginBottom: 4,
    },
    selectContainer: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    selectText: {
        fontSize: 14,
        color: '#333',
    },
    filterButton: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff', // Primary Blue
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 5,
    },

    // --- Search & Info Styles ---
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
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 5,
        flex: 1,
    },
    searchInput: {
        height: 35,
        flex: 1,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 13,
        maxWidth: 250,
        backgroundColor: '#f9f9f9',
    },

    // --- Section Title Style ---
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginTop: 15,
        marginBottom: 10,
        paddingHorizontal: 5,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
        paddingLeft: 10,
    },

    // --- Table Styles ---
    tableScroll: {
        width: '100%',
        marginTop: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        overflow: 'hidden',
    },
    tableWrapper: {
        minWidth: 950,
    },
    tableHeader: {
        backgroundColor: '#2c3e50', // Darker Header
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f7f7f7',
        minHeight: 45,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    tableHeaderCell: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },
    tableHeaderText: {
        color: '#fff', // Changed text color to white for dark header
        fontWeight: '700',
        fontSize: 11,
        textAlign: 'center',
    },
    tableCell: {
        padding: 8,
        justifyContent: 'center',
        minHeight: 45,
    },
    tableCellText: {
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
    },
    noDataRow: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fdfdfd',
        minWidth: 750,
    },
    noDataText: {
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
    },

    // --- Status Badge ---
    badge: {
        borderRadius: 15, // Pill shape
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        minWidth: 70,
    },
    badgePending: {
        backgroundColor: '#f0f8ff',
    },
    badgePaid: {
        backgroundColor: '#f2fff0',
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        textAlign: 'center',
    },
    textPending: {
        color: '#007bff', // Blue
    },
    textPaid: {
        color: '#28a745', // Green
    },

    // --- Action Buttons ---
    payButton: {
        backgroundColor: '#ffc107', // Warning/Yellow
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: 'center',
    },
    payButtonText: {
        color: '#333',
        fontSize: 12,
        fontWeight: '700',
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28a745', // Success/Green
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignSelf: 'center',
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },


    // --- Pagination Styles ---
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 5,
    },
    paginationText: {
        fontSize: 13,
        color: '#6c757d',
    },
    paginationControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paginationButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 6,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#007bff',
    },
    paginationButtonText: {
        color: '#007bff',
        fontSize: 13,
        fontWeight: '500',
    },
    paginationButtonDisabled: {
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 6,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    paginationButtonTextDisabled: {
        color: '#6c757d',
        fontSize: 13,
    },
    currentPage: {
        backgroundColor: '#007bff',
        width: 32,
        height: 32,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    currentPageText: {
        color: '#fff', // Changed to white for better contrast
        fontWeight: 'bold',
        fontSize: 14,
    },

    // --- Modal Styles for MultiSelect ---
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    },
    modalContent: {
        width: '80%',
        maxWidth: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1.5,
        borderColor: '#007bff',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8faff',
    },
    checkboxText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    modalCloseButton: {
        marginTop: 15,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#fff',
        fontWeight: '700',
    }
});

export default FeesReport;