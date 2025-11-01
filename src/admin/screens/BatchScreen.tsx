import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Static Data ---
const initialPrograms = [
    { id: '13', name: 'Accounting And Finance' },
    { id: '12', name: 'Auditing' },
    { id: '14', name: 'B.pharmacy' },
    { id: '2', name: 'Civil Engineering' },
    { id: '3', name: 'Computer Engineering' },
    { id: '15', name: 'Computer Science' },
    { id: '16', name: 'Contemporary Design' },
    { id: '18', name: 'ddd' },
    { id: '5', name: 'English Studies' },
    { id: '6', 'name': 'Fine Arts and Design' },
    { id: '11', name: 'Macro Economics' },
    { id: '8', name: 'Marketing' },
    { id: '9', name: 'Maths For Finanace' },
    { id: '4', name: 'Mechanical Engineering' },
    { id: '10', name: 'Principle of Accounting 1' },
    { id: '1', name: 'Social Sciences' },
    { id: '17', name: 'Test 11' },
    { id: '19', name: 'xd' },
];

const initialBatchData = [
    { id: 1, title: 'hrf', startDate: '15-10-2025', programs: ['Accounting And Finance', 'Civil Engineering', 'Contemporary Design', 'Fine Arts and Design', 'Marketing', 'Maths For Finanace', 'Mechanical Engineering', 'Test 11', 'xd'], status: 'Active' },
    { id: 2, title: 'xxxxx', startDate: '01-10-2025', programs: ['Auditing', 'B.pharmacy', 'Civil Engineering', 'Computer Engineering', 'Computer Science', 'Contemporary Design', 'ddd', 'English Studies', 'Fine Arts and Design', 'Macro Economics', 'Principle of Accounting 1', 'Social Sciences', 'Test 11'], status: 'Active' },
    { id: 3, title: 'Batch 19', startDate: '27-10-2025', programs: ['Test 11', 'Principle of Accounting 1', 'Accounting And Finance'], status: 'Active' },
    { id: 4, title: 'Data Sci', startDate: '10-11-2025', programs: ['Computer Science', 'Maths For Finanace'], status: 'Active' },
    { id: 5, title: 'Design 201', startDate: '05-12-2025', programs: ['Fine Arts and Design', 'Contemporary Design'], status: 'Active' },
    { id: 6, title: 'Eng-Adv', startDate: '20-01-2026', programs: ['English Studies', 'Social Sciences'], status: 'Active' },
    { id: 7, title: 'Eco-Batch', startDate: '14-02-2026', programs: ['Macro Economics', 'Principle of Accounting 1'], status: 'Active' },
    { id: 8, title: 'Final Test', startDate: '01-03-2026', programs: ['Test 11', 'xd', 'ddd'], status: 'Active' },
    { id: 9, title: 'Spring 26', startDate: '01-04-2026', programs: ['Accounting And Finance', 'Auditing', 'B.pharmacy'], status: 'Active' },
    { id: 10, title: 'Summer 26', startDate: '01-05-2026', programs: ['Civil Engineering', 'Mechanical Engineering'], status: 'Active' },
    { id: 11, title: 'New Batch A', startDate: '01-06-2026', programs: ['Computer Engineering', 'Computer Science', 'Marketing'], status: 'Active' },
    { id: 12, title: 'New Batch B', startDate: '01-07-2026', programs: ['Maths For Finanace', 'English Studies'], status: 'Active' },
];


// --- Custom Components (Checkbox & Table) ---

interface CustomCheckboxProps {
    label: string;
    checked: boolean;
    onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked, onPress }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
        <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

interface BatchItem {
    id: number;
    title: string;
    startDate: string;
    programs: string[];
    status: string;
}

interface BatchListTableProps {
    data: BatchItem[];
    setBatchData: React.Dispatch<React.SetStateAction<BatchItem[]>>;
}


