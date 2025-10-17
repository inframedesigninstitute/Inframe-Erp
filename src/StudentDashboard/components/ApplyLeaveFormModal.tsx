// ApplyLeaveFormModal.tsx
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,

    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { LeaveApplication } from '../screens/LeaveApplication';

type LeaveFormProps = {
    isVisible: boolean;
    onClose: () => void;
    onSave: (leaveData: Omit<LeaveApplication, 'id' | 'status' | 'leaveDates'> & { start_date: string, end_date: string, name: string }) => void;
    onRefresh: () => void;
};

const ApplyLeaveFormModal: React.FC<LeaveFormProps> = ({ isVisible, onClose, onSave, onRefresh }) => {
    const [name] = useState('Current User');
    const [applyDate, setApplyDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [subject, setSubject] = useState('');
    const [reason, setReason] = useState('');
    const [fileName, setFileName] = useState('No file chosen');

    const [showApplyPicker, setShowApplyPicker] = useState(false);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const handleSave = () => {
        if (!subject) {
            Alert.alert("Error", "Please fill all required fields (Subject).");
            return;
        }
        
        // Validation to ensure end date is not before start date
        if (endDate.getTime() < startDate.getTime()) {
            Alert.alert("Error", "End Date cannot be before Start Date.");
            return;
        }

        const newLeave = {
            applyDate: applyDate.toLocaleDateString(),
            start_date: startDate.toLocaleDateString(),
            end_date: endDate.toLocaleDateString(),
            subject,
            reason,
            // Calculate days (includes the start day)
            days: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1,
            name
        };
        onSave(newLeave);
        setSubject('');
        setReason('');
        setFileName('No file chosen');
    };

    const handleChooseFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

            if (result.canceled === false) {
                setFileName(result.assets[0].name); 
            } else if (result.canceled === true) {
                console.log('File picking cancelled');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Failed to pick file.');
        }
    };

    // ⬅️ UPDATED FUNCTION: यह Android और iOS दोनों पर पिकर को सही से बंद करेगा 
    // और डेट को अपडेट करेगा।
    const onChangeDate = (
        event: DateTimePickerEvent,
        selectedDate: Date | undefined,
        setter: React.Dispatch<React.SetStateAction<Date>>,
        hidePicker: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        // Android पर, पिकर बंद करने के लिए हमेशा false सेट करें। 
        // iOS पर, यह केवल तभी बंद होता है जब इवेंट 'dismissed' न हो।
        if (Platform.OS === 'android' || event.type === 'set') {
             hidePicker(false);
        }
        
        // यदि कोई तारीख चुनी गई है, तो इसे स्टेट में अपडेट करें।
        if (selectedDate) {
            setter(selectedDate);
        }
    };

    return (
        <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onClose}>
            <View style={styles.modalCenteredView}>
                <View style={styles.modalView}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Apply Leave</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#adb5bd" />
                        </TouchableOpacity>
                    </View>

                    {/* Toolbar */}
                    <View style={styles.backRefreshContainer}>
                        <TouchableOpacity onPress={onClose} style={[styles.toolbarButton, styles.backButton]}>
                            <FontAwesome5 name="arrow-left" size={14} color="#fff" />
                            <Text style={styles.toolbarButtonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onRefresh} style={[styles.toolbarButton, styles.secondaryButton]}>
                            <Ionicons name="refresh" size={14} color="#000" />
                            <Text style={[styles.toolbarButtonText, { color: '#000' }]}>Refresh</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.dateContainer}>
                            {/* Apply Date */}
                            <View style={styles.dateInputWrapper}>
                                <Text style={styles.formLabel}>Apply Date</Text>
                                <View style={styles.dateInputGroup}>
                                    <Text style={[styles.formInput, styles.dateText]}>
                                        {applyDate.toLocaleDateString()}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setShowApplyPicker(true)}
                                        style={styles.calendarButton}
                                    >
                                        <FontAwesome5 name="calendar-alt" size={16} color="#495057" />
                                    </TouchableOpacity>
                                </View>
                                {showApplyPicker && (
                                    <DateTimePicker
                                        value={applyDate}
                                        mode="date"
                                        display="default"
                                        // ⬅️ Fix: onChange अब अपडेटेड फंक्शन का उपयोग करता है
                                        onChange={(e, date) => onChangeDate(e, date, setApplyDate, setShowApplyPicker)}
                                    />
                                )}
                            </View>

                            {/* Start Date */}
                            <View style={styles.dateInputWrapper}>
                                <Text style={styles.formLabel}>Start Date <Text style={{color: 'red'}}>*</Text></Text>
                                <View style={styles.dateInputGroup}>
                                    <Text style={[styles.formInput, styles.dateText]}>
                                        {startDate.toLocaleDateString()}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setShowStartPicker(true)}
                                        style={styles.calendarButton}
                                    >
                                        <FontAwesome5 name="calendar-alt" size={16} color="#495057" />
                                    </TouchableOpacity>
                                </View>
                                {showStartPicker && (
                                    <DateTimePicker
                                        value={startDate}
                                        mode="date"
                                        display="default"
                                        // ⬅️ Fix: onChange अब अपडेटेड फंक्शन का उपयोग करता है
                                        onChange={(e, date) => onChangeDate(e, date, setStartDate, setShowStartPicker)}
                                    />
                                )}
                            </View>

                            {/* End Date */}
                            <View style={[styles.dateInputWrapper, {marginRight: 0}]}>
                                <Text style={styles.formLabel}>End Date <Text style={{color: 'red'}}>*</Text></Text>
                                <View style={styles.dateInputGroup}>
                                    <Text style={[styles.formInput, styles.dateText]}>
                                        {endDate.toLocaleDateString()}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setShowEndPicker(true)}
                                        style={styles.calendarButton}
                                    >
                                        <FontAwesome5 name="calendar-alt" size={16} color="#495057" />
                                    </TouchableOpacity>
                                </View>
                                {showEndPicker && (
                                    <DateTimePicker
                                        value={endDate}
                                        mode="date"
                                        display="default"
                                        // ⬅️ Fix: onChange अब अपडेटेड फंक्शन का उपयोग करता है
                                        onChange={(e, date) => onChangeDate(e, date, setEndDate, setShowEndPicker)}
                                    />
                                )}
                            </View>
                        </View>

                        {/* Subject */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Subject <Text style={{color: 'red'}}>*</Text></Text>
                            <TextInput
                                value={subject}
                                onChangeText={setSubject}
                                style={styles.formInput}
                            />
                        </View>

                        {/* Reason */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Reason</Text>
                            <TextInput
                                value={reason}
                                onChangeText={setReason}
                                multiline
                                style={[styles.formInput, styles.textArea]}
                            />
                        </View>

                        {/* File Picker */}
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>Attach</Text>
                            <View style={styles.filePicker}>
                                <TouchableOpacity
                                    onPress={handleChooseFile}
                                    style={styles.chooseFileButton}
                                >
                                    <Text style={{color: '#495057'}}>Choose file</Text>
                                </TouchableOpacity>
                                <Text style={{color: '#888'}}>{fileName}</Text>
                            </View>
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            onPress={handleSave}
                            style={styles.saveButton}
                        >
                            <FontAwesome5 name="save" size={16} color="#fff" />
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // --- Modal/General Styles ---
    modalCenteredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', },
    modalView: { margin: 20, backgroundColor: 'white', borderRadius: 8, padding: 20, width: '90%', maxWidth: 600, elevation: 5, },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#495057', },

    // --- Toolbar Styles ---
    backRefreshContainer: { flexDirection: 'row', marginBottom: 15, },
    toolbarButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 4, marginRight: 8, },
    backButton: { backgroundColor: '#17a2b8', },
    secondaryButton: { backgroundColor: '#e9ecef', borderWidth: 1, borderColor: '#ccc', },
    toolbarButtonText: { fontWeight: '600', fontSize: 14, marginLeft: 5, color: '#fff' },

    // --- Form Styles ---
    formGroup: { marginBottom: 15, },
    formLabel: { fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#495057', },
    formInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 10, color: '#000', flex: 1, },
    
    // Date Specific Styles
    dateContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, },
    dateInputWrapper: { flex: 1, marginRight: 10, },
    dateInputGroup: { flexDirection: 'row', alignItems: 'center', },
    dateText: { paddingRight: 0, paddingVertical: 10, }, // Adjust padding for date text
    calendarButton: { 
        backgroundColor: '#e9ecef', 
        padding: 10, 
        borderTopRightRadius: 4, 
        borderBottomRightRadius: 4, 
        borderWidth: 1, 
        borderColor: '#ccc',
        borderLeftWidth: 0,
        height: 42, // Match height with TextInput padding
        justifyContent: 'center',
    },

    // Textarea & File Picker
    textArea: { height: 100, textAlignVertical: 'top', },
    filePicker: { flexDirection: 'row', alignItems: 'center', },
    chooseFileButton: { backgroundColor: '#e9ecef', padding: 10, borderRadius: 4, marginRight: 10, borderWidth: 1, borderColor: '#adb5bd', },

    // Save Button
    saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#28a745', padding: 12, borderRadius: 4, marginTop: 10, },
    saveButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 5, },
});

export default ApplyLeaveFormModal;