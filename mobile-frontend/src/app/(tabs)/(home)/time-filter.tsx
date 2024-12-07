import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { z, ZodType } from 'zod';
import useFilter from '@/src/hooks/useFilter';
import { router } from 'expo-router';
import theme from '@/src/theme';
import {useTheme} from '@react-navigation/native';
import { useI18nContext } from '@/src/i18n/i18n-react';

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundPrimary,
        },
      ]}
    >
      <Text
        style={[
          styles.instructionText,
          {
            color: colors.textPrimary,
          },
        ]}
      >
       {LL.SELECT_TIME_RANGE()}
      </Text>
      <TextInput
        disabled
        activeUnderlineColor={colors.inputActiveBorder}
        label="Start Date"
        value={
          startDate
            ? `${startDate.toDateString()}, ${startDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`
            : ''
        }
        onPressIn={showStartDatePicker}
        style={[styles.textInput, { backgroundColor: colors.backgroundPrimary }]}
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
        activeUnderlineColor={colors.inputActiveBorder}
        label="End Date"
        value={
          endDate
            ? `${endDate.toDateString()}, ${endDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}`
            : ''
        }
        onPressIn={showEndDatePicker}
        style={[
          styles.textInput,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
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
          style={[
            styles.button,
            {
              backgroundColor: colors.buttonBackground,
            },
          ]}
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
    padding: 20,
  },
  instructionText: {
    fontSize: theme.fontSizes.body,
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    marginBottom: 15,
    width: '100%',
    borderRadius: 8,
    padding: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
});