const BatchListTable: React.FC<BatchListTableProps> = ({ data, setBatchData }) => {
    
    // --- DELETE Handler ---
    const handleDelete = (id: number) => {
        Alert.alert(
            "Confirm Delete",
            `Are you sure you want to delete Batch ID: ${id}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setBatchData(prevData => prevData.filter(item => item.id !== id));
                        Alert.alert("Deleted", `Batch ID: ${id} has been deleted.`);
                    }
                },
            ]
        );
    };

    // --- Edit Handler (Placeholder) ---
    const handleEdit = (item: BatchItem) => {
        Alert.alert("Edit Function", `Prepare to edit batch: ${item.title} (ID: ${item.id})`);
    };


    // टेबल रो कंपोनेंट
    const renderItem = ({ item }: { item: BatchItem }) => (
        <View style={styles.tableRow}>
            {/* ID */}
            <View style={[styles.tableCell, styles.columnIDContent]}>
                <Text style={styles.tableCellText}>{item.id}</Text>
            </View>

            {/* Title */}
            <View style={[styles.tableCell, styles.columnTitleContent]}>
                 <Text style={styles.tableCellText}>{item.title}</Text>
            </View>

            {/* Start Date */}
            <View style={[styles.tableCell, styles.columnDateContent]}>
                 <Text style={styles.tableCellText}>{item.startDate}</Text>
            </View>
            
            {/* Program - Changed to wrap horizontally for compact display */}
            <View style={[styles.tableCell, styles.columnProgramContent]}>
                {item.programs.map((program, index) => (
                    <Text key={index} style={styles.programBadge}>{program}</Text>
                ))}
            </View>
            
            {/* Status */}
            <View style={[styles.tableCell, styles.columnStatusContent]}>
                <Text style={[
                    styles.statusText, 
                    item.status === 'Active' ? styles.statusActive : styles.statusInactive
                ]}>
                    {item.status}
                </Text>
            </View>
            
            {/* Action - Buttons aligned in the center */}
            <View style={[styles.tableCell, styles.columnActionContent]}>
                {/* EDIT Button with Handler */}
                <TouchableOpacity 
                    style={styles.actionButtonEdit}
                    onPress={() => handleEdit(item)}
                >
                    <Text style={styles.actionIcon}>✎</Text>
                </TouchableOpacity>
                {/* DELETE Button with Handler */}
                <TouchableOpacity 
                    style={styles.actionButtonDelete}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.actionIcon}>🗑</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.listCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.headerText}>Batch List</Text>
            </View>
            
            <View style={styles.searchBar}>
                <Text style={styles.searchBarText}>Show 10 entries</Text>
                <TextInput style={styles.searchInput} placeholder="Search:" />
            </View>
            
            <View style={styles.tableContainer}>
                {/* Table Header (Fixed) */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <View style={[styles.tableCell, styles.columnIDHeader]}>
                        <Text style={styles.tableHeaderText}>#</Text>
                    </View>
                    <View style={[styles.tableCell, styles.columnTitleHeader]}>
                        <Text style={styles.tableHeaderText}>Title</Text>
                    </View>
                    <View style={[styles.tableCell, styles.columnDateHeader]}>
                        <Text style={styles.tableHeaderText}>Date</Text>
                    </View>
                    <View style={[styles.tableCell, styles.columnProgramHeader]}>
                        <Text style={styles.tableHeaderText}>Program</Text>
                    </View>
                    <View style={[styles.tableCell, styles.columnStatusHeader]}>
                        <Text style={styles.tableHeaderText}>Status</Text>
                    </View>
                    <View style={[styles.tableCell, styles.columnActionHeader]}>
                        <Text style={styles.tableHeaderText}>Action</Text>
                    </View>
                </View>

                {/* Table Rows - Vertical Scrolling is handled by FlatList */}
                {/* maxHeight यहाँ ऊर्ध्वाधर स्क्रॉलिंग को सक्षम करता है */}
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.tableFlatList} 
                />
            </View>

            <View style={styles.tableFooter}>
                <Text style={styles.tableFooterText}>Showing 1 to {data.length} of {data.length} entries</Text>
                <View style={styles.pagination}>
                    <TouchableOpacity style={styles.pageButton}><Text style={styles.pageButtonText}>Previous</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.pageButton, styles.pageActive]}><Text style={styles.pageActiveText}>1</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.pageButton}><Text style={styles.pageButtonText}>2</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.pageButton}><Text style={styles.pageButtonText}>Next</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


// --- Main Screen Component ---

const BatchScreen: React.FC = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedProgramIds, setSelectedProgramIds] = useState<string[]>(initialPrograms.map(p => p.id));
    const [isAllSelected, setIsAllSelected] = useState(true);
    const [batchData, setBatchData] = useState(initialBatchData); 

    // --- Date Picker Handler ---
    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || startDate;
        if (Platform.OS === 'android') {
             setShowDatePicker(false);
        }
        if (selectedDate) {
            setStartDate(currentDate);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // --- Program Checkbox Handler ---
    const handleProgramToggle = (id: string) => {
        setSelectedProgramIds(prev => {
            let newSelected;
            if (prev.includes(id)) {
                newSelected = prev.filter(programId => programId !== id);
            } else {
                newSelected = [...prev, id];
            }
            setIsAllSelected(newSelected.length === initialPrograms.length);
            return newSelected;
        });
    };

    // --- 'All' Checkbox Handler ---
    const handleAllToggle = () => {
        const newAllSelected = !isAllSelected;
        setIsAllSelected(newAllSelected);
        if (newAllSelected) {
            setSelectedProgramIds(initialPrograms.map(p => p.id));
        } else {
            setSelectedProgramIds([]);
        }
    };

    // --- Form Submission ---
    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Validation Error', 'Please Enter Title.');
            return;
        }
        if (!selectedProgramIds.length) {
              Alert.alert('Validation Error', 'Please Assign at least one Program.');
            return;
        }
        
        // Create new batch object
        const newBatch: BatchItem = {
            id: batchData.length + 1,
            title: title.trim(),
            startDate: startDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'), // DD-MM-YYYY format
            programs: initialPrograms.filter(p => selectedProgramIds.includes(p.id)).map(p => p.name),
            status: 'Active',
        };

        // Add to batch data
        setBatchData(prevData => [newBatch, ...prevData]);

        Alert.alert('Success', 'Batch Created Successfully!');

        // Reset form
        setTitle('');
        setStartDate(new Date());
        setSelectedProgramIds(initialPrograms.map(p => p.id));
        setIsAllSelected(true);
    };

    return (
        <View style={styles.mainContainer}>
            
            {/* 1. Left Panel - Create Batch Form */}
            <View style={styles.leftPanel}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.headerText}>Create Batch</Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.cardBlockContent}>
                        {/* Title Input */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Title <Text style={styles.required}>*</Text></Text>
                            <TextInput
                                style={styles.formControl}
                                onChangeText={setTitle}
                                value={title}
                                placeholder="Enter Title"
                            />
                        </View>

                        {/* Start Date Input */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Start Date <Text style={styles.required}>*</Text></Text>
                            <TouchableOpacity onPress={showDatepicker} style={styles.dateInputDisplay}>
                                <Text>{startDate.toLocaleDateString('en-GB')}</Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={startDate}
                                    mode={'date'}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>

                        {/* Assign Program Checkboxes */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Assign Program <Text style={styles.required}>*</Text></Text>
                            <CustomCheckbox
                                label="All"
                                checked={isAllSelected}
                                onPress={handleAllToggle}
                            />
                            <View style={styles.programsList}>
                                {initialPrograms.map(program => (
                                    <CustomCheckbox
                                        key={program.id}
                                        label={program.name}
                                        checked={selectedProgramIds.includes(program.id)}
                                        onPress={() => handleProgramToggle(program.id)}
                                    />
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>✓ Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* 2. Right Panel - Batch List Table */}
            <View style={styles.rightPanel}>
                <BatchListTable data={batchData} setBatchData={setBatchData} />
            </View>
        </View>
    );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
    // --- Layout Styles ---
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f0f2f5', 
    },
    leftPanel: {
        width: '35%',
        marginRight: 10, 
    },
    rightPanel: {
        flex: 1,
    },

    // --- Card & 3D Look Styles ---
    card: {
        backgroundColor: '#fff',
        borderRadius: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8, 
        flex: 1,
        maxHeight: '100%',
        borderWidth: 1, 
        borderColor: '#e9ecef',
    },
    listCard: {
        backgroundColor: '#fff',
        borderRadius: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8, 
        flex: 1, 
        borderWidth: 1,
        borderColor: '#e9ecef',
        // 'flex: 1' यहाँ यह सुनिश्चित करता है कि लिस्ट कार्ड उपलब्ध ऊर्ध्वाधर स्थान (vertical space) ले 
    },
    cardHeader: {
        backgroundColor: '#007bff', 
        padding: 18,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#0069d9',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', 
    },

    // --- Form Styles ---
    cardBlockContent: {
        padding: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 15,
        fontWeight: '700', 
        marginBottom: 6,
        color: '#343a40',
    },
    required: {
        color: '#dc3545', 
    },
    formControl: {
        height: 44, 
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 6, 
        paddingHorizontal: 12,
        backgroundColor: '#f8f9fa', 
        fontSize: 16,
    },
    dateInputDisplay: {
        height: 44,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },

    // --- Footer & Save Button Styles ---
    cardFooter: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        backgroundColor: '#f8f9fa',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'flex-start',
    },
    saveButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12, 
        paddingHorizontal: 20,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    // --- Checkbox Styles ---
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 4, 
        borderWidth: 2,
        borderColor: '#6c757d', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkedCheckbox: {
        backgroundColor: '#17a2b8', 
        borderColor: '#17a2b8',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 18,
    },
    checkboxLabel: {
        fontSize: 15,
        color: '#343a40',
    },
    programsList: {
        marginTop: 10,
        paddingLeft: 5,
        borderLeftWidth: 3,
        borderLeftColor: '#f0f2f5',
    },
    
    // --- Table & Search Styles ---
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        backgroundColor: '#f8f9fa',
    },
    searchBarText: {
        fontSize: 14,
        color: '#6c757d',
    },
    searchInput: {
        height: 35,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,     
        width: 180,
        marginLeft: 10,
        backgroundColor: '#fff',
    },
    
    // *** VERTICAL SCROLLING ***
    tableContainer: {
        flex: 1, 
    },
    tableFlatList: {
        flexGrow: 0, 
        
        maxHeight: "auto", 
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        backgroundColor: '#fff',
        alignItems: 'stretch', 
        paddingVertical: 10, 
        minHeight: 60, 
    },
    tableHeader: {
        backgroundColor: '#343a40', 
        borderBottomWidth: 0,
        alignItems: 'stretch',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0, 
    },
    tableCell: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 5, 
        paddingVertical: 5,
    },
    tableCellText: {
        fontSize: 14,
        color: '#495057', 
        textAlign: 'center', 
    },
    tableHeaderText: {
        color: '#fff', 
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center', 
    },

    // --- Column Widths (Percentage-based, Compacted) ---
    columnIDHeader: { width: '8%', alignItems: 'center' }, 
    columnTitleHeader: { width: '18%', alignItems: 'center' },
    columnDateHeader: { width: '15%', alignItems: 'center' },
    columnProgramHeader: { width: '30%', alignItems: 'center' }, 
    columnStatusHeader: { width: '14%', alignItems: 'center' },
    columnActionHeader: { width: '15%', alignItems: 'center' },

    columnIDContent: { width: '8%', alignItems: 'center' },
    columnTitleContent: { width: '18%', alignItems: 'center' },
    columnDateContent: { width: '15%', alignItems: 'center' },
    columnStatusContent: { width: '14%', alignItems: 'center' },

    // Program Column Styling - Horizontal wrap
    columnProgramContent: { 
        width: '30%', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    }, 
    // Action Column Styling - Center alignment
    columnActionContent: { 
        width: '15%', 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    // --- Status and Badge Styles (Compacted) ---
    programBadge: {
        backgroundColor: '#17a2b8', 
        color: '#fff', 
        borderRadius: 4,
        paddingHorizontal: 4, 
        paddingVertical: 2, 
        marginHorizontal: 2, 
        marginVertical: 2, 
        fontSize: 11, 
        fontWeight: '500', 
        overflow: 'hidden',
    },
    statusText: {
        borderRadius: 50, 
        paddingHorizontal: 5, 
        paddingVertical: 3, 
        fontSize: 12, 
        overflow: 'hidden',
        textAlign: 'center',
        fontWeight: 'bold',
        minWidth: 55, 
    },
    statusActive: {
        backgroundColor: '#28a745', 
        color: '#fff',
    },
    statusInactive: { 
        backgroundColor: '#dc3545', 
        color: '#fff',
    },

    // --- Action Button Styles (Compacted) ---
    actionButtonEdit: {
        backgroundColor: '#007bff', 
        padding: 6, 
        borderRadius: 4, 
    },
    actionButtonDelete: {
        backgroundColor: '#dc3545', 
        padding: 6,
        borderRadius: 4,
        marginLeft: 5, 
    },
    actionIcon: {
        color: '#fff',
        fontSize: 14, 
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // --- Footer and Pagination (Compacted) ---
    tableFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        backgroundColor: '#f8f9fa',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    tableFooterText: {
        fontSize: 14,
        color: '#6c757d',
    },
    pagination: {
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden', 
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    pageButton: {
        paddingHorizontal: 12, 
        paddingVertical: 6, 
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderLeftWidth: 1, 
        borderLeftColor: '#dee2e6',
    },
    pageButtonText: {
        color: '#007bff',
        fontWeight: '600',
    },
    pageActive: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    pageActiveText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default BatchScreen;