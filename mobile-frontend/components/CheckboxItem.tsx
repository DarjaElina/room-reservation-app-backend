import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'expo-checkbox';

export default function CheckboxItem({ name, isChecked, setChecked }) {
  return (
    <View style={styles.checkboxItem}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color="#d9a3ff"
      />
      <Text style={styles.venueText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
  },
  venueText: {
    fontSize: 15,
    color: '#e3d5f0',
    marginLeft: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
  },
});
