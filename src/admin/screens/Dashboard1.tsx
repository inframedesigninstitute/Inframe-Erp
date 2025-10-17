import { FC, useState } from "react";
import {
  Dimensions,
  ScrollView // ⬅️ ScrollView Imported Here
  ,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

// --- Utility and Type Definitions (Unchanged) ---
const { width } = Dimensions.get('window');
const isSmallScreen = width < 450; 

interface AdminLoginScreenProps {
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

// --- 2. Custom Input Field Component (Unchanged) ---
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

// --- 3. Demo Button Component (Unchanged) ---
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

// --- 4. Main EduManage Login Screen Component (Updated to use ScrollView) ---

const EduManageLoginScreen: FC<AdminLoginScreenProps> = ({ onSuccessfulLogin }) => {
  const [selectedRole, setSelectedRole] = useState('Student');

  return (
    <ScrollView 
        style={styles.scrollView} // Apply flex: 1 for fill screen
        contentContainerStyle={styles.container} // Apply centering/padding to content
        keyboardShouldPersistTaps="handled" // Best practice for forms
    >
      
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

        {/* Form Inputs (Full Name, Email, Password, Role Dropdown) */}
        
        <Text style={styles.inputLabel}>Full Name</Text>
        <CustomInput 
          placeholder="Enter your full name" 
          iconName="person-outline"
        />

        <Text style={styles.inputLabel}>Email</Text>
        <CustomInput 
          placeholder="Enter your email" 
          iconName="mail-outline"
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <CustomInput 
          placeholder="Enter your password" 
          iconName="lock-closed-outline"
          secureTextEntry={true}
        />

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
              color: '#9ea0a0',
            }}
            Icon={() => {
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
    </ScrollView>
  );
};

export default EduManageLoginScreen;

// --- 5. Stylesheet (Updated for ScrollView) ---

const styles = StyleSheet.create({
  // New style for the ScrollView wrapper
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
  },
  // Content container style (was the main container style)
  container: {
    flexGrow: 1, // Allows content to grow within ScrollView
    alignItems: 'center',
    paddingVertical: 40, 
    justifyContent: 'center', // Center content vertically if screen height allows
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