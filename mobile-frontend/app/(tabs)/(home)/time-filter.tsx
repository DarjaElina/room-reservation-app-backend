import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import Button from '../../../components/Button';
import theme from '../../../theme';

export default function TimeFilter() {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      Alert.alert(
        'Searching for available classrooms',
        `From ${startDate.toLocaleString().slice(0, 16)} to ${endDate.toLocaleString().slice(0, 16)}`
      );
    } else {
      Alert.alert('Please select both start and end dates.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Select the time range to search for available classrooms.
      </Text>
      <TextInput
        label="Start Date"
        value={startDate ? startDate.toLocaleString().slice(0, 16) : ''}
        onFocus={showStartDatePicker}
        style={styles.textInput}
      />
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
        minimumDate={new Date()}
      />
      <TextInput
        label="End Date"
        value={endDate ? endDate.toLocaleString().slice(0, 16) : ''}
        onFocus={showEndDatePicker}
        style={styles.textInput}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="datetime"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
        minimumDate={startDate || new Date()}
      />
      <Button
        label="Search Classrooms"
        onSubmit={handleSearch}
        style={styles.button}
        textStyle={styles.buttonText}
      />
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
  buttonText: {
    color: '#d9a3ff',
    fontWeight: '600',
  },
});
