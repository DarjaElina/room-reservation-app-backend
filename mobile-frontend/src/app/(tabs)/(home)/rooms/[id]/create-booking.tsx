import { View } from 'react-native';
import TimePicker from '@/src/components/TimePicker';
import DatePicker from '@/src/components/DatePicker';

export default function BookingCreationScreen() {
  return (
    <View>
      <DatePicker />
      <TimePicker />
    </View>
  );
}
