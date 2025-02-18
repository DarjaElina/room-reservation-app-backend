import { View, Text, StyleSheet } from 'react-native';
import useStyles from '../hooks/useStyles';

interface SelectedTimeSlotProps {
  value?: string;
  color: string;
  bookingInfo?: {
    title: string | null | undefined;
    user: string;
  };
  displayBookingTitle?: boolean;
  displayBookingUser?: boolean;
}

export default function SelectedTimeSlot({
  value,
  color,
  bookingInfo,
  displayBookingTitle,
  displayBookingUser,
}: SelectedTimeSlotProps) {
  const styles = useStyles();
  return (
    <View
      testID="selected_time_slot"
      style={[styles.selectedTimeSlot, { backgroundColor: color }]}
    >
      {value && <Text style={[, { color: '#fff' }]}>{value}</Text>}
      {displayBookingTitle && (
        <Text style={[{ color: '#fff' }]}>{bookingInfo?.title}</Text>
      )}
      {displayBookingUser && (
        <Text style={[{ color: '#fff' }]}>{bookingInfo?.user}</Text>
      )}
    </View>
  );
}
