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
interface Program {
    id: number;
    title: string;
    shortcode: string;
    faculty: string;
    status: "Active" | "Pending" | "Inactive";
}

// --- Mock Data: Updated for Program List ---
const mockPrograms: Program[] = [
    { id: 1, title: "Accounting And Finance", shortcode: "0006", faculty: "Business & Economics", status: "Active" },
    { id: 2, title: "Auditing", shortcode: "004", faculty: "Business & Economics", status: "Active" },
    { id: 3, title: "B.pharmacy", shortcode: "B.pharm 0001", faculty: "Pharmacy", status: "Active" },
    { id: 4, title: "Civil Engineering", shortcode: "CE", faculty: "Faculty of Engineering", status: "Active" },
    { id: 5, title: "Computer Engineering", shortcode: "CSE", faculty: "Faculty of Engineering", status: "Active" },
    { id: 6, title: "Computer Science", shortcode: "CSIT", faculty: "Computer Science & IT", status: "Active" },
    { id: 7, title: "Contemporary Design", shortcode: "CDFA", faculty: "Faculty of Art", status: "Active" },
    { id: 8, title: "ddd", shortcode: "DD", faculty: "fff", status: "Active" },
    { id: 9, title: "English Studies", shortcode: "ES", faculty: "Faculty of Humanities", status: "Active" },
    { id: 10, title: "Fine Arts and Design", shortcode: "FAD", faculty: "Faculty of Humanities", status: "Active" },
];

const ALL_STATUSES: Program['status'][] = ["Active", "Pending", "Inactive"];
const ALL_FACULTIES: string[] = ["Business & Economics", "Computer Science & IT", "Faculty of Engineering", "Pharmacy", "Faculty of Art", "Faculty of Humanities", "fff"]; // Mock faculty list for the create form

// --- Helper Components ---

