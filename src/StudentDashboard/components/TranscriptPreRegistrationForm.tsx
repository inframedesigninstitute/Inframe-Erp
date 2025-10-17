import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Global Data Arrays ---
const bachYears = ["2020", "2021", "2022", "2023", "2024", "2025"];
const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];
const documentTypes = [
    "Final Transcript / All Marks Document",
    "Migration Certificate Application",
    "T.C. / C.C. Application Form",
    "Semester Marksheets (All Sem)",
    "Degree Certificate (2024)",
    "Convocation / Provisional Certificate",
    "Duplicate Marksheet",
    "Bonafide Certificate",
    "Character Certificate",
    "Other Academic Document"
];
const departmentsList = ["Science", "Arts", "Commerce", "Engineering", "Management"]; // Expanded list for Department Picker

// --- 1. Form State Interface (No Change) ---
interface PreRegistrationState {
    typePrivate: boolean;
    billingBranch: string;
    solutionType: string;
    date: string;
    courseName: string;
    assessmentYes: boolean;
    clientCourseName: string;
    courseNameArabic: string;
    programPath: string;
    courseDivision: string;
    maritalLanguage: string;
    languageOfDelivery: string;
    courseDurationDays: string;
    courseManualUSD: string;
    courseLabUSD: string;
    outlineSharedByClient: boolean;
    courseDescription: string;
    bachYear: string;
    semester: string;
    department: string;
    paymentMethod: string; // Added to store selected payment method
}

// --- 2. Custom FormInput Component (No Change) ---
interface FormInputProps {
    label: string;
    placeholder: string;
    required?: boolean;
    multiline?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'numeric' | 'email-address';
}
const FormInput: React.FC<FormInputProps> = ({
    label,
    placeholder,
    required = false,
    multiline = false,
    value,
    onChangeText,
    keyboardType = 'default',
}) => {
    return (
        <View style={formStyles.inputGroup}>
            <Text style={formStyles.label}>
                {label}
                {required && <Text style={{ color: 'red' }}>*</Text>}:
            </Text>
            <TextInput
                style={[formStyles.input, multiline && formStyles.multilineInput]}
                placeholder={placeholder}
                placeholderTextColor="#999"
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    );
};

