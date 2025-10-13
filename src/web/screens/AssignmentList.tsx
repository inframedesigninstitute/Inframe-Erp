import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// 1. **IMPORT:** DocumentPicker को यहां इंपोर्ट करें
import * as DocumentPicker from 'expo-document-picker';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = width > 700 ? 3 : 2; 

// --- Data Structure (No Change) ---
interface Assignment {
    id: string;
    title: string;
    course: string;
    session: string;
    semester: string;
    startDate: string;
    endDate: string;
    status: 'Submitted' | 'Pending';
    initialColor: string; // Card color for UI
}
type NewAssignmentData = Omit<Assignment, 'id'>;

// Initial Data (No Change)
const initialAssignments: Assignment[] = [
    {
        id: '1',
        title: 'Assignment of Arts ',
        course: 'EN105',
        session: 'Spring-2022',
        semester: '1st Semester 2018',
        startDate: '04-10-2022',
        endDate: '13-10-2022',
        status: 'Submitted',
        initialColor: '#7a42f4',
    },
    {
        id: '2',
        title: 'Assignment of Design',
        course: 'EN105',
        session: 'Spring-2022',
        semester: '1st Semester 2018',
        startDate: '04-10-2022',
        endDate: '08-10-2022',
        status: 'Pending',
        initialColor: '#a64dff',
    },
];

// --- Assignment Card Component (No Change) ---
const AssignmentCard: React.FC<{ item: Assignment }> = ({ item }) => {
    const statusBgColor = item.status === 'Submitted' ? '#00c851' : '#ff6666'; 
    const initial = item.course.charAt(0);

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={[styles.initialCircle, { backgroundColor: item.initialColor }]}>
                    <Text style={styles.initialText}>{initial}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <Text style={styles.assignmentTitle}>{item.title}</Text>
                <Text style={styles.assignmentDetail}>{item.course} ({item.session})</Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Feather name="calendar" size={14} color="#666" style={{marginRight: 5}}/>
                    <Text style={styles.countLabel}>Due: </Text>
                    <Text style={styles.assignmentDate}>{item.endDate}</Text>
                </View>
            </View>
        </View>
    );
};

// --- CORRECTED Assignment Submission Modal Component with Real File Picker Logic ---
interface SubmissionModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (newAssignment: NewAssignmentData) => void;
}

