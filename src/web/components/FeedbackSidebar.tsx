import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, // Added Modal
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// --- INTERFACES ---
interface GradeItem {
    id: number;
    label: string;
    points: number;
}

interface FeedbackSidebarProps {
    initialGradeItems?: GradeItem[];
    initialNotes?: string;
    maxCharacters?: number;
}

// --- SUB-COMPONENTS ---
const PanelButton: React.FC<{ icon: string; label: string; onPress: () => void; style?: object }> = ({ icon, label, onPress, style }) => (
    <TouchableOpacity style={[sidebarStyles.panelButton, style]} onPress={onPress}>
        <Icon name={icon} size={16} color="#00C4FF" />
        <Text style={sidebarStyles.panelButtonText}>{label}</Text>
    </TouchableOpacity>
);

const EvaluationPoint: React.FC<{ item: GradeItem; onDelete: (id: number) => void }> = ({ item, onDelete }) => (
    <View style={sidebarStyles.evaluationPoint}>
        <Text style={sidebarStyles.evalLabel}>{item.label}</Text>
        <View style={sidebarStyles.evalRightContainer}>
            <Text style={sidebarStyles.evalPoints}>{item.points}</Text>
            {/* 3. Individual Point Delete Logic - Icon changed to 'x' is already correct */}
            <TouchableOpacity onPress={() => onDelete(item.id)} style={{ marginLeft: 15 }}>
                <Icon name="x" size={16} color="#FF6347" /> 
            </TouchableOpacity>
        </View>
    </View>
);

// --- MODALS FOR INTERACTIVITY ---

