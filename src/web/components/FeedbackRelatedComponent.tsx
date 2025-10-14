import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// --- HELPER FUNCTION TO GET ICON BASED ON FILE EXTENSION ---
const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    switch (extension) {
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'txt':
            return 'file-text';
        case 'mp4':
        case 'mov':
        case 'avi':
            return 'monitor';
        case 'fig':
        case 'sketch':
        case 'psd':
            return 'cpu';
        case 'zip':
        case 'rar':
            return 'package';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return 'image';
        case 'code':
        case 'js':
        case 'ts':
        case 'jsx':
        case 'tsx':
            return 'code';
        default:
            return 'file';
    }
};

// --- PROPS INTERFACE ---
interface FileUploadItem {
    id: string;
    name: string;
    size: string;
    progress: number; // 0 to 100
    isComplete: boolean;
    typeIcon: string;
    phase: string; 
}

// --- INTERFACE FOR THE INPUT STATE ---
interface InputState {
    [key: string]: string; 
    noteMessage: string; 
}

// --- DUMMY DATA ---
const initialFileData: FileUploadItem[] = [
    { id: '1', name: 'Product design requirements.pdf', size: '200 KB', progress: 100, isComplete: true, typeIcon: 'file-text', phase: 'Phase 1' },
    { id: '2', name: 'Dashboard prototype recording.mp4', size: '16 MB', progress: 40, isComplete: false, typeIcon: 'monitor', phase: 'Phase 2' },
    { id: '3', name: 'Dashboard prototype FINAL.fig', size: '4.2 MB', progress: 80, isComplete: false, typeIcon: 'cpu', phase: 'Phase 2' },
];

const initialInputState: InputState = {
    phase1Summary: 'Project Brief for the new dashboard UI.',
    phase2Progress: '80% Complete - Module: Data Viz',
    phase3Conclusion: 'The project met all initial requirements and user goals.',
    noteMessage: 'Attached is my completed portfolio project for your review. Your feedback is greatly appreciated. Thank you.'
};

// --- SUB-COMPONENTS (Mostly Unchanged) ---
const TabSelector: React.FC<{ tabs: string[]; selected: string; onSelect: (tab: string) => void }> = ({ tabs, selected, onSelect }) => (
    <View style={componentStyles.tabSelector}>
        {tabs.map(tab => (
            <TouchableOpacity
                key={tab}
                style={[componentStyles.tab, selected === tab && componentStyles.selectedTab]}
                onPress={() => onSelect(tab)}
            >
                <Text style={[componentStyles.tabText, selected === tab && componentStyles.selectedTabText]}>{tab}</Text>
            </TouchableOpacity>
        ))}
    </View>
);

const UploadedFileItem: React.FC<{ item: FileUploadItem; onDelete: (id: string) => void }> = ({ item, onDelete }) => (
    <View style={componentStyles.fileItemContainer}>
        <View style={componentStyles.fileInfo}>
            <Icon name={item.typeIcon} size={20} color="#333" style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
                <Text style={componentStyles.fileName}>{item.name}</Text>
                <Text style={componentStyles.fileSize}>{item.size}</Text>
                <View style={componentStyles.progressBarWrapper}>
                    <View style={[componentStyles.progressBar, { width: `${item.progress}%` }]} />
                </View>
            </View>
        </View>
        <View style={componentStyles.fileActions}>
            {item.isComplete ? (
                <Icon name="check-circle" size={20} color="#38A169" />
            ) : (
                <Text style={componentStyles.fileProgress}>{item.progress}%</Text>
            )}
            <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => onDelete(item.id)}> 
                <Icon name="trash-2" size={20} color="#A0AEC0" />
            </TouchableOpacity>
        </View>
    </View>
);

const InputField: React.FC<{ 
    label: string; 
    placeholder: string; 
    value: string; 
    icon: string; 
    onChangeText: (text: string) => void; 
}> = ({ label, placeholder, value, icon, onChangeText }) => (
    <View style={componentStyles.inputRow}>
        <Text style={componentStyles.inputLabel}>{label}</Text>
        <View style={componentStyles.inputBox}>
            <Icon name={icon} size={18} color="#A0AEC0" style={{ marginRight: 10 }} />
            <TextInput
                style={componentStyles.textInput}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </View>
    </View>
);

