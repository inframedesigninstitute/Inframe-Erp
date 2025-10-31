import React, { useEffect, useMemo, useState } from "react"; // Added useMemo
import {
    Alert,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

// --- Interface Definitions ---
interface Faculty {
    id: number;
    title: string;
    shortcode: string;
    status: "Active" | "Pending" | "Inactive"; 
}

// --- Mock Data ---
const mockFaculties: Faculty[] = [
    { id: 1, title: "Business & Economics", shortcode: "001", status: "Active" },
    { id: 2, title: "Computer Science & IT", shortcode: "CSIT", status: "Active" },
    { id: 3, title: "Diploma in Engineering", shortcode: "DIPENG", status: "Pending" },
    { id: 4, title: "Faculty of Art", shortcode: "FCTART", status: "Inactive" },
    { id: 5, title: "Faculty of CSE", shortcode: "005", status: "Active" },
    { id: 6, title: "Faculty of Engineering", shortcode: "002", status: "Active" },
    { id: 7, title: "Faculty of Humanities", shortcode: "FCHUM", status: "Pending" },
    { id: 8, title: "Faculty of Political Science", shortcode: "POLSCI", status: "Active" },
    { id: 9, title: "Pharmacy", shortcode: "PHAR", status: "Inactive" },
    { id: 10, title: "Applied Science", shortcode: "ASCI", status: "Active" },
];

const ALL_STATUSES: Faculty['status'][] = ["Active", "Pending", "Inactive"];

// --- Helper Components ---

const StatusBadge: React.FC<{ status: Faculty["status"] }> = ({ status }) => {
    let color: string;
    let bgColor: string;

    switch (status) {
        case "Active":
            color = "#16a34a";
            bgColor = "#dcfce7";
            break;
        case "Pending":
            color = "#f59e0b";
            bgColor = "#fef3c7";
            break;
        case "Inactive":
            color = "#ef4444";
            bgColor = "#fee2e2";
            break;
    }

    return (
        <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
            <Text style={{ fontSize: 12, fontWeight: "600", color }}>{status}</Text>
        </View>
    );
};

// 1. Edit/View Modal Component
interface EditModalProps {
    visible: boolean;
    faculty: Faculty | null;
    onClose: () => void;
    onSave: (updatedFaculty: Faculty) => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, faculty, onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [shortcode, setShortcode] = useState("");
    const [status, setStatus] = useState<Faculty['status']>("Active");
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

    // Update states when a new faculty is passed
    useEffect(() => {
        if (faculty) {
            setTitle(faculty.title);
            setShortcode(faculty.shortcode);
            setStatus(faculty.status);
        }
    }, [faculty]);

    const handleSave = () => {
        if (!faculty) return;
        if (!title.trim()) {
            Alert.alert("Error", "Title cannot be empty.");
            return;
        }
        const updatedFaculty: Faculty = {
            ...faculty,
            title: title.trim(),
            shortcode: shortcode.trim(),
            status: status,
        };
        onSave(updatedFaculty);
    };

    if (!faculty) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalTitle}>Edit Faculty: #{faculty.id}</Text>

                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <Icon name="x" size={24} color="#6b7280" />
                    </TouchableOpacity>

                    <ScrollView style={{ maxHeight: 350, width: '100%' }}>
                        <View style={modalStyles.modalContentWrapper}>
                            {/* View Details Section */}
                            <View style={modalStyles.detailSection}>
                                <Text style={modalStyles.detailLabel}>Current Status:</Text>
                                <StatusBadge status={faculty.status} />
                            </View>

                            {/* Edit Form */}
                            <Text style={styles.inputLabel}>Title *</Text>
                            <TextInput
                                style={styles.inputBase}
                                value={title}
                                onChangeText={setTitle}
                            />

                            <Text style={styles.inputLabel}>Shortcode</Text>
                            <TextInput
                                style={styles.inputBase}
                                value={shortcode}
                                onChangeText={setShortcode}
                            />

                            <Text style={styles.inputLabel}>Status</Text>
                            {/* Custom Status Picker/Dropdown */}
                            <TouchableOpacity
                                style={modalStyles.pickerPlaceholder}
                                onPress={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                            >
                                <Text style={modalStyles.pickerText}>{status}</Text>
                                <Icon 
                                    name={isStatusMenuOpen ? "chevron-up" : "chevron-down"} 
                                    size={20} 
                                    color="#6b7280" 
                                />
                            </TouchableOpacity>

                            {/* Dropdown Menu */}
                            {isStatusMenuOpen && (
                                <View style={modalStyles.dropdownMenu}>
                                    {ALL_STATUSES.map(s => (
                                        <TouchableOpacity
                                            key={s}
                                            style={modalStyles.dropdownItem}
                                            onPress={() => {
                                                setStatus(s);
                                                setIsStatusMenuOpen(false);
                                            }}
                                        >
                                            <Text style={modalStyles.dropdownItemText}>{s}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                        </View>
                    </ScrollView>

                    {/* Action Buttons */}
                    <View style={modalStyles.buttonGroup}>
                        <TouchableOpacity onPress={onClose} style={[modalStyles.modalButton, modalStyles.cancelButton]}>
                            <Text style={modalStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave} style={[modalStyles.modalButton, modalStyles.saveButton]}>
                            <Icon name="save" size={16} color="#fff" style={{ marginRight: 5 }} />
                            <Text style={modalStyles.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// 2. Table Row Component
const TableRow: React.FC<{ data: Faculty; isHeader?: boolean; onEditClick?: (faculty: Faculty) => void }> = ({ data, isHeader = false, onEditClick }) => (
    <View style={[styles.tableRow, isHeader && styles.tableHeaderRow]}>
        <View style={[styles.tableCell, styles.columnID]}>
            <Text style={[styles.cellText, isHeader && styles.headerText]}>{isHeader ? "#" : data.id}</Text>
        </View>
        <View style={[styles.tableCell, styles.columnTitle]}>
            <Text style={[styles.cellText, isHeader && styles.headerText]}>
                {isHeader ? "Title" : data.title}
            </Text>
        </View>
        <View style={[styles.tableCell, styles.columnShortcode]}>
            <Text style={[styles.cellText, isHeader && styles.headerText]}>
                {isHeader ? "Shortcode" : data.shortcode}
            </Text>
        </View>
        <View style={[styles.tableCell, styles.columnStatus]}>
            {isHeader ? (
                <Text style={[styles.cellText, styles.headerText]}>Status</Text>
            ) : (
                <StatusBadge status={data.status} />
            )}
        </View>
        <View style={[styles.tableCell, styles.columnAction]}>
            {isHeader ? (
                <Text style={[styles.cellText, styles.headerText]}>Action</Text>
            ) : (
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => onEditClick && onEditClick(data)}>
                        <Icon name="edit" size={16} color="#3b82f6" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="trash-2" size={16} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    </View>
);

// --- 3. Main Screen Component ---
export default function FacultiesScreen() {
    const [faculties, setFaculties] = useState<Faculty[]>(mockFaculties);
    // New state for Search Term
    const [searchTerm, setSearchTerm] = useState(""); 

    const [newFacultyTitle, setNewFacultyTitle] = useState("");
    const [newFacultyShortcode, setNewFacultyShortcode] = useState("");
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

    // --- Search Logic (UseMemo for efficient filtering) ---
    const filteredFaculties = useMemo(() => {
        if (!searchTerm.trim()) {
            return faculties;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        return faculties.filter(faculty => 
            faculty.title.toLowerCase().includes(lowerCaseSearch) ||
            faculty.shortcode.toLowerCase().includes(lowerCaseSearch) ||
            faculty.status.toLowerCase().includes(lowerCaseSearch)
        );
    }, [faculties, searchTerm]);
    // ------------------------------------------------------

    const handleSaveNew = () => {
        if (!newFacultyTitle.trim()) {
             Alert.alert("Validation", "Faculty Title is required.");
             return;
        }

        const newFaculty: Faculty = {
            id: faculties.length + 1,
            title: newFacultyTitle.trim(),
            shortcode: newFacultyShortcode.trim() || "N/A",
            status: "Active",
        };
        setFaculties([newFaculty, ...faculties]); // Added new faculty to the top
        setNewFacultyTitle("");
        setNewFacultyShortcode("");
        Alert.alert("Success", `${newFaculty.title} added!`);
    };

    const handleEditClick = (faculty: Faculty) => {
        setEditingFaculty(faculty);
        setIsModalVisible(true);
    };

    const handleUpdateFaculty = (updatedFaculty: Faculty) => {
        setFaculties(
            faculties.map(f => (f.id === updatedFaculty.id ? updatedFaculty : f))
        );
        setIsModalVisible(false);
        setEditingFaculty(null);
        Alert.alert("Success", `Faculty ${updatedFaculty.title} updated!`);
    };

    const headerData: Faculty = {
        id: 0,
        title: "Title",
        shortcode: "Shortcode",
        status: "Active",
    };

    return (
        <View style={styles.screenContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.mainContentArea}>
                    
                    {/* Left Panel: Create Faculty */}
                    <View style={styles.leftPanel}>
                        <Text style={styles.panelTitle}>🎓 Create Faculty</Text>
                        <Text style={styles.inputLabel}>Title *</Text>
                        <TextInput
                            style={styles.inputBase}
                            placeholder="Enter Faculty Title"
                            value={newFacultyTitle}
                            onChangeText={setNewFacultyTitle}
                        />
                        <Text style={styles.inputLabel}>Shortcode</Text>
                        <TextInput
                            style={styles.inputBase}
                            placeholder="Shortcode (Optional)"
                            value={newFacultyShortcode}
                            onChangeText={setNewFacultyShortcode}
                        />
                        <TouchableOpacity onPress={handleSaveNew} style={styles.saveButton}>
                            <Icon name="save" size={16} color="#fff" />
                            <Text style={styles.saveButtonText}> Save Faculty</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Right Panel: Faculty List */}
                    <View style={styles.rightPanel}>
                        <Text style={styles.panelTitle}>📋 Faculty List</Text>
                        <View style={styles.filterBar}>
                            {/* Updated entry count to show filtered list count */}
                            <Text style={styles.filterText}>Show {filteredFaculties.length} entries</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={[styles.filterText, { marginRight: 5 }]}>Search:</Text>
                                {/* Search Input: Added value and onChangeText */}
                                <TextInput 
                                    style={styles.filterInput} 
                                    placeholder="Search..." 
                                    value={searchTerm}
                                    onChangeText={setSearchTerm} // **सर्च को काम कराएगा**
                                />
                            </View>
                        </View>
                        <View style={styles.tableContainer}>
                            <TableRow data={headerData} isHeader />
                            {/* Rendering filteredFaculties instead of 'faculties' */}
                            {filteredFaculties.map((f) => (
                                <TableRow key={f.id} data={f} onEditClick={handleEditClick} />
                            ))}
                        </View>
                        <View style={styles.paginationContainer}>
                            {/* Updated pagination text to reflect total count and filtered count */}
                            <Text style={styles.paginationText}>Showing 1 to {filteredFaculties.length} of {faculties.length} entries</Text>
                            <View style={styles.paginationButtons}>
                                <TouchableOpacity style={styles.paginationButton}><Text style={styles.paginationButtonText}>Previous</Text></TouchableOpacity>
                                <TouchableOpacity style={[styles.paginationButton, styles.paginationActive]}><Text style={styles.paginationActiveText}>1</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.paginationButton}><Text style={styles.paginationButtonText}>Next</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
            {/* Edit Modal */}
            <EditModal
                visible={isModalVisible}
                faculty={editingFaculty}
                onClose={() => setIsModalVisible(false)}
                onSave={handleUpdateFaculty}
            />
        </View>
    );
}

// 🧩 Styles (No changes in styles needed for functionality)
const { width } = Dimensions.get("window");

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    modalView: {
        width: width > 600 ? 500 : '90%',
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#d1d5db',
        paddingBottom: 10,
        width: '100%',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    modalContentWrapper: {
        width: '100%',
        paddingHorizontal: 10,
    },
    detailSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4b5563',
    },
    pickerPlaceholder: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    pickerText: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '500',
    },
    dropdownMenu: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 250, // Adjust position as needed
        zIndex: 100,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#1f2937',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        gap: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    saveButton: {
        backgroundColor: "#3b82f6", // Blue for Save
    },
    cancelButton: { 
        backgroundColor: "#ef4444", // Red for Cancel/Destructive
        borderWidth: 1,
        borderColor: '#ef4444',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
});

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#e8eef7",
    },
    contentContainer: {
        padding: 20,
    },
    mainContentArea: {
        flexDirection: width > 768 ? "row" : "column",
        gap: 20,
        padding: 2,
    },

    leftPanel: {
        flex: width > 768 ? 0.35 : 1,
        backgroundColor: "#f9fafb",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
    },
    panelTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#020202ff",
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#090a0aff",
        marginBottom: 6,
    },
    inputBase: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 15,
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: "#16a34a",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 10,
        shadowColor: "#16a34a",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    saveButtonText: {
        color: "#ffffffff",
        fontWeight: "700",
        fontSize: 15,
    },

    rightPanel: {
        flex: width > 768 ? 0.65 : 1,
        backgroundColor: "#f9fafb",
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
    },
    filterBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    filterText: {
        fontSize: 14,
        color: "#0b0c0eff",
    },
    filterInput: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 35,
        width: 140,
    },

    tableContainer: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 8,
        overflow: "hidden",
    },
    tableRow: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    tableHeaderRow: {
        backgroundColor: "#1d4ed8",
    },
    tableCell: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        justifyContent: "center",
    },
    columnID: { width: "10%" },
    columnTitle: { width: "35%" },
    columnShortcode: { width: "15%" },
    columnStatus: { width: "15%" },
    columnAction: {
        width: "25%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    cellText: {
        fontSize: 13,
        color: "#111827",
    },
    headerText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
    },

    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    actionButtons: {
        flexDirection: "row",
        gap: 5,
    },
    actionButton: {
        padding: 5,
        backgroundColor: "#f3f4f6",
        borderRadius: 6,
        elevation: 2,
    },

    paginationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    paginationText: {
        fontSize: 13,
        color: "#6b7280",
    },
    paginationButtons: {
        flexDirection: "row",
        gap: 10,
    },
    paginationButton: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: "#fff",
    },
    paginationActive: {
        backgroundColor: "#1d4ed8",
        borderColor: "#1d4ed8",
    },
    paginationButtonText: {
        color: "#374151",
        fontSize: 13,
    },
    paginationActiveText: {
        color: "#ffffffff",
        fontSize: 13,
    },
});