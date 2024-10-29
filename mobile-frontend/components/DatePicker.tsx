import { useState } from 'react';
import { View, Button, Text } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ date, setDate }) {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
 

  return (
    <View>
      <RNDateTimePicker
        minimumDate={new Date()}
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        onChange={onChange}
      />
    </View>
  );
}
