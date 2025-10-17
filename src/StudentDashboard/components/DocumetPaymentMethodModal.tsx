import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Payment Options ---
const paymentOptions = [
    { id: 'upi', name: 'Pay via UPI', icon: '🅿️' },
    { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
    { id: 'net_banking', name: 'Net Banking', icon: '🏦' },
];

interface PaymentMethodModalProps {
    isVisible: boolean;
    onClose: () => void;
    onPaymentSelect: (method: string) => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
    isVisible,
    onClose,
    onPaymentSelect,
}) => {
    const [selectedMethod, setSelectedMethod] = useState<string>('card');

    const handleProceed = () => {
        if (selectedMethod) {
            onPaymentSelect(selectedMethod);
            onClose();
            Alert.alert("Proceeding to Payment", `You selected: ${selectedMethod}`);
        } else {
            Alert.alert("Selection Required", "Please select a payment method.");
        }
    };

    const PaymentOptionItem: React.FC<{ id: string, name: string, icon: string }> = ({ id, name, icon }) => (
        <TouchableOpacity
            style={[
                modalStyles.optionContainer,
                selectedMethod === id ? modalStyles.optionSelected : {},
            ]}
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
                <View style={modalStyles.modalContent}>
                    {/* Header */}
                    <View style={modalStyles.header}>
                        <TouchableOpacity onPress={onClose} style={modalStyles.backButton}>
                            <Text style={modalStyles.backIcon}>&lt;</Text>
                        </TouchableOpacity>
                        <Text style={modalStyles.headerTitle}>Apply Documents</Text>
                        <View style={{ width: 30 }} />
                    </View>

                    {/* Section Title */}
                    <View style={modalStyles.sectionTitleContainer}>
                        <Text style={modalStyles.sectionTitle}>Select Payment Method</Text>
                    </View>

                    {/* Payment Options List */}
                    <View style={modalStyles.optionsList}>
                        {paymentOptions.map(opt => (
                            <PaymentOptionItem key={opt.id} {...opt} />
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

// --- 3D Styles ---
const modalStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fefefe',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 30,
        paddingTop: 10,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        transform: [{ translateY: -20 }],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1C3144',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    backButton: { padding: 5 },
    backIcon: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
    headerTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
    sectionTitleContainer: {
        backgroundColor: '#34495E',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    optionsList: { padding: 20 },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    optionSelected: {
        backgroundColor: '#d1f2eb',
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    optionContent: { flexDirection: 'row', alignItems: 'center' },
    icon: { fontSize: 26, marginRight: 15 },
    optionText: { fontSize: 16, fontWeight: '500', color: '#333' },
    checkbox: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: '#28A745',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    checkmark: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
    buttonContainer: { paddingHorizontal: 20, paddingTop: 10 },
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
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    cancelButton: { padding: 10, alignItems: 'center' },
    cancelText: { color: '#666', fontSize: 14, fontWeight: '500' },
});

export default PaymentMethodModal;