// --- 3. Payment Method Modal Component ---
// This is the new component to show the payment options (copied from the previous response idea)
const paymentOptions = [
    { id: 'upi', name: 'Pay via UPI', icon: '🅿️' },
    { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
    { id: 'net_banking', name: 'Net Banking', icon: '🏦' },
];

interface PaymentMethodModalProps {
    isVisible: boolean;
    onClose: () => void;
    onPaymentSelect: (method: string) => void;
    currentSelection: string;
}
interface TranscriptPreRegistrationFormProps {
    isVisible: boolean;
    onClose: () => void;
}
const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
    isVisible,
    onClose,
    onPaymentSelect,
    currentSelection,
}) => {
    const [selectedMethod, setSelectedMethod] = useState<string>(currentSelection || 'card');

    const handleProceed = () => {
        if (selectedMethod) {
            onPaymentSelect(selectedMethod);
            onClose();
        } else {
            Alert.alert("Selection Required", "Please select a payment method.");
        }
    };

    const PaymentOptionItem: React.FC<{ id: string, name: string, icon: string }> = ({ id, name, icon }) => (
        <TouchableOpacity
            style={modalStyles.optionContainer}
            onPress={() => setSelectedMethod(id)}
            activeOpacity={0.8}
        >
            <View style={modalStyles.optionContent}>
                <Text style={modalStyles.icon}>{icon}</Text>
                <Text style={modalStyles.optionText}>{name}</Text>
            </View>
            {selectedMethod === id && (
                <View style={modalStyles.checkbox}>
                    <Text style={modalStyles.checkmark}>✓</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <SafeAreaView style={modalStyles.modalOverlay}>
                <View style={modalStyles.paymentModalContent}> 
                    
                    {/* Header */}
                    <View style={modalStyles.header}>
                        <TouchableOpacity onPress={onClose} style={modalStyles.backButton}>
                            <Text style={modalStyles.backIcon}>&lt;</Text>
                        </TouchableOpacity>
                        <Text style={modalStyles.headerTitle}>Apply Documents</Text>
                        <View style={{ width: 30 }} />
                    </View>

                    {/* Section Title (Matches image) */}
                    <View style={modalStyles.sectionTitleContainer}>
                        <Text style={modalStyles.sectionTitle}>Select Payment Method</Text>
                    </View>

                    {/* Payment Options List */}
                    <View style={modalStyles.optionsList}>
                        {paymentOptions.map(option => (
                             <PaymentOptionItem key={option.id} {...option} />
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={modalStyles.buttonContainer}>
                        <TouchableOpacity style={modalStyles.proceedButton} onPress={handleProceed}>
                            <Text style={modalStyles.buttonText}>Proceed to Pay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalStyles.cancelButton} onPress={onClose}>
                            <Text style={modalStyles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </Modal>
    );
};


// --- 4. Main Form Component (Updated) ---
const TranscriptPreRegistrationForm: React.FC<TranscriptPreRegistrationFormProps> = ({
    isVisible,
    onClose,
}) => {
    const [formData, setFormData] = useState<PreRegistrationState>({
        typePrivate: false,
        billingBranch: '',
        solutionType: '',
        date: '',
        courseName: '',
        assessmentYes: false,
        clientCourseName: '',
        courseNameArabic: '',
        programPath: '',
        courseDivision: '',
        maritalLanguage: '',
        languageOfDelivery: '',
        courseDurationDays: '',
        courseManualUSD: '',
        courseLabUSD: '',
        outlineSharedByClient: false,
        courseDescription: '',
        bachYear: '',
        semester: '',
        department: '',
        paymentMethod: '', // New state initialization
    });

    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false); // New state for modal

    const handleChange = (name: keyof PreRegistrationState, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentSelect = (method: string) => {
        handleChange('paymentMethod', method);
        Alert.alert("Payment Added", `Selected method: ${method}. Click 'Save' to complete application.`);
    };

    const handleSubmit = () => {
        // Validation check for required fields
        if (!formData.billingBranch || !formData.solutionType || !formData.bachYear || !formData.courseDivision) {
            Alert.alert('Error', 'Please fill in required fields: Student Name, Father Name, Bach Year, and Department.');
            return;
        }

        console.log('Final Form Data:', formData);
        Alert.alert('Success', `Application submitted. Payment Method: ${formData.paymentMethod || 'Not Selected'}`);
        // onClose();
    };

    return (
        <>
            {/* 4A. Main Application Form Modal */}
            <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
                <View style={formStyles.modalOverlay}>
                    <View style={formStyles.modalContent}>

                        {/* Header */}
                        <View style={formStyles.header}>
                            <Text style={formStyles.headerTitle}>Apply Documents</Text>
                            <TouchableOpacity onPress={onClose} style={formStyles.closeButton}>
                                <Text style={formStyles.closeIcon}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView contentContainerStyle={formStyles.scrollViewContent}>

                            {/* Row 1 */}
                            <View style={formStyles.row}>
                                <FormInput
                                    label="Student Name"
                                    placeholder="Enter Name"
                                    required
                                    value={formData.billingBranch}
                                    onChangeText={(text) => handleChange('billingBranch', text)}
                                />
                                <FormInput
                                    label="Student Father Name"
                                    placeholder="Enter Father Name"
                                    required
                                    value={formData.solutionType}
                                    onChangeText={(text) => handleChange('solutionType', text)}
                                />
                                <FormInput
                                    label="Birthday Date"
                                    placeholder="dd/mm/yyyy"
                                    value={formData.date}
                                    onChangeText={(text) => handleChange('date', text)}
                                />
                            </View>

                            {/* Row 2: Bach Year, Course Name, Semester */}
                            <View style={formStyles.row}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Text style={formStyles.label}>Bach Year*</Text>
                                    <View style={formStyles.pickerWrapper}>
                                        <Picker
                                            selectedValue={formData.bachYear}
                                            onValueChange={(value) => handleChange('bachYear', value)}
                                        >
                                            <Picker.Item label="Select Year" value="" />
                                            {bachYears.map((year) => <Picker.Item key={year} label={year} value={year} />)}
                                        </Picker>
                                    </View>
                                </View>

                                <FormInput
                                    label="Course Name"
                                    placeholder=""
                                    value={formData.courseManualUSD}
                                    onChangeText={(text) => handleChange('courseManualUSD', text)}
                                    keyboardType="default"
                                />

                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={formStyles.label}>Semester</Text>
                                    <View style={formStyles.pickerWrapper}>
                                        <Picker
                                            selectedValue={formData.semester}
                                            onValueChange={(value) => handleChange('semester', value)}
                                        >
                                            <Picker.Item label="Select Semester" value="" />
                                            {semesters.map((sem) => <Picker.Item key={sem} label={sem} value={sem} />)}
                                        </Picker>
                                    </View>
                                </View>
                            </View>

                            {/* Row 3 */}
                            <View style={formStyles.row}>
                                <FormInput
                                    label="Course Division"
                                    placeholder=""
                                    value={formData.clientCourseName}
                                    onChangeText={(text) => handleChange('clientCourseName', text)}
                                />
                                <FormInput
                                    label="Roll No."
                                    placeholder=""
                                    value={formData.courseNameArabic}
                                    onChangeText={(text) => handleChange('courseNameArabic', text)}
                                    keyboardType="numeric"
                                />
                                <FormInput
                                    label="Adhar Number"
                                    placeholder=""
                                    value={formData.programPath}
                                    onChangeText={(text) => handleChange('programPath', text)}
                                    keyboardType="numeric"
                                />
                            </View>

                            {/* Row 4 */}
                            <View style={formStyles.row}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Text style={formStyles.label}>Department*</Text>
                                    <View style={formStyles.pickerWrapper}>
                                        <Picker
                                            selectedValue={formData.courseDivision}
                                            onValueChange={(value) => handleChange('courseDivision', value)}
                                        >
                                            <Picker.Item label="Select Division" value="" />
                                            {departmentsList.map((dept) => <Picker.Item key={dept} label={dept} value={dept} />)}
                                        </Picker>
                                    </View>
                                </View>

                                <FormInput
                                    label="Marital Language"
                                    placeholder="Select Language"
                                    value={formData.maritalLanguage}
                                    onChangeText={(text) => handleChange('maritalLanguage', text)}
                                />
                                <FormInput
                                    label="Email"
                                    placeholder="Enter Email"
                                    value={formData.languageOfDelivery}
                                    onChangeText={(text) => handleChange('languageOfDelivery', text)}
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={formStyles.row}>
                                <FormInput
                                    label="Mailing Address (for sending physical documents, if applicable)"
                                    placeholder="Enter full address"
                                    multiline={true}
                                    value={formData.courseDurationDays}
                                    onChangeText={(text) => handleChange('courseDurationDays', text)}
                                    keyboardType="default"
                                />
                                <TouchableOpacity 
                                    style={[formStyles.addButton, { alignSelf: 'flex-end', flex: 0.5 }]} 
                                    onPress={() => setIsPaymentModalVisible(true)}
                                >
                                    <Text style={formStyles.addButtonText}>
                                       Add Payment
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={formStyles.row}>
                                <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
                                    <TouchableOpacity style={[formStyles.outlineButton, formStyles.pdfButton]}>
                                        <Text style={formStyles.outlineButtonText}>PDF Outline</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[formStyles.outlineButton, formStyles.pptButton]}>
                                        <Text style={formStyles.outlineButtonText}>PPT Outline</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[formStyles.outlineButton, formStyles.docButton]}>
                                        <Text style={formStyles.outlineButtonText}>DOC Outline</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={formStyles.label}>Upload Required Files (ID, photo, previous certificates):</Text>
                                    <TouchableOpacity style={formStyles.fileChooseButton} onPress={() => Alert.alert('File Picker', 'Simulating file selection...')}>
                                        <Text style={formStyles.fileChooseButtonText}>Choose File</Text>
                                    </TouchableOpacity>
                                    <Text style={formStyles.fileNameText}>No file Chosen</Text>
                                </View>
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleChange('outlineSharedByClient', !formData.outlineSharedByClient)}>
                                    <Text style={formStyles.checkboxIcon}>{formData.outlineSharedByClient ? '☑' : '☐'}</Text>
                                    <Text style={formStyles.label}>Outline Shared by Client</Text>
                                </TouchableOpacity>
                            </View>

                            

                            {/* Footer Buttons */}
                            <View style={formStyles.footer}>
                                <TouchableOpacity style={formStyles.saveButton} onPress={handleSubmit}>
                                    <Text style={formStyles.footerButtonText}>Save Pre Registration</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={formStyles.deleteButton} onPress={() => Alert.alert('Confirm Delete', 'Are you sure you want to delete this form?')}>
                                    <Text style={formStyles.footerButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            
            {/* 4B. Payment Selection Modal */}
            <PaymentMethodModal
                isVisible={isPaymentModalVisible}
                onClose={() => setIsPaymentModalVisible(false)}
                onPaymentSelect={handlePaymentSelect}
                currentSelection={formData.paymentMethod}
            />
        </>
    );
};

const formStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '95%',
        maxWidth: 900,
        height: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    scrollViewContent: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1C3144',
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    closeButton: {
        padding: 5,
    },
    closeIcon: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputGroup: {
        flex: 1,
        marginRight: 10,
        marginBottom: 10,
    },
    label: {
        fontSize: 13,
        color: '#333',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        backgroundColor: '#fff',
        minHeight: 40,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        overflow: 'hidden',
        height: 40,
        justifyContent: 'center',
    },
    checkboxIcon: {
        fontSize: 18,
        color: '#1C3144',
        marginRight: 5,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#28A745',
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 30,
        borderRadius: 5,
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },
    outlineButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    pdfButton: { backgroundColor: '#17A2B8' },
    pptButton: { backgroundColor: '#17A2B8' },
    docButton: { backgroundColor: '#17A2B8' },
    outlineButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    fileChooseButton: {
        backgroundColor: '#E9ECEF',
        borderWidth: 1,
        borderColor: '#CCC',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 5,
    },
    fileChooseButtonText: {
        color: '#343A40',
        fontSize: 13,
    },
    fileNameText: {
        fontSize: 13,
        color: '#6C757D',
        marginLeft: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    saveButton: {
        backgroundColor: '#1C3144',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#E74C3C',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    footerButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});

// --- 6. Payment Modal Styles (3D look update) ---
const modalStyles = StyleSheet.create({
    ...formStyles, 
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    paymentModalContent: {
        width: '80%',
        backgroundColor: '#fefefe',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
        elevation: 15,
        alignSelf: "center",
        bottom: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    backButton: {
        padding: 5,
        marginLeft: 10,
    },
    backIcon: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1C3144',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitleContainer: {
        backgroundColor: '#34495E',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    optionsList: {
        padding: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 26,
        marginRight: 15,
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    checkbox: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: '#28A745',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    proceedButton: {
        backgroundColor: '#28A745',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    cancelButton: {
        padding: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default TranscriptPreRegistrationForm;