import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../theme';

interface CheckBoxItemProps {
  item: { value: string; label: string };
  isActive: boolean;
  updatedCheckedValues: string[];
  setUpdatedCheckedValues: React.Dispatch<React.SetStateAction<string[]>>;
  onChange: (newCheckedValues: string[]) => void;
}

export default function CheckBoxItem({
  item,
  isActive,
  updatedCheckedValues,
  setUpdatedCheckedValues,
  onChange,
}: CheckBoxItemProps) {
  const handlePress = () => {
    const newValues = isActive
      ? updatedCheckedValues.filter((v) => v !== item.value)
      : [...updatedCheckedValues, item.value];

    setUpdatedCheckedValues(newValues);
    onChange(newValues);
  };

  return (
    <TouchableOpacity
      style={[styles.checkBox, isActive && styles.activeCheckboxColor]}
      onPress={handlePress}
    >
      <MaterialIcons
        name={isActive ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={
          isActive ? theme.colors.backgroundPrimary : theme.colors.textSecondary
        }
      />
      <Text style={isActive ? [styles.text, styles.activeText] : styles.text}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: theme.colors.checkboxInactiveBackground,
    paddingHorizontal: 15,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
  },
  activeCheckboxColor: {
    backgroundColor: theme.colors.checkboxActiveBackground,
  },
  text: {
    fontSize: theme.fontSizes.body,
    marginLeft: 15,
    color: theme.colors.checkboxInactiveText,
  },
  activeText: {
    color: theme.colors.checkboxActiveText,
  },
});
