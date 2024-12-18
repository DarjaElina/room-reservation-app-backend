import { View } from 'react-native';
import TimePicker from '@/src/components/TimePicker';
import DatePicker from '@/src/components/DatePicker';
import { useLocalSearchParams } from 'expo-router';

type SearchParamType = {
  start: string;
  end: string;
  bookingId: string;
};

export default function BookingModificationScreen() {
  const { start, end, bookingId } = useLocalSearchParams<SearchParamType>();
  return (
    <View style={{ flex: 1 }}>
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
