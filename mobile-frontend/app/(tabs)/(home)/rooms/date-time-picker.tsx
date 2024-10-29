import { View, Alert } from 'react-native';
import TimePicker from '../../../../components/TimePicker';
import DatePicker from '../../../../components/DatePicker';
import Button from '../../../../components/Button';
import { useState } from 'react';

interface TimeSlot {
  hour: number;
  value: string;
}

export default function DateTimePickerScreen() {
  const [date, setDate] = useState(new Date());
  const [bookingStartDate, setBookingStartDate] = useState('');
  const [bookingEndDate, setBookingEndDate] = useState('');
  const [selectedTimeValues, setSelectedTimeValues] = useState<TimeSlot[]>([]);

  console.log('booking for backend', bookingStartDate, bookingEndDate);

  const handleSubmit = () => {
    if (selectedTimeValues.length > 2) {
      const sortedTimeArray = selectedTimeValues.sort();
      const startTime = sortedTimeArray[0].value;
      const endTime = sortedTimeArray[sortedTimeArray.length - 1].value;
      setBookingStartDate(`${date.toDateString()} ${startTime}`);
      setBookingEndDate(`${date.toDateString()} ${endTime}`);
    } else {
      Alert.alert('Empty booking', 'Please select booking time', [
        {
          text: 'Ok',
          onPress: () => console.log('Okay'),
        },
      ]);
    }
  }

  return (
    <View>
      <DatePicker date={date} setDate={setDate} />
      <Button label="Confirm" isSmall onSubmit={handleSubmit} />
      <TimePicker
        setSelectedValues={setSelectedTimeValues}
        selectedValues={selectedTimeValues}
      />
    </View>
  );
}
