import { View } from 'react-native';
import TimePicker from '@/src/components/TimePicker';
import DatePicker from '@/src/components/DatePicker';
import { useLocalSearchParams } from 'expo-router';

export default function BookingModificationScreen() {
  const { start, end, bookingId } = useLocalSearchParams();
  return (
    <View>
      <DatePicker dateToModify={new Date(start)} />
      <TimePicker
        startTime={new Date(start).toLocaleTimeString('it-IT')}
        endTime={new Date(end).toLocaleTimeString('it-IT')}
        modificationMode={true}
        bookingId={bookingId}
      />
    </View>
  );
}
