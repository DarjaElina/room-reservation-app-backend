import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

interface EquipmentProp {
  name: string;
}

export default function EquipmentItem({ name }: EquipmentProp) {
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    <View
      style={[
        styles.equipmentItemContainer,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <Text style={styles.smallText}>{name}</Text>
    </View>
  );
}
