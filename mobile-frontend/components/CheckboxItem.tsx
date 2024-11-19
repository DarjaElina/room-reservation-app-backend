import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CheckBoxItem({
  item,
  isActive,
  updatedCheckedValues,
  setUpdatedCheckedValues,
  onChange,
}) {
  return (
    <TouchableOpacity
      style={[styles.checkBox, isActive && styles.activeCheckboxColor]}
      onPress={() => {
        const newValues = isActive
          ? updatedCheckedValues.filter((v) => v !== item.value)
          : [...updatedCheckedValues, item.value];
        setUpdatedCheckedValues(newValues);
        onChange(newValues);
      }}
    >
      <MaterialIcons
        name={isActive ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={isActive ? '#ffffff' : '#f4e1f6'}
      />
      <Text style={isActive ? [styles.text, styles.activeText] : styles.text}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  checkBox: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#48225a',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  activeCheckboxColor: {
    backgroundColor: '#6a329b',
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
    color: '#f4e1f6',
  },
  activeText: {
    color: '#ffffff',
  },
});
