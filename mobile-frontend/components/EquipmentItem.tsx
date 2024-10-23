import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface EquipmentProp {
  name: string;
}

export default function EquipmentItem({ name }: EquipmentProp) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: 2,
    margin: 2,
    backgroundColor: theme.colors.textPrimary,
  },
});
