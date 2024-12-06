import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '@/src/theme';
import { useTheme } from '@react-navigation/native';

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
  const { colors } = useTheme();
  const handlePress = () => {
    const newValues = isActive
      ? updatedCheckedValues.filter((v) => v !== item.value)
      : [...updatedCheckedValues, item.value];

    setUpdatedCheckedValues(newValues);
    onChange(newValues);
  };

  return (
    <TouchableOpacity
      style={[
        styles.checkBox,
        isActive && {
          backgroundColor: colors.checkboxActiveBackground,
        },
        {
          backgroundColor: colors.checkboxInactiveBackground,
          borderColor: colors.inputBorder,
        },
      ]}
      onPress={handlePress}
    >
      <MaterialIcons
        name={isActive ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={isActive ? colors.backgroundPrimary : colors.textSecondary}
      />
      <Text
        style={
          isActive
            ? [
                styles.text,
                {
                  color: colors.checkboxActiveText,
                },
              ]
            : styles.text
        }
      >
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
    paddingHorizontal: 15,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
  },
  activeCheckboxColor: {},
  text: {
    fontSize: theme.fontSizes.body,
    marginLeft: 15,
  },
  activeText: {},
});
