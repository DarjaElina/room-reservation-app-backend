import { useState } from 'react';
import { View } from 'react-native';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useBookingContext } from '../hooks/useBookingContext';

export default function DatePicker() {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);
  const { date, setDate } = useBookingContext();

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const handleNextDay = () => {
    setDate((prevDate) => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate;
    });
  };

  const handlePrevDay = () => {
    setDate((prevDate) => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(nextDate.getDate() - 1);
      return nextDate;
    });
  };

  return (
    <View
      style={{
        backgroundColor: 'lightgrey',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
      }}
    >
      <AntDesign.Button
        backgroundColor="lightgrey"
        name="caretleft"
        size={24}
        color="black"
        onPress={handlePrevDay}
        disabled={date > new Date() ? false : true}
      />
      <RNDateTimePicker
        minimumDate={new Date()}
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        onChange={onChange}
      />
      <AntDesign.Button
        backgroundColor="lightgrey"
        name="caretright"
        size={24}
        color="black"
        onPress={handleNextDay}
      />
    </View>
  );
}
