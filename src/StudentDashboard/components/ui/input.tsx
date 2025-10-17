import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  placeholder?: string;
  secureTextEntry?: boolean;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  keyboardType = "default",
  placeholder = "",
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#000000ff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
