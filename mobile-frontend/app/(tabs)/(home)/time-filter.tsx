import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import Button from '../../../components/Button';
import { z, ZodType } from 'zod';
import useFilter from '../../../hooks/useFilter';
import { router } from 'expo-router';

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
      Alert.alert(
        'Searching for available classrooms',
        `From ${startDate.toDateString()}, ${startDate.toLocaleTimeString(undefined, { timeStyle: 'short' })} to ${endDate.toDateString()}, ${endDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`,
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Search cancelled');
            },
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              console.log('Proceeding to search results');
              router.replace('/(home)/');
            },
          },
        ]
      );
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
    backgroundColor: '#340b46',
    padding: 20,
  },
  instructionText: {
    color: '#e3d5f0',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    marginBottom: 15,
    width: '100%',
    borderRadius: 8,
    padding: 10,
  },
  button: {
    backgroundColor: '#090623',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
});
