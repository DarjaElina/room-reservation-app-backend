import { View, Text, StyleSheet } from 'react-native';

interface BookingItemProps {
  startDate: Date;
  endDate: Date;
}

export default function BookingItem({ startDate, endDate }: BookingItemProps) {
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);

  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return (
    <View>
      <Text>{`${formattedStartDate.toLocaleString(undefined, options)} - ${formattedEndDate.toLocaleString(undefined, options)}`}</Text>
      <Text></Text>
    </View>
  );
}