const StatusBadge: React.FC<{ status: Program["status"] }> = ({ status }) => {
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

// 1. Edit/View Modal Component (Logic Unchanged)
interface EditModalProps {
    visible: boolean;
    program: Program | null;
    onClose: () => void;
    onSave: (updatedProgram: Program) => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, program, onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [shortcode, setShortcode] = useState("");
    const [faculty, setFaculty] = useState("");
    const [status, setStatus] = useState<Program['status']>("Active");
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
    const [isFacultyMenuOpen, setIsFacultyMenuOpen] = useState(false);

    useEffect(() => {
        if (program) {
            setTitle(program.title);
            setShortcode(program.shortcode);
            setFaculty(program.faculty);
            setStatus(program.status);
        }
    }, [program]);

    const handleSave = () => {
        if (!program) return;
        if (!title.trim() || !faculty.trim()) {
            Alert.alert("Error", "Title and Faculty cannot be empty.");
            return;
        }
        const updatedProgram: Program = {
            ...program,
            title: title.trim(),
            shortcode: shortcode.trim(),
            faculty: faculty.trim(),
            status: status,
        };
        onSave(updatedProgram);
    };

    if (!program) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <Text style={modalStyles.modalTitle}>Edit Program: #{program.id}</Text>

                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <Icon name="x" size={24} color="#6b7280" />
                    </TouchableOpacity>

                    <ScrollView style={{ maxHeight: 350, width: '100%' }}>
                        <View style={modalStyles.modalContentWrapper}>
                            {/* View Details Section */}
                            <View style={modalStyles.detailSection}>
                                <Text style={modalStyles.detailLabel}>Current Status:</Text>
                                <StatusBadge status={program.status} />
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
                            
                            {/* Faculty Dropdown */}
                            <Text style={styles.inputLabel}>Faculty *</Text>
                            <TouchableOpacity
                                style={modalStyles.pickerPlaceholder}
                                onPress={() => { setIsFacultyMenuOpen(!isFacultyMenuOpen); setIsStatusMenuOpen(false); }}
                            >
                                <Text style={modalStyles.pickerText}>{faculty || "Select Faculty"}</Text>
                                <Icon 
                                    name={isFacultyMenuOpen ? "chevron-up" : "chevron-down"} 
                                    size={20} 
                                    color="#6b7280" 
                                />
                            </TouchableOpacity>

                            {/* Faculty Dropdown Menu */}
                            {isFacultyMenuOpen && (
                                <View style={[modalStyles.dropdownMenu, { top: 310 }]}>
                                    {ALL_FACULTIES.map(f => (
                                        <TouchableOpacity
                                            key={f}
                                            style={modalStyles.dropdownItem}
                                            onPress={() => {
                                                setFaculty(f);
                                                setIsFacultyMenuOpen(false);
                                            }}
                                        >
                                            <Text style={modalStyles.dropdownItemText}>{f}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                            
                            {/* Status Dropdown */}
                            <Text style={styles.inputLabel}>Status</Text>
                            <TouchableOpacity
                                style={modalStyles.pickerPlaceholder}
                                onPress={() => { setIsStatusMenuOpen(!isStatusMenuOpen); setIsFacultyMenuOpen(false); }}
                            >
                                <Text style={modalStyles.pickerText}>{status}</Text>
                                <Icon 
                                    name={isStatusMenuOpen ? "chevron-up" : "chevron-down"} 
                                    size={20} 
                                    color="#6b7280" 
                                />
                            </TouchableOpacity>

                            {/* Status Dropdown Menu */}
                            {isStatusMenuOpen && (
                                <View style={[modalStyles.dropdownMenu, { top: 400 }]}>
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

// 2. Table Row Component (Logic Unchanged)
const TableRow: React.FC<{ data: Program; isHeader?: boolean; onEditClick?: (program: Program) => void }> = ({ data, isHeader = false, onEditClick }) => (
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
        <View style={[styles.tableCell, styles.columnFaculty]}>
            <Text style={[styles.cellText, isHeader && styles.headerText]}>
                {isHeader ? "Faculty" : data.faculty}
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
export default function ProgramScreen() {
    const [programs, setPrograms] = useState<Program[]>(mockPrograms);
    // New state for Search Term
    const [searchTerm, setSearchTerm] = useState(""); 
    
    // States for Create Form
    const [newProgramTitle, setNewProgramTitle] = useState("");
    const [newProgramShortcode, setNewProgramShortcode] = useState("");
    const [newProgramFaculty, setNewProgramFaculty] = useState("");
    const [isFacultyMenuOpen, setIsFacultyMenuOpen] = useState(false);

    // States for Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProgram, setEditingProgram] = useState<Program | null>(null);

    // --- Search Logic ---
    const filteredPrograms = useMemo(() => {
        if (!searchTerm.trim()) {
            return programs;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        return programs.filter(program => 
            program.title.toLowerCase().includes(lowerCaseSearch) ||
            program.shortcode.toLowerCase().includes(lowerCaseSearch) ||
            program.faculty.toLowerCase().includes(lowerCaseSearch) ||
            program.status.toLowerCase().includes(lowerCaseSearch)
        );
    }, [programs, searchTerm]);
    // -------------------

    const handleSaveNew = () => {
        if (!newProgramTitle.trim() || !newProgramFaculty.trim()) {
             Alert.alert("Validation", "Program Title and Faculty are required.");
             return;
        }

        const newProgram: Program = {
            id: programs.length + 1,
            title: newProgramTitle.trim(),
            shortcode: newProgramShortcode.trim() || "N/A",
            faculty: newProgramFaculty.trim(),
            status: "Active",
        };
        setPrograms([newProgram, ...programs]);
        setNewProgramTitle("");
        setNewProgramShortcode("");
        setNewProgramFaculty("");
        Alert.alert("Success", `${newProgram.title} added!`);
    };

    const handleEditClick = (program: Program) => {
        setEditingProgram(program);
        setIsModalVisible(true);
    };

    const handleUpdateProgram = (updatedProgram: Program) => {
        setPrograms(
            programs.map(p => (p.id === updatedProgram.id ? updatedProgram : p))
        );
        setIsModalVisible(false);
        setEditingProgram(null);
        Alert.alert("Success", `Program ${updatedProgram.title} updated!`);
    };

    const headerData: Program = {
        id: 0,
        title: "Title",
        shortcode: "Shortcode",
        faculty: "Faculty",
        status: "Active",
    };

    return (
        <View style={styles.screenContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.mainContentArea}>
                    
                    {/* Left Panel: Create Program */}
                    <View style={styles.leftPanel}>
                        <Text style={styles.panelTitle}>🎓 Create Program</Text>
                        
                        {/* Faculty Selection in Create Form */}
                        <Text style={styles.inputLabel}>Faculty *</Text>
                        <TouchableOpacity
                            style={[modalStyles.pickerPlaceholder, { marginBottom: 15 }]}
                            onPress={() => setIsFacultyMenuOpen(!isFacultyMenuOpen)}
                        >
                            <Text style={modalStyles.pickerText}>{newProgramFaculty || "Select Faculty"}</Text>
                            <Icon 
                                name={isFacultyMenuOpen ? "chevron-up" : "chevron-down"} 
                                size={20} 
                                color="#6b7280" 
                            />
                        </TouchableOpacity>

                        {/* Faculty Dropdown Menu for Create Form */}
                        {isFacultyMenuOpen && (
                            <View style={[modalStyles.dropdownMenu, { position: 'absolute', top: 125, width: '90%', zIndex: 10 }]}> 
                                {ALL_FACULTIES.map(f => (
                                    <TouchableOpacity
                                        key={f}
                                        style={modalStyles.dropdownItem}
                                        onPress={() => {
                                            setNewProgramFaculty(f);
                                            setIsFacultyMenuOpen(false);
                                        }}
                                    >
                                        <Text style={modalStyles.dropdownItemText}>{f}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        
                        <Text style={styles.inputLabel}>Title *</Text>
                        <TextInput
                            style={styles.inputBase}
                            placeholder="Enter Program Title"
                            value={newProgramTitle}
                            onChangeText={setNewProgramTitle}
                        />
                        <Text style={styles.inputLabel}>Shortcode *</Text>
                        <TextInput
                            style={styles.inputBase}
                            placeholder="Shortcode"
                            value={newProgramShortcode}
                            onChangeText={setNewProgramShortcode}
                        />
                        <TouchableOpacity onPress={handleSaveNew} style={styles.saveButton}>
                            <Icon name="save" size={16} color="#fff" />
                            <Text style={styles.saveButtonText}> Save</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Right Panel: Program List */}
                    <View style={styles.rightPanel}>
                        <Text style={styles.panelTitle}>📋 Program List</Text>
                        <View style={styles.filterBar}>
                            <Text style={styles.filterText}>Show {filteredPrograms.length} entries</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={[styles.filterText, { marginRight: 5 }]}>Search:</Text>
                                {/* Search Input: Added value and onChangeText */}
                                <TextInput 
                                    style={styles.filterInput} 
                                    placeholder="Search..." 
                                    value={searchTerm}
                                    onChangeText={setSearchTerm} // Updates search term, which triggers filtering
                                />
                            </View>
                        </View>
                        <View style={styles.tableContainer}>
                            <TableRow data={headerData} isHeader />
                            {/* Rendering filteredPrograms instead of 'programs' */}
                            {filteredPrograms.map((p) => (
                                <TableRow key={p.id} data={p} onEditClick={handleEditClick} />
                            ))}
                        </View>
                        <View style={styles.paginationContainer}>
                            <Text style={styles.paginationText}>Showing 1 to {filteredPrograms.length} of {programs.length} entries</Text>
                            {/* Pagination buttons logic not implemented, kept for structure */}
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
                program={editingProgram}
                onClose={() => setIsModalVisible(false)}
                onSave={handleUpdateProgram}
            />
        </View>
    );
}

// 🧩 Styles (No changes needed here for functionality, keeping the previous styles)
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
        backgroundColor: "#3b82f6",
    },
    cancelButton: { 
        backgroundColor: "#ef4444",
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
        // Added padding/margin to align it better in the row
        marginLeft: 5,
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
    columnID: { width: "7%" },
    columnTitle: { width: "30%" },
    columnShortcode: { width: "15%" },
    columnFaculty: { width: "20%" },
    columnStatus: { width: "13%" },
    columnAction: {
        width: "15%",
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