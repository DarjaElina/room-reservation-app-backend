import { View } from 'react-native';
import TimePicker from '../../../../../components/TimePicker';
import DatePicker from '../../../../../components/DatePicker';
import { useLocalSearchParams } from 'expo-router';

export default function BookingModificationScreen() {
  const { date }: {date: string} = useLocalSearchParams();
  console.log('query', date)
  console.log('start time here!!', new Date(date).toLocaleTimeString('it-IT'));
  return (
    <View>
      <DatePicker dateToModify={new Date(date)}/>
      <TimePicker startTime={new Date(date).toLocaleTimeString('it-IT')}/>
    </View>
  );
}