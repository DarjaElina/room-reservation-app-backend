import { View, Text, StyleSheet } from 'react-native';

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
  return (
    <View testID="selected_time_slot" style={[styles.container, { backgroundColor: color }]}>
      {value && <Text style={styles.text}>{value}</Text>}
      {displayBookingTitle && (
        <Text style={styles.text}>{bookingInfo?.title}</Text>
      )}
      {displayBookingUser && (
        <Text style={styles.text}>{bookingInfo?.user}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 25,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    width: '80%',
  },
  text: {
    color: '#fff',
  },
});
