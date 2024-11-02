import { View, Text } from 'react-native';
import theme from '../theme';

interface SelectedTimeSlotProps {
  value?: string;
  color: string;
}

export default function SelectedTimeSlot({
  value,
  color,
}: SelectedTimeSlotProps) {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 25,
        backgroundColor: color,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        width: '80%',
      }}
    >
      <Text style={{ color: theme.colors.textPrimary }}>{value}</Text>
    </View>
  );
}
