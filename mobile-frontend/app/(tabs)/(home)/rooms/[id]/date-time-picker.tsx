import { View } from 'react-native';
import TimePicker from '../../../../../components/TimePicker';
import DatePicker from '../../../../../components/DatePicker';

export default function DateTimePickerScreen() {
  return (
    <View>
      <DatePicker />
      <TimePicker />
    </View>
  );
}
