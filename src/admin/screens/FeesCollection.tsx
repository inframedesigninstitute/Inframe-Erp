// Example: src/screens/Admission.tsx

import { StyleSheet, Text, View } from 'react-native';

const Admission = () => {
  return (
    <View style={styles.container}>
      <Text>Admission Screen Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default Admission;
