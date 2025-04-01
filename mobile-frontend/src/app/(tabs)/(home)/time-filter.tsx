import { View, Text, Alert, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { z, ZodType } from 'zod';
import useFilter from '@/src/hooks/useFilter';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '@/src/i18n/i18n-react';
import useStyles from '@/src/hooks/useStyles';

type FormData = {
  startDate: Date;
  endDate: Date;
};

const dateValidationSchema: ZodType<FormData> = z
  .object({
    startDate: z.coerce.date().refine((data) => data > new Date(), {
      message: 'Start date must be in the future',
    }),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date cannot be earlier than start date.',
    path: ['endDate'],
  });

const validateDates = (startDate: Date, endDate: Date) => {
  const result = dateValidationSchema.safeParse({ startDate, endDate });
  if (!result.success) {
    Alert.alert(result.error.errors[0].message);
    return false;
  }
  return true;
};

export default function TimeFilter() {
  const { colors } = useTheme();
  const { startDate, setStartDate, endDate, setEndDate } = useFilter();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const { LL } = useI18nContext();
  const styles = useStyles();

  // Android/iOS Date Pickers
  const showStartDatePicker = () => setStartDatePickerVisibility(true);
  const hideStartDatePicker = () => setStartDatePickerVisibility(false);
  const showEndDatePicker = () => setEndDatePickerVisibility(true);
  const hideEndDatePicker = () => setEndDatePickerVisibility(false);

  const handleStartDateConfirm = (date: Date) => {
    const clonedDate = new Date(date);
    if (
      validateDates(
        date,
        new Date(clonedDate.setHours(clonedDate.getHours() + 1))
      )
    ) {
      setStartDate(date);
      const endDateTime = new Date(date);
      endDateTime.setHours(date.getHours() + 1);
      setEndDate(endDateTime);
      hideStartDatePicker();
    }
  };

  const handleEndDateConfirm = (time: {
    getHours: () => number;
    getMinutes: () => number;
  }) => {
    if (startDate) {
      const endDateTime = new Date(startDate);
      endDateTime.setHours(time.getHours());
      endDateTime.setMinutes(time.getMinutes());
      if (validateDates(startDate, endDateTime)) {
        setEndDate(endDateTime);
        hideEndDatePicker();
      }
    } else {
      Alert.alert('Please, select start date first.');
    }
  };

  // Web Input Change Handlers
  const handleStartDateChange = (e: {
    target: { value: string | number | Date };
  }) => {
    const date = new Date(e.target.value);
    const clonedDate = new Date(date);
    if (
      validateDates(
        date,
        new Date(clonedDate.setHours(clonedDate.getHours() + 1))
      )
    ) {
      setStartDate(date);
      const endDateTime = new Date(date);
      endDateTime.setHours(date.getHours() + 1);
      setEndDate(endDateTime);
    }
  };

  const handleEndDateChange = (e: {
    target: { value: string | number | Date };
  }) => {
    if (startDate) {
      const date = new Date(e.target.value);
      if (validateDates(startDate, date)) {
        setEndDate(date);
      }
    } else {
      Alert.alert('Please select a start date first.');
    }
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      router.replace('/(tabs)/(home)');
    } else {
      Alert.alert('Please select both start and end dates.');
    }
  };

  const clearSearch = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleReset = () => {
    Alert.alert('Are you sure?', 'This will reset your date selections.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Yes, Clear', onPress: clearSearch },
    ]);
  };

  return (
    <View
      style={[
        styles.flexContainer,
        styles.scrollContainer,
        {
          backgroundColor: colors.background,
          justifyContent: 'center',
        },
      ]}
    >
      <Text
        style={[
          styles.bigText,
          styles.textContainer,
          {
            color: colors.text,
            textAlign: 'center',
          },
        ]}
      >
        {LL.SELECT_TIME_RANGE()}
      </Text>
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <TextInput
          activeUnderlineColor={colors.primary}
          label="Start Date"
          value={
            startDate
              ? `${startDate.toDateString()}, ${startDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`
              : ''
          }
          onPressIn={showStartDatePicker}
          style={[styles.input]}
          placeholderTextColor={colors.text}
          textColor={colors.text}
        />
      ) : (
        <input
          type="datetime-local"
          value={startDate ? startDate.toISOString().slice(0, 16) : ''}
          onChange={handleStartDateChange}
          style={{
            padding: 10,
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: 16,
            margin: 10,
          }}
        />
      )}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
        minimumDate={new Date()}
        minuteInterval={15}
      />
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <TextInput
          activeUnderlineColor={colors.primary}
          label="End Date"
          value={
            endDate
              ? `${endDate.toDateString()}, ${endDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`
              : ''
          }
          onPressIn={showEndDatePicker}
          style={[styles.input]}
          placeholderTextColor={colors.text}
          textColor={colors.text}
        />
      ) : (
        <input
          type="datetime-local"
          value={endDate ? endDate.toISOString().slice(0, 16) : ''}
          onChange={handleEndDateChange}
          style={{
            padding: 10,
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: 16,
            margin: 10,
          }}
        />
      )}
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="time"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
        minuteInterval={15}
      />
      <Button
        label="Search classrooms"
        onSubmit={handleSearch}
        style={styles.button}
      />
      {(startDate || endDate) && (
        <Button
          label="Clear Dates"
          onSubmit={Platform.OS === 'web' ? clearSearch : handleReset}
          style={[styles.button, { backgroundColor: colors.primary }]}
        />
      )}
    </View>
  );
}
