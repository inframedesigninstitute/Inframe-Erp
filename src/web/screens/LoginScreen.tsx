import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PRIMARY_BLUE = '#01579B';
const SECONDARY_BLUE = '#1E88E5';
const INPUT_BG_COLOR = 'rgba(255, 255, 255, 0.95)';
const CARD_BG_COLOR = '#ffffff';

const LoginScreen: React.FC<{ onLogin?: () => void }> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSendOtp = () => {
        if (!email) {
            alert('Please enter your email.');
            return;
        }
        // Placeholder: send OTP to email
        alert(`Sending OTP to ${email}`);
        setOtpSent(true);
    };

    const handleVerifyOtp = () => {
        if (!otp) {
            alert('Please enter the OTP.');
            return;
        }
        alert('OTP Verified! Logging in...');
        onLogin && onLogin();
    };

    return (
        <View style={styles.fullContainer}>
            <View style={styles.cardWrapper}>
                <View style={styles.welcomeSection}>
                    <View style={[styles.abstractShape, styles.shapeLarge, { top: height * 0.1, left: -width * 0.1 }]} />
                    <View style={[styles.abstractShape, styles.shapeMedium, { bottom: height * 0.05, right: -width * 0.05, opacity: 0.8 }]} />
                    <View style={[styles.abstractShape, styles.shapeSmall, { top: height * 0.35, left: width * 0.0, opacity: 0.6 }]} />
                    <Text style={styles.welcomeText}>WELCOME Inframe</Text>
                    <Text style={styles.headlineText}>LOGIN WITH EMAIL</Text>
                    <Text style={styles.subText}>
                       Inframe School of Art, Design and Business
                    </Text>
                </View>

                {/* Right Login Section */}
                <View style={styles.signInSection}>
                    <Text style={styles.signInHeader}>Sign in</Text>
                    <Text style={styles.signInSubHeader}>Secure login using OTP</Text>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.icon}>📧</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Gmail Address"
                            placeholderTextColor="#a0a0a0"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* OTP Input if sent */}
                    {otpSent && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.icon}>🔑</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter OTP"
                                placeholderTextColor="#a0a0a0"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="numeric"
                            />
                        </View>
                    )}

                    {/* Primary Button */}
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={otpSent ? handleVerifyOtp : handleSendOtp}
                    >
                        <Text style={styles.primaryButtonText}>{otpSent ? 'Verify OTP' : 'Send OTP'}</Text>
                    </TouchableOpacity>

                    {!otpSent && (
                        <>
                            <Text style={styles.orText}>Or login with other</Text>
                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={() => alert('Social login placeholder')}
                            >
                                <Text style={styles.secondaryButtonText}>Sign In with other</Text>
                            </TouchableOpacity>
                            <Text style={styles.signUpText}>
                                Don't have an account?{' '}
                                <Text style={styles.signUpLink} onPress={() => alert('Sign Up placeholder')}>Sign Up</Text>
                            </Text>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: PRIMARY_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardWrapper: {
        width: width > 768 ? width * 0.7 : width * 0.95,
        height: height > 600 ? height * 0.7 : height * 0.9,
        maxWidth: 1000,
        maxHeight: 600,
        backgroundColor: CARD_BG_COLOR,
        borderRadius: 25,
        overflow: 'hidden',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
        elevation: 20,
    },
    welcomeSection: {
        width: '40%',
        backgroundColor: PRIMARY_BLUE,
        padding: 40,
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    welcomeText: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 5, opacity: 0.9 },
    headlineText: { fontSize: 16, fontWeight: '500', color: '#E0E0E0', marginBottom: 30 },
    subText: { fontSize: 14, color: '#CCCCCC', lineHeight: 18 },
    abstractShape: {
        position: 'absolute',
        backgroundColor: SECONDARY_BLUE,
        borderRadius: 999,
        opacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    shapeLarge: { width: 250, height: 250 },
    shapeMedium: { width: 150, height: 150 },
    shapeSmall: { width: 100, height: 100 },
    signInSection: {
        width: '60%',
        backgroundColor: CARD_BG_COLOR,
        padding: 40,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: -5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 15,
    },
    signInHeader: { fontSize: 36, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    signInSubHeader: { fontSize: 14, color: '#999', marginBottom: 30 },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: INPUT_BG_COLOR,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    icon: { fontSize: 18, color: '#999', marginRight: 10 },
    input: { flex: 1, height: '100%', fontSize: 16, color: '#333', paddingVertical: 0 },
    primaryButton: {
        width: '100%',
        backgroundColor: SECONDARY_BLUE,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
    orText: { fontSize: 14, color: '#A0A0A0', textAlign: 'center', marginBottom: 20 },
    secondaryButton: {
        width: '100%',
        backgroundColor: CARD_BG_COLOR,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 40,
    },
    secondaryButtonText: { color: SECONDARY_BLUE, fontSize: 18, fontWeight: '600' },
    signUpText: { fontSize: 14, color: '#666', textAlign: 'center' },
    signUpLink: { color: SECONDARY_BLUE, fontWeight: 'bold' },
});

export default LoginScreen;
