import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import Button from '../../../components/Button';
import { z, ZodType } from 'zod';
import useFilter from '../../../hooks/useFilter';
import { router } from 'expo-router';
import theme from '../../../theme';

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
  const { startDate, setStartDate, endDate, setEndDate } = useFilter();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date) => {
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

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (time) => {
    if (startDate) {
      const endDateTime = new Date(startDate);
      endDateTime.setHours(time.getHours());
      endDateTime.setMinutes(time.getMinutes());
      if (validateDates(startDate, endDateTime)) {
        setEndDate(endDateTime);
        hideEndDatePicker();
      }
    } else Alert.alert('Please, select start date first.');
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      router.replace('/(home)');
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
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Select the time range to search for available classrooms.
      </Text>
      <TextInput
        disabled
        activeUnderlineColor={theme.colors.inputActiveBorder}
        label="Start Date"
        value={
          startDate
            ? `${startDate.toDateString()}, ${startDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`
            : ''
        }
        onPressIn={showStartDatePicker}
        style={styles.textInput}
      />
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
        minimumDate={new Date()}
        minuteInterval={15}
      />
      <TextInput
        disabled
        activeUnderlineColor={theme.colors.inputActiveBorder}
        label="End Date"
        value={
          endDate
            ? `${endDate.toDateString()}, ${endDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`
            : ''
        }
        onPressIn={showEndDatePicker}
        style={styles.textInput}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="time"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
        minuteInterval={15}
      />
      <Button
        label="Search Classrooms"
        onSubmit={handleSearch}
        style={styles.button}
      />
      {(startDate || endDate) && (
        <Button
          label="Clear Dates"
          onSubmit={handleReset}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
  },
  instructionText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: theme.colors.backgroundPrimary,
    marginBottom: 15,
    width: '100%',
    borderRadius: 8,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.buttonBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
});
