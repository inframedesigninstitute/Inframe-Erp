import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarInput } from "../../components/CalendarInput";
import { Input } from "../../components/ui/input";

type StudentFormData = {
  firstName: string;
  lastName: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  emergencyPhone: string;
  religion: string;
  maritalStatus: string;
  bloodGroup: string;
};

const NewAdmissionScreen: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    emergencyPhone: "",
    religion: "",
    maritalStatus: "",
    bloodGroup: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (name: keyof StudentFormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Student Admission</Text>

      {/* Step Navigation */}
      <View style={styles.steps}>
        <Text style={step === 1 ? styles.activeStep : styles.step}>
          1. Basic Info
        </Text>
        <Text style={step === 2 ? styles.activeStep : styles.step}>
          2. Educational Info
        </Text>
        <Text style={step === 3 ? styles.activeStep : styles.step}>
          3. Documents
        </Text>
      </View>

      {step === 1 && (
        <View style={styles.formStep}>
          {/* ROW 1 */}
          <FormRow>
            <FormInput
              label="First Name *"
              value={formData.firstName}
              onChangeText={(val) => handleChange("firstName", val)}
            />
            <FormInput
              label="Last Name *"
              value={formData.lastName}
              onChangeText={(val) => handleChange("lastName", val)}
            />
          </FormRow>

          {/* ROW 2 */}
          <FormRow>
            <FormInput
              label="Father's Name"
              value={formData.fatherName}
              onChangeText={(val) => handleChange("fatherName", val)}
            />
            <FormInput
              label="Father's Occupation"
              value={formData.fatherOccupation}
              onChangeText={(val) => handleChange("fatherOccupation", val)}
            />
          </FormRow>

          {/* ROW 3 */}
          <FormRow>
            <FormInput
              label="Mother's Name"
              value={formData.motherName}
              onChangeText={(val) => handleChange("motherName", val)}
            />
            <FormInput
              label="Mother's Occupation"
              value={formData.motherOccupation}
              onChangeText={(val) => handleChange("motherOccupation", val)}
            />
          </FormRow>

          {/* ROW 4 */}
          <FormRow>
            <FormInput
              label="Phone *"
              value={formData.phone}
              keyboardType="phone-pad"
              onChangeText={(val) => handleChange("phone", val)}
            />
            <FormInput
              label="Email *"
              value={formData.email}
              keyboardType="email-address"
              onChangeText={(val) => handleChange("email", val)}
            />
          </FormRow>

          {/* ROW 5 */}
          <FormRow>
            <PickerContainer label="Gender *">
              <Picker
                selectedValue={formData.gender}
                onValueChange={(val: string) => handleChange("gender", val)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </PickerContainer>

          <CalendarInput
  label="Date Of Birth *"
  value={formData.dateOfBirth}
  onChange={(val: string) => handleChange("dateOfBirth", val)}
/>


          </FormRow>

          {/* ROW 6 */}
          <FormRow>
            <FormInput
              label="Emergency Phone"
              value={formData.emergencyPhone}
              keyboardType="phone-pad"
              onChangeText={(val) => handleChange("emergencyPhone", val)}
            />
            <FormInput
              label="Religion"
              value={formData.religion}
              onChangeText={(val) => handleChange("religion", val)}
            />
          </FormRow>

          {/* ROW 7 */}
          <FormRow>
            <PickerContainer label="Marital Status">
              <Picker
                selectedValue={formData.maritalStatus}
                onValueChange={(val: string) => handleChange("maritalStatus", val)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Single" value="single" />
                <Picker.Item label="Married" value="married" />
              </Picker>
            </PickerContainer>

            <PickerContainer label="Blood Group">
              <Picker
                selectedValue={formData.bloodGroup}
                onValueChange={(val: string) => handleChange("bloodGroup", val)}
              >
                <Picker.Item label="Select" value="" />
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                  <Picker.Item key={bg} label={bg} value={bg} />
                ))}
              </Picker>
            </PickerContainer>
          </FormRow>
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        {step > 1 && (
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 3 && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {step === 3 && (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

// FormInput Component
const FormInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  placeholder?: string;
}> = ({ label, value, onChangeText, keyboardType, placeholder }) => (
  <View style={styles.formRow}>
    <Text style={styles.label}>{label}</Text>
    <Input
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || "default"}
      placeholder={placeholder}
    />
  </View>
);

// FormRow Component for two-column layout
const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.formRowContainer}>{children}</View>
);

// PickerContainer Component
const PickerContainer: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <View style={styles.pickerContainer}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  steps: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  step: { color: "#888" },
  activeStep: { fontWeight: "bold", color: "#000" },
  formStep: { flexDirection: "column", marginBottom: 20 },
  formRowContainer: { flexDirection: "row", justifyContent: "space-between" },
  formRow: { flex: 1, marginRight: 10 },
  pickerContainer: { flex: 1, marginRight: 10, minWidth: 150, }, 
  label: { fontWeight: "bold", marginBottom: 5, },
  navButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: { backgroundColor: "#bdbef5ff", padding: 10, borderRadius: 5 },
  buttonText: { color: "#000000ff", fontWeight: "bold" },
});

export default NewAdmissionScreen;
