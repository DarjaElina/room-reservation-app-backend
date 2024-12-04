import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';
import { useTheme } from '@react-navigation/native';

interface EquipmentProp {
  name: string;
}

export default function EquipmentItem({ name }: EquipmentProp) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundSecondary,
          shadowColor: colors.shadow || '#000',
        },
      ]}
    >
      <Text style={[, { color: colors.textPrimary }]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
