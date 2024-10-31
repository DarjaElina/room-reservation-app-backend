import { View, Text } from 'react-native';
import theme from '../theme';

export default function SelectedTimeSlot({ value }: { value: string }) {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 25,
        backgroundColor: '#b39ddb',
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