// Custom Modal to replace Alert.prompt (Fixes 'Alert.default.prompt is not a function' on Web)
const PointInputModal: React.FC<{
    isVisible: boolean;
    onClose: () => void;
    onAdd: (label: string, points: number) => void;
}> = ({ isVisible, onClose, onAdd }) => {
    const [label, setLabel] = useState('');
    const [points, setPoints] = useState('');

    const handleAdd = () => {
        const pointValue = Number(points.trim());
        if (label.trim() && !isNaN(pointValue) && pointValue >= 0) {
            onAdd(label.trim(), pointValue);
            setLabel('');
            setPoints('');
            onClose();
        } else {
            Alert.alert('Invalid Input', 'Please enter a valid label and a non-negative number for points.');
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={sidebarStyles.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={sidebarStyles.modalView}>
                            <Text style={sidebarStyles.modalTitle}>Add New Point</Text>
                            <TextInput
                                style={sidebarStyles.modalInput}
                                onChangeText={setLabel}
                                value={label}
                                placeholder="Criterion Label (e.g., Clarity)"
                                placeholderTextColor="#999"
                            />
                            <TextInput
                                style={sidebarStyles.modalInput}
                                onChangeText={setPoints}
                                value={points}
                                placeholder="Points (e.g., 15)"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                            />
                            <View style={sidebarStyles.modalButtonGroup}>
                                <TouchableOpacity style={[sidebarStyles.modalButton, { backgroundColor: '#FF6347' }]} onPress={onClose}>
                                    <Text style={sidebarStyles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[sidebarStyles.modalButton, { backgroundColor: '#00C4FF' }]} onPress={handleAdd}>
                                    <Text style={sidebarStyles.modalButtonText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

// Placeholder Modal for Audio/Video functionality
const MediaModal: React.FC<{
    isVisible: boolean;
    onClose: () => void;
    type: 'audio' | 'video';
}> = ({ isVisible, onClose, type }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
    >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={sidebarStyles.centeredView}>
                <TouchableWithoutFeedback>
                    <View style={sidebarStyles.modalView}>
                        <Text style={sidebarStyles.modalTitle}>Add {type === 'audio' ? 'Audio' : 'Video'}</Text>
                        <Text style={sidebarStyles.modalDescription}>
                            In a real app, this screen would contain native logic for:
                        </Text>
                        <View style={sidebarStyles.modalList}>
                            <Text style={sidebarStyles.modalListItem}>• Start **{type} recording**</Text>
                            <Text style={sidebarStyles.modalListItem}>• **Select {type} file** from device</Text>
                        </View>
                        
                        <TouchableOpacity style={[sidebarStyles.modalButton, { backgroundColor: '#00C4FF', marginTop: 20 }]} onPress={onClose}>
                            <Text style={sidebarStyles.modalButtonText}>Close (Simulate {type} Added)</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
);

// --- MAIN COMPONENT ---
const FeedbackSidebar: React.FC<FeedbackSidebarProps> = ({
    initialGradeItems = [
        { id: 1, label: 'Quality of Content', points: 25 },
        { id: 2, label: 'Design Execution', points: 30 },
        { id: 3, label: 'Code Efficiency', points: 20 },
    ],
    initialNotes = "Initial review note.",
    maxCharacters = 500
}) => {
    
    const [gradeItems, setGradeItems] = useState<GradeItem[]>(initialGradeItems);
    const [notes, setNotes] = useState(initialNotes);
    const [isCollapsed, setIsCollapsed] = useState(false); // State for Collapse/Expand
    const [isPointModalVisible, setPointModalVisible] = useState(false); // State for New Point Modal
    const [isMediaModalVisible, setMediaModalVisible] = useState(false); // State for Media Modal
    const [mediaType, setMediaType] = useState<'audio' | 'video'>('audio');

    const charactersLeft = maxCharacters - notes.length;

    // --- HANDLERS ---
    
    const handleNoteChange = (text: string) => {
        if (text.length <= maxCharacters) {
            setNotes(text);
        }
    };

    // Handler for New Point Modal
    const handleAddPoint = (label: string, points: number) => {
        const newPoint: GradeItem = {
            id: Date.now(),
            label: label,
            points: points,
        };
        setGradeItems(prev => [...prev, newPoint]);
        setIsCollapsed(false); // Show the list after adding
    };

    const handleDeletePoint = (id: number) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this evaluation point?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => setGradeItems(prev => prev.filter(item => item.id !== id)), style: 'destructive' },
            ]
        );
    };

    const handleMediaClick = (type: 'audio' | 'video') => {
        setMediaType(type);
        setMediaModalVisible(true);
    };

    // Toggle Collapse/Expand
    const toggleCollapse = () => {
        setIsCollapsed(prev => !prev);
    };


    return (
        <ScrollView contentContainerStyle={sidebarStyles.scrollViewContent}>
            <View style={sidebarStyles.panelContainer}>
                
                {/* 1. Correction Section (Audio/Video) */}
                <View style={sidebarStyles.section}>
                    <Text style={sidebarStyles.sectionTitle}>Correction</Text>
                    <Text style={sidebarStyles.sectionDescription}>
                        You have the option to submit your revisions in the form of audio or video.
                    </Text>
                    <View style={sidebarStyles.buttonGroup}>
                        <PanelButton 
                            icon="mic" 
                            label="Audio" 
                            onPress={() => handleMediaClick('audio')} 
                            style={{ marginRight: 5 }} 
                        />
                        <PanelButton 
                            icon="video" 
                            label="Video" 
                            onPress={() => handleMediaClick('video')} 
                            style={{ marginLeft: 5 }} 
                        />
                    </View>
                </View>

                {/* 2. Notes Section (User Input) */}
                <View style={sidebarStyles.section}>
                    <Text style={sidebarStyles.sectionTitle}>Notes</Text>
                    <Text style={sidebarStyles.sectionDescription}>Feel free to provide a brief review.</Text>
                    <View style={sidebarStyles.notesBox}>
                        <TextInput
                            style={sidebarStyles.notesText}
                            value={notes}
                            onChangeText={handleNoteChange}
                            placeholder="Write your review here..."
                            placeholderTextColor="#B0D9E880"
                            multiline={true}
                            maxLength={maxCharacters}
                        />
                    </View>
                    <Text style={sidebarStyles.charsLeft}>{charactersLeft} characters left</Text>
                </View>

                {/* 3. Evaluation Criteria Section (Dropdown/Collapse Logic) */}
                <View style={sidebarStyles.section}>
                    <TouchableOpacity onPress={toggleCollapse} style={sidebarStyles.evalHeader}>
                        <Text style={sidebarStyles.sectionTitle}>Evaluation criteria</Text>
                        <Icon 
                            name={isCollapsed ? "chevron-up" : "chevron-down"} 
                            size={24} 
                            color="#FFFFFF" 
                        />
                    </TouchableOpacity>
                    
                    {/* Collapsible Content */}
                    {!isCollapsed && (
                        <View>
                            {/* Dynamic List of Points */}
                            {gradeItems.map((item) => (
                                <EvaluationPoint 
                                    key={item.id} 
                                    item={item} 
                                    onDelete={handleDeletePoint} 
                                />
                            ))}
                            
                            {/* Add New Point Button */}
                            <View style={sidebarStyles.newPointContainer}>
                                <TouchableOpacity onPress={() => setGradeItems([])}> {/* Clear all points for quick delete */}
                                    <Icon name="trash-2" size={20} color="#FF6347" style={{ marginRight: 15 }} />
                                </TouchableOpacity>

                                <PanelButton 
                                    icon="plus" 
                                    label="New points" 
                                    onPress={() => setPointModalVisible(true)} // Open the custom Modal
                                    style={{flex: 1, paddingHorizontal: 20}}
                                />
                            </View>
                        </View>
                    )}
                </View>

                {/* 4. Final Action */}
                <TouchableOpacity style={sidebarStyles.finalActionButton} onPress={() => console.log('Final Correction Submitted')}>
                    <Icon name="check-square" size={18} color="#FFFFFF" style={{ marginRight: 10 }} />
                    <Text style={sidebarStyles.finalActionText}>Correction</Text>
                </TouchableOpacity>

            </View>
            
            {/* RENDER MODALS */}
            <PointInputModal 
                isVisible={isPointModalVisible}
                onClose={() => setPointModalVisible(false)}
                onAdd={handleAddPoint}
            />
            <MediaModal
                isVisible={isMediaModalVisible}
                onClose={() => setMediaModalVisible(false)}
                type={mediaType}
            />
        </ScrollView>
    );
};

// --- STYLES ---
const sidebarStyles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    panelContainer: {
        backgroundColor: '#033950',
        padding: 20,
        borderRadius: 12,
        margin: 10,
    },
    section: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#055470',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    sectionDescription: {
        fontSize: 14,
        color: '#B0D9E8',
        marginBottom: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    panelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#055470',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#00C4FF',
        flex: 1,
        justifyContent: 'center',
    },
    panelButtonText: {
        color: '#00C4FF',
        fontWeight: '600',
        marginLeft: 5,
    },
    notesBox: {
        backgroundColor: '#055470',
        padding: 10,
        borderRadius: 8,
        minHeight: 100,
        borderWidth: 1,
        borderColor: '#055470',
    },
    notesText: {
        color: '#FFFFFF',
        fontSize: 14,
        padding: 5,
        minHeight: 90,
        textAlignVertical: 'top',
    },
    charsLeft: {
        color: '#B0D9E8',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'right',
    },
    evalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    evaluationPoint: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#055470',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    evalLabel: {
        color: '#FFFFFF',
        fontSize: 15,
        flex: 1,
    },
    evalRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    evalPoints: {
        color: '#00C4FF',
        fontWeight: '700',
        fontSize: 15,
    },
    newPointContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    finalActionButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00C4FF',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    finalActionText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    // --- MODAL STYLES ---
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dim background
    },
    modalView: {
        margin: 20,
        backgroundColor: '#033950',
        borderRadius: 12,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    modalInput: {
        height: 40,
        borderColor: '#00C4FF',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        color: '#FFFFFF',
        backgroundColor: '#055470',
    },
    modalButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    modalButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalDescription: {
        color: '#B0D9E8',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalList: {
        alignSelf: 'flex-start',
        width: '100%',
        paddingLeft: 10,
    },
    modalListItem: {
        color: '#FFFFFF',
        fontSize: 14,
        marginVertical: 3,
    }
});

export default FeedbackSidebar;