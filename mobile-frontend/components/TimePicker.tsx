import { FlatList, View, Text } from 'react-native';
import { useBookingContext } from '../hooks/useBookingContext';
import { FAB } from 'react-native-paper';
import { Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import Separator from './Separator';
import { timeArray } from '../constants/TimeArray';
import { BOOKINGS_BY_ROOM_AND_DATE } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import TimeSlot from './TimeSlot';
import { TimeSlotType } from './TimeSlot';

export default function TimePicker() {
  const {
    selectedTimeValues,
    setSelectedTimeValues,
    setBookingEndDate,
    setBookingStartDate,
    date,
  } = useBookingContext();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, loading, error } = useQuery(BOOKINGS_BY_ROOM_AND_DATE, {
    variables: {
      roomId: id,
      startDate: new Date(date).setHours(6, 0, 0, 0),
      endDate: new Date(date).setHours(23, 0, 0, 0),
    },
    fetchPolicy: 'cache-and-network',
  });

  const navigation = useNavigation();

  const handleSelect = (item: TimeSlotType) => {
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
        selectedTimeValues.indexOf(curentSelected[0]) <
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
      const startTime = selectedTimeValues[0].value;
      const startDate = new Date(`${date.toDateString()} ${startTime}`);
      setBookingStartDate(
        new Date(`${date.toDateString()} ${startTime}`).toISOString()
      );
      setBookingEndDate(
        new Date(
          startDate.getTime() + selectedTimeValues.length * 15 * 60 * 1000
        ).toISOString()
      );
      navigation.navigate('rooms/[id]/confirm-booking', { id });
      setSelectedTimeValues([]);
    } else {
      Alert.alert('Empty booking', 'Please select booking time');
    }
  };

  const bookings = data?.bookingsByRoomAndDate
    ? data?.bookingsByRoomAndDate
    : [];

  const mappedBookings = bookings.map((b) => {
    let startHours;
    let endHours;
    let startMinutes;
    let endMinutes;
    if (new Date(b.startDate).getHours() < 10) {
      startHours = `0${new Date(b.startDate).getHours()}`;
    } else {
      startHours = new Date(b.startDate).getHours();
    }
    if (new Date(b.endDate).getHours() < 10) {
      endHours = `0${new Date(b.endDate).getHours()}`;
    } else {
      endHours = new Date(b.endDate).getHours();
    }
    if (new Date(b.startDate).getMinutes() < 15) {
      startMinutes = `${new Date(b.startDate).getMinutes()}0`;
    } else {
      startMinutes = new Date(b.startDate).getMinutes();
    }
    if (new Date(b.endDate).getMinutes() < 15) {
      endMinutes = `${new Date(b.endDate).getMinutes()}0`;
    } else {
      endMinutes = new Date(b.endDate).getMinutes();
    }

    return {
      startDate: `${startHours}:${startMinutes}:00`,
      endDate: `${endHours}:${endMinutes}:00`,
    };
  });

  console.log(mappedBookings);

  return (
    <View>
      <View>
        <FlatList
          keyExtractor={(item) => item.value}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={timeArray}
          extraData={selectedTimeValues}
          renderItem={({ item, index }) => (
            <TimeSlot
              index={index}
              timeSlot={item}
              onSelect={handleSelect}
              booking={mappedBookings.find(
                (b) => b.startDate <= item.value && b.endDate >= item.value
              )}
            />
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
