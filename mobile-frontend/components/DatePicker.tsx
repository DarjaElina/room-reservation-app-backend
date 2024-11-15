import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import useBookingContext from '../hooks/useBookingContext';

export default function DatePicker() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { date, setDate } = useBookingContext();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
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
      <TouchableOpacity
        onPress={showDatePicker}
        style={{
          backgroundColor: '#f0f0f0',
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, color: 'black' }}>
          {date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
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