const CheckboxItem: React.FC<{ label: string }> = ({ label }) => (
    <View style={componentStyles.checkboxContainer}>
        <TouchableOpacity style={componentStyles.checkbox} onPress={() => Alert.alert('Checkbox', `Toggled ${label}`)}>
            <Icon name="square" size={18} color="#718096" />
        </TouchableOpacity>
        <Text style={componentStyles.checkboxLabel}>{label}</Text>
    </View>
);

const NoteAndCheckboxSection: React.FC<{
    noteMessage: string;
    setNoteMessage: (text: string) => void;
}> = ({ noteMessage, setNoteMessage }) => (
    <View> 
        {/* Note Section */}
        <Text style={componentStyles.inputLabel}>Note</Text>
        <Text style={componentStyles.sectionSubtitle}>Write a short message if necessary.</Text>
        
        <View style={componentStyles.noteInputContainer}>
            <View style={componentStyles.noteHeader}>
                <View style={componentStyles.dropdownContainer}>
                    <Text style={componentStyles.dropdownText}>Normal text</Text>
                    <Icon name="chevron-down" size={16} color="#4C51BF" />
                </View>
                <View style={componentStyles.toolbar}>
                    <Icon name="bold" size={16} color="#718096" style={componentStyles.toolbarIcon} />
                    <Icon name="italic" size={16} color="#718096" style={componentStyles.toolbarIcon} />
                    <Icon name="underline" size={16} color="#718096" style={componentStyles.toolbarIcon} />
                    <Icon name="list" size={16} color="#718096" style={componentStyles.toolbarIcon} />
                    <Icon name="list" size={16} color="#718096" style={componentStyles.toolbarIcon} />
                    <Icon name="link" size={16} color="#718096" style={componentStyles.toolbarIcon} />
                </View>
            </View>
            <TextInput
                style={componentStyles.noteTextInput}
                value={noteMessage} 
                onChangeText={setNoteMessage}
                placeholder="Attached is my completed portfolio project for your review. Your feedback is greatly appreciated. Thank you."
                multiline
                numberOfLines={4}
                maxLength={275}
            />
            <Text style={componentStyles.charCount}>{275 - (noteMessage || '').length} characters left</Text> 
        </View>
        
        {/* Submission Checkboxes */}
        <View style={componentStyles.checkboxGroup}>
            <Text style={componentStyles.checkboxGroupTitle}>Affidavit</Text>
            <CheckboxItem label="I accept the terms and privacy policy." />

            <Text style={componentStyles.checkboxGroupTitle}>Submission instructions</Text>
            <CheckboxItem label="I accept the terms and privacy policy." />

            <Text style={componentStyles.checkboxGroupTitle}>Publication/usage rights</Text>
            <CheckboxItem label="I accept the terms and privacy policy." />
        </View>

        {/* Action Buttons */}
        <View style={componentStyles.buttonContainer}>
            <TouchableOpacity style={componentStyles.saveButton} onPress={() => Alert.alert('Action', 'Work saved!')}>
                <Text style={componentStyles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={componentStyles.submitButton} onPress={() => Alert.alert('Action', 'Work submitted!')}>
                <Text style={componentStyles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
);


// --- PHASE-SPECIFIC CONTENT RENDERER (Updated to use file picker handler) ---
const renderPhaseContent = (
    phase: string, 
    inputState: InputState, 
    setInputState: Dispatch<SetStateAction<InputState>>,
    uploadedFiles: FileUploadItem[],
    showFiles: boolean,
    toggleShowFiles: () => void,
    handleNoteChange: (text: string) => void,
    handleFilePickerClick: () => void, // Changed handler name
    handleFileDelete: (id: string) => void, 
) => {

    const phaseFiles = uploadedFiles.filter(f => f.phase === phase);
    
    let inputKey: keyof InputState = 'phase1Summary';
    let label = '';
    let placeholder = '';
    let icon = '';
    let dropZoneIcon = '';
    let dropZoneText = '';
    let dropZoneHint = '';
    
    switch (phase) {
        case 'Phase 1':
            inputKey = 'phase1Summary';
            label = "Research Summary and Goals";
            placeholder = "Enter research summary and initial goals...";
            icon = "book-open";
            dropZoneIcon = 'archive';
            dropZoneText = 'Click to **upload** or drag and drop initial files';
            dropZoneHint = 'PDF, JPG, or FIGMA links accepted.';
            break;
        case 'Phase 2':
            inputKey = 'phase2Progress';
            label = "Progress Status / Module Code";
            placeholder = "Enter progress percentage or module code...";
            icon = "code";
            dropZoneIcon = 'figma';
            dropZoneText = 'Click to **upload** prototypes and test videos';
            dropZoneHint = 'FIG, MP4, or Sketch files accepted.';
            break;
        case 'Phase 3':
            inputKey = 'phase3Conclusion';
            label = "Project Conclusion and Reflection";
            placeholder = "Summarize key takeaways and final thoughts...";
            icon = "award";
            dropZoneIcon = 'package';
            dropZoneText = 'Click to **upload** final zip or package';
            dropZoneHint = 'ZIP, PDF, or Final Presentation files accepted.';
            break;
        default: 
            inputKey = phase.replace(' ', '').toLowerCase() as keyof InputState;
            label = `${phase} Notes`;
            placeholder = `Enter summary for ${phase}...`;
            icon = "feather";
            dropZoneIcon = 'folder';
            dropZoneText = `Click to **upload** files for ${phase}`;
            dropZoneHint = 'Any file type accepted.';
            break;
    }

    const UploadButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
        <TouchableOpacity style={componentStyles.uploadButton} onPress={onPress}>
            <Icon name="upload" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={componentStyles.uploadButtonText}>Upload Files</Text>
        </TouchableOpacity>
    );

    const ViewFilesButton: React.FC<{ onPress: () => void, isVisible: boolean, count: number }> = ({ onPress, isVisible, count }) => (
        <TouchableOpacity style={componentStyles.viewButton} onPress={onPress}>
            <Icon name={isVisible ? "eye-off" : "eye"} size={16} color="#4C51BF" style={{ marginRight: 5 }} />
            <Text style={componentStyles.viewButtonText}>
                {isVisible ? 'Hide Uploaded Files' : `View Uploaded Files (${count})`}
            </Text>
        </TouchableOpacity>
    );
    
    const content = (
        <View>
            {/* Input Field */}
            <InputField 
                label={label}
                placeholder={placeholder}
                value={inputState[inputKey] || ''}
                icon={icon}
                onChangeText={(text) => setInputState((prev: InputState) => ({ ...prev, [inputKey]: text }))}
            />

            <View style={componentStyles.section}>
                <Text style={componentStyles.inputLabel}>{dropZoneText.split(' **')[0]}</Text>
                <Text style={componentStyles.sectionSubtitle}>
                    {dropZoneHint.replace(' accepted.', ', or other files accepted.')}
                </Text>
                
                {/* Drop Zone / Upload Area - Triggers the File Picker */}
                <TouchableOpacity 
                    style={componentStyles.dropZone} 
                    onPress={handleFilePickerClick} // Uses the passed handler
                >
                    <Icon name={dropZoneIcon} size={30} color="#4C51BF" />
                    <Text style={componentStyles.uploadText}>
                        Click to **upload** or drag and drop initial files
                    </Text>
                    <Text style={componentStyles.uploadHint}>
                        {dropZoneHint}
                    </Text>
                    <UploadButton onPress={handleFilePickerClick} /> 
                </TouchableOpacity>
                
                {/* File List Header */}
                <View style={componentStyles.fileListHeader}>
                    <Text style={componentStyles.fileListTitle}>File Attachments</Text>
                    <ViewFilesButton onPress={toggleShowFiles} isVisible={showFiles} count={phaseFiles.length} />
                </View>
                
                {/* File List */}
                {showFiles && (
                    <View style={componentStyles.fileList}>
                        {phaseFiles.length > 0 ? (
                            phaseFiles.map(item => <UploadedFileItem key={item.id} item={item} onDelete={handleFileDelete} />)
                        ) : (
                            <Text style={{ color: componentStyles.uploadHint.color, textAlign: 'center', marginTop: 10 }}>No files uploaded for {phase}.</Text>
                        )}
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View>
            {content}
            <NoteAndCheckboxSection 
                noteMessage={inputState.noteMessage}
                setNoteMessage={handleNoteChange}
            />
        </View>
    );
};

// --- MAIN COMPONENT ---
const FeedbackRelatedComponent: React.FC = () => {
    const [selectedMainTab, setSelectedMainTab] = useState('Creative workbook');
    const [phaseTabs, setPhaseTabs] = useState(['Phase 1', 'Phase 2', 'Phase 3']); 
    const [selectedPhase, setSelectedPhase] = useState('Phase 1');
    
    const [inputState, setInputState] = useState<InputState>(initialInputState);
    const [files, setFiles] = useState<FileUploadItem[]>(initialFileData);
    const [showUploadedFiles, setShowUploadedFiles] = useState(true);

    // Ref for the hidden file input element (Web/React Native Web only)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleShowFiles = () => setShowUploadedFiles(prev => !prev);
    
    const handlePhaseSelect = (phase: string) => {
        setSelectedPhase(phase);
        setShowUploadedFiles(true);
    };
    
    const handleNoteChange = (text: string) => {
        setInputState((prev: InputState) => ({ ...prev, noteMessage: text }));
    };

    // --- NEW PHASE LOGIC (Unchanged) ---
    const handleAddPhase = () => {
        const newPhaseNumber = phaseTabs.length + 1;
        const newPhaseName = `Phase ${newPhaseNumber}`;
        
        setPhaseTabs(prev => [...prev, newPhaseName]);
        
        const newKey: keyof InputState = newPhaseName.replace(' ', '').toLowerCase();
        setInputState(prev => ({ ...prev, [newKey]: '' }));
        
        handlePhaseSelect(newPhaseName);
        
        Alert.alert('New Phase Added', `${newPhaseName} is now available for submission.`);
    };
    
    // --- FILE PICKER ACTIVATOR (Web/Mobile Simulation) ---
    const handleFilePickerClick = () => {
        if (Platform.OS === 'web' && fileInputRef.current) {
            // This is the key action for Web/PC to open the file selector
            fileInputRef.current.click();
        } else {
            // For true Mobile React Native, you would integrate a library here.
            Alert.alert("File Picker", "Simulating native file picker opening...");
            // If you used 'react-native-document-picker', the code would go here.
            // Eg: DocumentPicker.pick({...});
        }
    };

    // --- FILE CHANGE HANDLER (React Native Web/Browser) ---
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;

        if (selectedFile) {
            // Create a new FileUploadItem object from the selected file data
            const newFile: FileUploadItem = {
                id: Date.now().toString(),
                name: selectedFile.name,
                // Simple size display; in MB if over 1MB, otherwise KB
                size: (selectedFile.size / (1024 * 1024) > 1 
                        ? (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB' 
                        : (selectedFile.size / 1024).toFixed(0) + ' KB'),
                progress: 100, // Assuming instant upload for this example
                isComplete: true,
                typeIcon: getFileIcon(selectedFile.name),
                phase: selectedPhase,
            };
            
            // Add the new file to the list
            setFiles(prev => [...prev, newFile]);
            setShowUploadedFiles(true);

            // Optional: Clear the input value to allow the same file to be selected again
            if (fileInputRef.current) {
                 fileInputRef.current.value = '';
            }

        } else if (fileInputRef.current) {
            // Clear the input value if the user canceled the selection
             fileInputRef.current.value = '';
        }
    };
    
    // --- FILE DELETE LOGIC (Unchanged) ---
    const handleFileDelete = (id: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this file?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    onPress: () => setFiles(prev => prev.filter(file => file.id !== id)), 
                    style: "destructive" 
                },
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={componentStyles.scrollViewContent}> 
            {/* --- HIDDEN FILE INPUT FOR WEB/PC ---
                यह इनपुट एलिमेंट PC पर फ़ाइल सेलेक्टर को ट्रिगर करता है। 
                यह React Native Mobile पर काम नहीं करता, लेकिन RN Web पर काम करता है। 
            */}
            {Platform.OS === 'web' && (
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Hide the actual input button
                    multiple={true} // Allow multiple file selection
                />
            )}

            <View style={componentStyles.container}>
                
                {/* Main Tabs */}
                <TabSelector
                    tabs={['Creative workbook', 'Portfolio', 'Exam']}
                    selected={selectedMainTab}
                    onSelect={setSelectedMainTab}
                />

                {/* Content Header */}
                <View style={componentStyles.contentHeader}>
                    <Text style={componentStyles.contentTitle}>{selectedMainTab}</Text>
                    <View style={componentStyles.phaseActions}>
                        <Icon name="trash-2" size={20} color="#A0AEC0" style={{ marginRight: 15 }} />
                        
                        {/* + New Phase Button */}
                        <TouchableOpacity style={componentStyles.newPhaseButton} onPress={handleAddPhase}>
                            <Icon name="plus" size={16} color="#FFFFFF" style={{ marginRight: 5 }} />
                            <Text style={componentStyles.newPhaseButtonText}>New phase</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Phase Tabs (Now Dynamic) */}
                <TabSelector
                    tabs={phaseTabs}
                    selected={selectedPhase}
                    onSelect={handlePhaseSelect}
                />

                {/* RENDER PHASE-SPECIFIC CONTENT + NOTE/CHECKBOX SECTION HERE */}
                {renderPhaseContent(
                    selectedPhase, 
                    inputState, 
                    setInputState, 
                    files, 
                    showUploadedFiles, 
                    toggleShowFiles,
                    handleNoteChange,
                    handleFilePickerClick, // Pass the handler that clicks the hidden input
                    handleFileDelete
                )}
            </View>
        </ScrollView>
    );
};

// --- STYLES (Unchanged) ---
const componentStyles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1, 
        backgroundColor: '#FFFFFF', 
        paddingBottom: 40, 
    },
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 20,
        borderRadius: 12,
    },
    tabSelector: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#4C51BF',
        marginBottom: -1,
    },
    tabText: {
        fontSize: 16,
        color: '#718096',
        fontWeight: '500',
    },
    selectedTabText: {
        color: '#4C51BF',
        fontWeight: '700',
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    contentTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2D3748',
    },
    phaseActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newPhaseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4C51BF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    newPhaseButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    inputRow: {
        marginBottom: 20,
        paddingVertical: 10,
    },
    inputLabel: {
        fontSize: 14,
        color: '#718096',
        fontWeight: '500',
        marginBottom: 5,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#2D3748',
    },
    section: {
        marginBottom: 20,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#A0AEC0',
        marginBottom: 10,
    },
    dropZone: {
        borderWidth: 2,
        borderColor: '#4C51BF',
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#F7FAFC',
    },
    uploadText: {
        fontSize: 16,
        color: '#4C51BF',
        fontWeight: '700',
        marginTop: 10,
    },
    uploadHint: {
        fontSize: 12,
        color: '#A0AEC0',
        marginTop: 5,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4C51BF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 15,
    },
    uploadButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    fileListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        marginBottom: 5,
    },
    fileListTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2D3748',
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#4C51BF',
    },
    viewButtonText: {
        color: '#4C51BF',
        fontWeight: '500',
        fontSize: 12,
    },
    fileList: {
        marginTop: 10,
    },
    fileItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F7FAFC',
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
    },
    fileSize: {
        fontSize: 12,
        color: '#A0AEC0',
        marginTop: 2,
    },
    fileActions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    fileProgress: {
        fontSize: 14,
        color: '#4C51BF',
    },
    progressBarWrapper: {
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        marginTop: 5,
        width: '95%',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4C51BF',
        borderRadius: 2,
    },
    noteInputContainer: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        marginBottom: 20,
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#F7FAFC',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 4,
    },
    dropdownText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#4C51BF',
        marginRight: 5,
    },
    toolbar: {
        flexDirection: 'row',
    },
    toolbarIcon: {
        marginLeft: 10,
    },
    noteTextInput: {
        height: 100,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 14,
        color: '#2D3748',
    },
    charCount: {
        fontSize: 12,
        color: '#A0AEC0',
        textAlign: 'right',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    checkboxGroup: {
        marginBottom: 20,
    },
    checkboxGroupTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D3748',
        marginTop: 15,
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#718096',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#EDF2F7',
    },
    saveButtonText: {
        color: '#2D3748',
        fontWeight: '600',
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#4C51BF',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default FeedbackRelatedComponent;