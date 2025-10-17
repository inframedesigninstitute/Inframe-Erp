import { FC } from "react";
import { Dimensions, Image, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const isTabletOrWeb = width >= 768; 

// --- 1. Custom Component Interfaces for TypeScript ---

interface LabeledInputProps {
  label: string;
  placeholder: string;
  iconName: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType']; // React Native TextInputProps से टाइप लें
}

interface SocialIconProps {
  name: string;
  color: string;
}

// --- 2. Reusable Input Field Component ---
const LabeledInput: FC<LabeledInputProps> = ({ 
    label, 
    placeholder, 
    iconName, 
    secureTextEntry = false, 
    keyboardType = 'default' 
}) => (
  <View style={inputStyles.container}>
    <Text style={inputStyles.label}>{label}</Text>
    <View style={inputStyles.inputWrapper}>
      <Icon name={iconName} size={20} color="#8a8a8a" style={inputStyles.icon} />
      <TextInput
        style={inputStyles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType} // अब यह सही टाइप है
        placeholderTextColor="#b0b0b0"
      />
      {secureTextEntry && (
        <TouchableOpacity style={inputStyles.eyeIconContainer}>
          <Icon name="eye-outline" size={20} color="#8a8a8a" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#8a8a8a',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    paddingHorizontal: 10,
    height: 50,
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
  eyeIconContainer: {
    padding: 5,
  }
});

// --- 3. Social Icon Button Component ---
const SocialIcon: FC<SocialIconProps> = ({ name, color }) => (
    <TouchableOpacity style={socialStyles.iconContainer}>
        <FontAwesome name={name} size={24} color={color} />
    </TouchableOpacity>
);

const socialStyles = StyleSheet.create({
    iconContainer: {
        marginHorizontal: 10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: '#f5f5f5',
    }
});

// --- 4. Main Login Screen Component ---

type Props = {
  onLoginSuccess: () => void;
};

const AdminLoginScreen: FC<Props> = ({ onLoginSuccess }) => {
  return (
    <View style={styles.container}>
      {/* --- Left Column: Text and Image (Only visible on larger screens) --- */}
      {isTabletOrWeb && (
        <View style={styles.leftPanel}>
          <Text style={styles.leftTitle}>ONLINE EDUCATION IS NOW SIMPLE</Text>
          <Image 
            source={{ uri: 'https://i.imgur.com/K1L5i2J.png' }} 
            style={styles.illustration} 
            resizeMode="contain"
          />
        </View>
      )}

      {/* --- Right Column: Login Form Card --- */}
      <View style={[styles.rightPanel, !isTabletOrWeb && { flex: 1, width: '100%' }]}>
        <View style={styles.loginCard}>
          <Text style={styles.welcomeText}>Welcome</Text>

          {/* Email Input */}
          <LabeledInput 
            label="Email" 
            placeholder="Type Username" 
            iconName="mail-outline"
            keyboardType="email-address" // सही मान (valid value)
          />

          {/* Password Input */}
          <LabeledInput 
            label="Password" 
            placeholder="Enter Password" 
            iconName="lock-closed-outline"
            secureTextEntry={true}
          />
          
          {/* Remember Login & Forgot Password */}
          <View style={styles.rowBetween}>
            <TouchableOpacity onPress={() => console.log('Remember login')}>
              <Text style={styles.smallLink}>Remember Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Forgot password')}>
              <Text style={styles.smallLink}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={onLoginSuccess}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          {/* OR Separator */}
          <Text style={styles.orText}>OR</Text>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <SocialIcon name="facebook" color="#3b5998" />
            <SocialIcon name="medium" color="#000000" />
            <SocialIcon name="twitter" color="#1da1f2" />
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity style={styles.signUpContainer} onPress={() => console.log('Navigate to Sign Up')}>
            <Text style={styles.signUpText}>
              Don't have account? 
              <Text style={styles.signUpLink}> SignUp</Text>
            </Text>
          </TouchableOpacity>
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
    flexDirection: isTabletOrWeb ? 'row' : 'column', 
    backgroundColor: '#f8f8f8', 
  },
  leftPanel: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  leftTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3c3c3c',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 300,
  },
  illustration: {
    width: '80%', 
    height: 300, 
  },
  rightPanel: {
    flex: isTabletOrWeb ? 1 : undefined, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: isTabletOrWeb ? 0 : 20, 
  },
  loginCard: {
    width: isTabletOrWeb ? '70%' : '100%', 
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#5b4dc1', 
    textAlign: 'center',
    marginBottom: 40,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    marginTop: -10, 
  },
  smallLink: {
    fontSize: 14,
    color: '#8a8a8a',
  },
  button: {
    backgroundColor: '#5b4dc1', 
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 25,
    fontSize: 16,
    color: '#8a8a8a',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  signUpContainer: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#8a8a8a',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#5b4dc1',
  }
});