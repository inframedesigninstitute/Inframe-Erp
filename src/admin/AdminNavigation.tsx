import { FC, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View
} from "react-native";
// Make sure these dependencies are installed:
// npm install react-native-vector-icons react-native-picker-select
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

// --- 1. Utility and Type Definitions ---

// Determine screen size for potential layout adjustments
const { width } = Dimensions.get('window');
const isSmallScreen = width < 450; 

interface AdminLoginScreenProps {
  // Renamed to match the new component's logical action (Sign In)
  onSuccessfulLogin: () => void; 
}

interface CustomInputProps {
  placeholder: string;
  iconName: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
}

interface DemoButtonProps {
  label: string;
  onPress: () => void;
  color: string;
}

// --- 2. Custom Input Field Component ---
const CustomInput: FC<CustomInputProps> = ({ 
    placeholder, 
    iconName, 
    secureTextEntry = false, 
    keyboardType = 'default' 
}) => (
  <View style={inputStyles.container}>
    <Icon name={iconName} size={20} color="#8a8a8a" style={inputStyles.icon} />
    <TextInput
      style={inputStyles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholderTextColor="#b0b0b0"
    />
  </View>
);

const inputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingVertical: 0, 
  },
});

// --- 3. Demo Button Component ---
const DemoButton: FC<DemoButtonProps> = ({ label, onPress, color }) => (
    <TouchableOpacity style={[demoButtonStyles.button, { backgroundColor: color }]} onPress={onPress}>
        <Text style={demoButtonStyles.buttonText}>{label}</Text>
    </TouchableOpacity>
);

const demoButtonStyles = StyleSheet.create({
    button: {
        flex: 1, 
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 120, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

// --- 4. Main Admin Login Screen Component ---

const AdminLoginScreen: FC<AdminLoginScreenProps> = ({ onSuccessfulLogin }) => {
  const [selectedRole, setSelectedRole] = useState('Student');

  return (
    <View style={styles.container}>
      {/* Top Logo and Title */}
      <View style={styles.header}>
        <Icon name="school-outline" size={50} color="#333333" /> 
        <Text style={styles.mainTitle}>EduManage ERP</Text>
        <Text style={styles.subTitle}>Educational Institution Management System</Text>
      </View>

      {/* Login Card */}
      <View style={styles.loginCard}>
        <Text style={styles.cardTitle}>Sign In</Text>
        <Text style={styles.cardSubtitle}>Access your educational portal</Text>

        {/* Full Name Input */}
        <Text style={styles.inputLabel}>Full Name</Text>
        <CustomInput 
          placeholder="Enter your full name" 
          iconName="person-outline"
        />

        {/* Email Input */}
        <Text style={styles.inputLabel}>Email</Text>
        <CustomInput 
          placeholder="Enter your email" 
          iconName="mail-outline"
          keyboardType="email-address"
        />

        {/* Password Input */}
        <Text style={styles.inputLabel}>Password</Text>
        <CustomInput 
          placeholder="Enter your password" 
          iconName="lock-closed-outline"
          secureTextEntry={true}
        />

        {/* Role Dropdown */}
        <Text style={styles.inputLabel}>Role</Text>
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedRole(value)}
            items={[
              { label: 'Student', value: 'Student' },
              { label: 'Teacher', value: 'Teacher' },
              { label: 'Admin', value: 'Admin' },
            ]}
            value={selectedRole}
            style={pickerSelectStyles}
            placeholder={{
              label: 'Select your role...',
              value: null,
              color: '#9ea0a4',
            }}
            Icon={() => {
              // Using Ionicons for the dropdown icon
              return <Icon name="chevron-down" size={20} color="#8a8a8a" />;
            }}
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={onSuccessfulLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Demo Access Section */}
        <Text style={styles.demoAccessText}>DEMO ACCESS</Text>
        <View style={styles.demoButtonsContainer}>
          <DemoButton label="Admin Demo" onPress={() => console.log('Admin Demo')} color="#5b4dc1" />
          <DemoButton label="Teacher Demo" onPress={() => console.log('Teacher Demo')} color="#5b4dc1" />
        </View>
        <View style={styles.demoButtonsContainer}>
          <DemoButton label="Student Demo" onPress={() => console.log('Student Demo')} color="#5b4dc1" />
          <DemoButton label="Admin Demo" onPress={() => console.log('Another Admin Demo')} color="#5b4dc1" />
        </View>
      </View>
    </View>
  );
};

export default AdminLoginScreen;

// --- 5. Stylesheet ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
    alignItems: 'center',
    paddingVertical: 40, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  loginCard: {
    width: '90%', 
    maxWidth: 500, 
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#8a8a8a',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  dropdownContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 15,
  },
  signInButton: {
    backgroundColor: '#333333', 
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoAccessText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8a8a8a',
    marginTop: 30,
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  demoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, 
  },
});

// Styles for RNPickerSelect 
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: '#333333',
    paddingRight: 30, 
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#333333',
    paddingRight: 30, 
  },
  iconContainer: {
    top: 15,
    right: 15,
  },
  placeholder: {
    color: '#b0b0b0',
    fontSize: 16,
  },
});