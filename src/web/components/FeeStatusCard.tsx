import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// AcademicServiceHub का इंपोर्ट हटा दिया गया है क्योंकि इसे अब यहाँ उपयोग नहीं किया जा रहा है।
// import AcademicServiceHub from './AcademicServiceHub'; 

// --- Interface for Type Safety ---
export interface FeeStatusProps {
    totalFee: number;
    paidAmount: number;
    dueDate: string; // e.g., "2025-08-30"
    currencySymbol?: string; // e.g., "₹", "$"
}

// Function to format numbers (e.g., 75000 -> 75,000)
const formatAmount = (amount: number): string => 
    amount.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

const FeeStatusCard: React.FC<FeeStatusProps> = ({
    totalFee,
    paidAmount,
    dueDate,
    currencySymbol = '₹', // Default to Indian Rupee symbol
}) => {
    const dueAmount = totalFee - paidAmount;
    // Ensure totalFee is not zero to avoid division by zero
    const paymentProgress = totalFee > 0 ? (paidAmount / totalFee) * 100 : 0;
    
    const showAlert = dueAmount > 0;

    return (
        <View style={cardStyles.card}>
            {/* Header */}
            <View style={cardStyles.header}>
                <Text style={cardStyles.title}>Fee Status</Text>
                {/* Placeholder for the currency icon */}
                <Text style={cardStyles.iconPlaceholder}>$</Text> 
            </View>

            <View style={cardStyles.amountsContainer}>
                <View style={cardStyles.amountItem}>
                    <Text style={cardStyles.amountLabel}>Total Fee</Text>
                    <Text style={cardStyles.totalFeeValue}>
                        {currencySymbol}{formatAmount(totalFee)}
                    </Text>
                </View>
                <View style={cardStyles.amountItem}>
                    <Text style={cardStyles.amountLabel}>Paid Amount</Text>
                    <Text style={cardStyles.paidAmountValue}>
                        {currencySymbol}{formatAmount(paidAmount)}
                    </Text>
                </View>
            </View>

            <View style={cardStyles.progressContainer}>
                <Text style={cardStyles.progressLabel}>Payment Progress</Text>
                <Text style={cardStyles.progressPercentage}>{paymentProgress.toFixed(0)}%</Text>
            </View>
            <View style={cardStyles.progressBarBackground}>
                <View
                    style={[
                        cardStyles.progressBarFill,
                        { width: `${paymentProgress}%` },
                    ]}
                />
            </View>

            {showAlert && (
                <View style={cardStyles.dueAmountCard}>
                    <Text style={cardStyles.dueAmountTitle}>
                        Due Amount: {currencySymbol}{formatAmount(dueAmount)}
                    </Text>
                    <Text style={cardStyles.dueDateText}>
                        Due Date: {dueDate}
                    </Text>

                </View>
            )}

        </View>
    );
};

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 22,
        marginHorizontal: 8,

        // --- 3D look with layered shadows ---
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 8,

        // subtle 3D tilt
        transform: [{ perspective: 1000 }, { rotateX: '0.8deg' }],
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    title: {
        fontSize: 19,
        fontWeight: '600',
        color: '#1e293b',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    iconPlaceholder: {
        fontSize: 22,
        color: '#94a3b8',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },

    amountsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    amountItem: {
        alignItems: 'flex-start',
    },
    amountLabel: {
        fontSize: 14,
        color: '#000000ff',
        marginBottom: 4,
    },
    totalFeeValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000ff',
    },
    paidAmountValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000ff', // refined green
    },

    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 14,
        color: '#000000ff',
    },
    progressPercentage: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000ff',
    },

    // --- 3D progress bar with gradient depth ---
    progressBarBackground: {
        height: 12,
        backgroundColor: '#e2e8f0',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 6,
        backgroundColor: '#3b82f6',
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    dueAmountCard: {
        backgroundColor: '#fff7ed',
        borderRadius: 10,
        padding: 15,
        borderLeftWidth: 6,
        borderLeftColor: '#f59e0b',
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 4,
    },
    dueAmountTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#b45309',
        marginBottom: 5,
    },
    dueDateText: {
        fontSize: 14,
        color: '#92400e',
    },
});


export default FeeStatusCard;