const AssignmentSubmissionModal: React.FC<SubmissionModalProps> = ({ isVisible, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [course, setCourse] = useState('');
    const [endDate, setEndDate] = useState('');
    const [fileName, setFileName] = useState(''); // State for File Info

    // 2. **UPDATED:** Real Document Picker Logic
    const handleFilePick = async () => {
        try {
            // 'type' में आप फ़ाइलों के प्रकार निर्दिष्ट कर सकते हैं। 
            // '*/*' सभी प्रकार की फ़ाइलों की अनुमति देता है।
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', 
                copyToCacheDirectory: false, // फ़ाइल को कैश में कॉपी न करें
            });

            // जांचें कि उपयोगकर्ता ने चयन रद्द नहीं किया है और कोई एसेट (asset) चुना गया है।
            if (result.canceled === false && result.assets && result.assets.length > 0) {
                // फ़ाइल का नाम दिखाएँ
                setFileName(result.assets[0].name);
                alert(`File selected: ${result.assets[0].name}`);
                // **NOTE:** यहां result.assets[0].uri में फ़ाइल का स्थानीय पथ (local path) है
            } else {
                setFileName('');
                // alert('File selection cancelled or failed.'); // इसे हटा सकते हैं
            }
        } catch (err) {
            console.error('Document Picker Error:', err);
            alert('Error picking file. Check console.');
        }
    };

    const handleSubmit = () => {
        if (!title || !course || !endDate) {
            alert('Please fill in Assignment Title, Course Code, and Due Date.');
            return;
        }

        const newAssignment: NewAssignmentData = {
            // Include file name in title if a file was selected
            title: title + (fileName ? ` (Attached: ${fileName})` : ''), 
            course: course.toUpperCase(), 
            session: 'Current-2025', 
            semester: 'Current Semester', 
            startDate: new Date().toLocaleDateString('en-GB'), 
            endDate, 
            status: 'Submitted', 
            initialColor: '#00c851', 
        };
        
        onSubmit(newAssignment);

        // Reset form and close modal
        setTitle('');
        setCourse('');
        setEndDate('');
        setFileName(''); 
        onClose(); 
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    <View style={modalStyles.modalHeader}>
                        <Text style={modalStyles.modalTitle}>Submit New Assignment</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={modalStyles.formContainer}>
                        <Text style={modalStyles.label}>Assignment Title</Text>
                        <TextInput
                            style={modalStyles.input}
                            onChangeText={setTitle}
                            value={title}
                            placeholder="e.g., Final Project Report"
                        />
                        
                        <Text style={modalStyles.label}>Course Code</Text>
                        <TextInput
                            style={modalStyles.input}
                            onChangeText={setCourse}
                            value={course}
                            placeholder="e.g., CS501"
                            autoCapitalize="characters"
                        />

                        <Text style={modalStyles.label}>Due Date (DD-MM-YYYY)</Text>
                        <TextInput
                            style={modalStyles.input}
                            onChangeText={setEndDate}
                            value={endDate}
                            placeholder="e.g., 20-12-2025"
                            keyboardType="numbers-and-punctuation"
                        />
                        
                        {/* **FILE UPLOAD SECTION** */}
                        <Text style={modalStyles.label}>Assignment File (PC/Mobile)</Text>
                        <View style={modalStyles.fileInputContainer}>
                            <TouchableOpacity 
                                style={modalStyles.fileChooseButton} 
                                onPress={handleFilePick} // Calls real file picker
                            >
                                <Feather name="upload-cloud" size={16} color="#fff" />
                                <Text style={modalStyles.fileChooseText}>Choose File</Text>
                            </TouchableOpacity>
                            <Text style={modalStyles.fileNameText} numberOfLines={1}>
                                **{fileName ? fileName : 'No file selected'}**
                            </Text>
                        </View>
                        {/* **END OF FILE UPLOAD SECTION** */}

                    </ScrollView>

                    <TouchableOpacity
                        style={modalStyles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={modalStyles.submitButtonText}>Submit Assignment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


// --- AssignmentCardGridScreen Component (No Change) ---
const AssignmentCardGridScreen: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddAssignment = (newAssignmentData: NewAssignmentData) => {
        const newId = (assignments.length + 1).toString();
        
        const completeNewAssignment: Assignment = {
            ...newAssignmentData,
            id: newId,
        };

        setAssignments([completeNewAssignment, ...assignments]);
    };


    const renderCard = ({ item }: { item: Assignment }) => <AssignmentCard item={item} />;

    return (
        <View style={styles.screenContainer}>
            <View style={styles.backgroundWave} />
            
            <View style={[styles.contentContainer, {marginTop: 40}]}> 
                
                <View style={styles.contentHeader}>
                    <View>
                        <Text style={styles.mainTitle}>Assignment List</Text>
                    </View>
                    <View style={styles.actionButtons}>
                        
                        <TouchableOpacity 
                            style={styles.addButton}
                            onPress={() => setIsModalVisible(true)} 
                        >
                            <Feather name="plus" size={20} color="#fff" />
                        </TouchableOpacity>
                    
                        <TouchableOpacity style={styles.filterButton}>
                            <Feather name="filter" size={16} color="#fff" />
                            <Text style={styles.filterButtonText}> Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* **Modal Component** */}
                <AssignmentSubmissionModal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onSubmit={handleAddAssignment}
                />

                <FlatList
                    data={assignments}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id}
                    numColumns={NUM_COLUMNS}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.cardList}
                />

                <View style={styles.bottomPagination}>
                    <View style={styles.paginationButtons}>
                        <Text style={styles.paginationText}>&lt; previous</Text>
                        <Text style={styles.paginationNumber}>1</Text>
                        <Text style={styles.paginationNumberActive}>2</Text>
                        <Text style={styles.paginationNumber}>3</Text>
                        <Text style={styles.paginationText}>next &gt;</Text>
                    </View>
                </View>
                <Text style={styles.footerText}>techtown</Text>
            </View>
        </View>
    );
};


// --- Styles (No Change) ---
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8', 
    },
    backgroundWave: {
        backgroundColor: '#e6e0f8', 
        height: '100%',
        width: '100%',
        position: 'absolute',
        opacity: 0.8,
    },
    
    contentContainer: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff', 
        margin: 20, 
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#ff6666', 
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: '#a64dff', 
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },

    cardList: {
        paddingVertical: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: -5,
    },
    card: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    initialCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5, 
    },
    statusText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    cardBody: {
        marginTop: 5,
    },
    assignmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    assignmentDetail: {
        fontSize: 12,
        color: '#999',
        marginBottom: 8,
    },
    assignmentDate: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    countLabel: {
        fontSize: 14,
        color: '#666',
    },

    bottomPagination: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        paddingRight: 10,
    },
    paginationButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paginationText: {
        fontSize: 14,
        color: '#999',
        marginHorizontal: 8,
    },
    paginationNumber: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        fontSize: 14,
        color: '#999',
    },
    paginationNumberActive: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#a64dff',
        borderWidth: 1,
        borderColor: '#a64dff',
        borderRadius: 4,
    },
    footerText: {
        fontSize: 12,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 20,
    }
});


// --- Modal Specific Styles (No Change) ---
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 25,
        alignItems: 'stretch',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.9, 
        maxWidth: 500, 
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        maxHeight: 300, 
        paddingVertical: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    // Styles for file input
    fileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 5,
    },
    fileChooseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff6666', 
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
    },
    fileChooseText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 14,
    },
    fileNameText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#a64dff', 
        borderRadius: 25,
        padding: 15,
        elevation: 2,
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});


export default AssignmentCardGridScreen;