import { FlatList, View, Text, Pressable } from 'react-native';
import theme from '../theme';
import { useBookingContext } from '../hooks/useBookingContext';
import { FAB } from 'react-native-paper';
import { Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import Separator from './Separator';
import SelectedTimeSlot from './SelectedTimeSlot';
import { timeArray } from '../constants/TimeArray';

interface TimeSlot {
  hour: number;
  value: string;
}

export default function TimePicker() {
  const {
    selectedTimeValues,
    setSelectedTimeValues,
    setBookingEndDate,
    setBookingStartDate,
    date,
  } = useBookingContext();

  const navigation = useNavigation();

  const { id } = useLocalSearchParams();

  const handleSelect = (item: TimeSlot) => {
    const hour = Number(item.value.slice(0, 2));

    const hourBlock = [
      { hour, value: `${hour < 10 ? '0' : ''}${hour}:00:00` },
      { hour, value: `${hour < 10 ? '0' : ''}${hour}:15:00` },
      { hour, value: `${hour < 10 ? '0' : ''}${hour}:30:00` },
      { hour, value: `${hour < 10 ? '0' : ''}${hour}:45:00` },
    ];
    const isHourSelected = hourBlock.every((block) =>
      selectedTimeValues.some((selected) => selected.hour === block.hour)
    );

    const isValueSelected = selectedTimeValues.some(
      (i) => i.value === item.value
    );

    if (isHourSelected && isValueSelected) {
      const curentSelected = selectedTimeValues.filter(
        (i) => i.value === item.value
      );
      if (
        selectedTimeValues.indexOf(curentSelected[0]) <=
        selectedTimeValues.length / 2
      ) {
        setSelectedTimeValues(
          selectedTimeValues
            .slice(selectedTimeValues.indexOf(curentSelected[0]) + 1)
            .sort((a, b) => a.hour - b.hour)
        );
      } else {
        setSelectedTimeValues(
          selectedTimeValues
            .slice(0, selectedTimeValues.indexOf(curentSelected[0]))
            .sort((a, b) => a.hour - b.hour)
        );
      }
    } else if (
      !isHourSelected &&
      (selectedTimeValues.length === 0 ||
        selectedTimeValues.filter((i) => i.hour === item.hour - 1).length ===
          4 ||
        selectedTimeValues.filter((i) => i.hour === item.hour + 1).length === 4)
    ) {
      setSelectedTimeValues(
        [...selectedTimeValues, ...hourBlock].sort((a, b) => a.hour - b.hour)
      );
    } else {
      setSelectedTimeValues([...hourBlock].sort((a, b) => a.hour - b.hour));
    }
  };

  const handleSubmit = () => {
    if (selectedTimeValues.length >= 1) {
      const sortedTimeArray = selectedTimeValues.sort();
      const startTime = sortedTimeArray[0].value;
      const endTime = sortedTimeArray[sortedTimeArray.length - 1].value;
      setBookingStartDate(`${date.toDateString()} ${startTime}`);
      setBookingEndDate(`${date.toDateString()} ${endTime}`);
      navigation.navigate('rooms/[id]/confirm-booking', { id });
    } else {
      Alert.alert('Empty booking', 'Please select booking time');
    }
  };

  return (
    <View>
      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={timeArray}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              style={{
                height: 25,
                borderTopWidth: 1,
                borderColor:
                  index !== 0 && index % 4 === 0
                    ? 'grey'
                    : theme.colors.textPrimary,
                position: 'relative',
              }}
            >
              {index % 4 === 0 ? (
                <Text style={{ padding: 2 }}>{item.value}</Text>
              ) : null}
              {selectedTimeValues.find((i) => i.value === item.value) ? (
                <SelectedTimeSlot value={item.value.slice(0, 5)} />
              ) : null}
            </Pressable>
          )}
        />
        <FAB
          style={{ position: 'absolute', right: 0, bottom: 150 }}
          label="Confirm"
          onPress={handleSubmit}
        />
        <Separator />
      </View>
    </View>
  );
}
