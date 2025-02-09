import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import useBookingContext from '@/src/hooks/useBookingContext';
import { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import useStyles from '../hooks/useStyles';

interface DatePickerProps {
  dateToModify?: Date;
}

export default function DatePicker({ dateToModify }: DatePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { date, setDate } = useBookingContext();
  const { colors } = useTheme();
  const styles = useStyles();

  useEffect(() => {
    if (dateToModify) {
      setDate(dateToModify);
    }
  }, []);

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
      style={[
        styles.headerContainer,
        {
          backgroundColor: colors.backgroundPrimary,
        },
      ]}
    >
      <AntDesign.Button
        testID="prev_day_button"
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
        testID='date_time_picker_modal'
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />
      <AntDesign.Button
        testID="next_day_button"
        backgroundColor="lightgrey"
        name="caretright"
        size={24}
        color="black"
        onPress={handleNextDay}
      />
    </View>
  );
}
