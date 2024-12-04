import { FlatList, View, StyleSheet } from 'react-native';
import useBookingContext from '../hooks/useBookingContext';
import { FAB } from 'react-native-paper';
import { Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router';
import Separator from './Separator';
import { timeArray } from '../constants/TimeArray';
import TimeSlot from './TimeSlot';
import { TimeSlotType } from './TimeSlot';
import theme from '@/theme';
import useBookings from '@/hooks/useBookings';
import { useRef, useEffect } from 'react';
import { BookingStatus } from '@/__generated__/graphql';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

interface TimePickerProps {
  startTime?: string;
  endTime?: string;
  modificationMode?: boolean;
  bookingId?: string;
}

export default function TimePicker({
  startTime,
  endTime,
  modificationMode,
  bookingId,
}: TimePickerProps) {
  const {
    selectedTimeValues,
    setSelectedTimeValues,
    setBookingEndDate,
    setBookingStartDate,
    date,
  } = useBookingContext();

  const { colors } = useTheme();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { bookings, loading, error } = useBookings({
    roomId: id,
    startDate: new Date(date).setHours(6, 0, 0, 0),
    endDate: new Date(date).setHours(23, 0, 0, 0),
    status: BookingStatus.Active,
  });

  useEffect(() => {
    if (startTime && endTime) {
      setSelectedTimeValues((prevValues) =>
        prevValues.concat(
          timeArray.filter((i) => i.value >= startTime && i.value < endTime)
        )
      );
    }
  }, [startTime, endTime]);

  const ref = useRef<FlatList>(null);

  useEffect(() => {
    if (startTime) {
      ref.current?.scrollToItem({
        item: timeArray.find((i) => i.value === startTime),
        animated: true,
      });
    }
  }, [startTime]);

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
      if (modificationMode) {
        router.replace({
          pathname: `/(tabs)/(home)/rooms/[id]/confirm-booking-modification`,
          params: {
            id,
            bookingId,
          },
        });
      } else
        router.replace({
          pathname: `/(tabs)/(home)/rooms/[id]/confirm-booking-creation`,
          params: {
            id,
          },
        });
      setSelectedTimeValues([]);
    } else {
      Alert.alert('Empty booking', 'Please select booking time');
    }
  };

  const mappedBookings = bookings
    .map((b) => {
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
    })
    .filter(
      (b) =>
        startTime &&
        endTime &&
        !(b.startDate >= startTime && b.endDate <= endTime)
    );

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
      const currentSelected = selectedTimeValues.find(
        (i) => i.value === item.value
      );
      if (currentSelected) {
        const currentIndex = selectedTimeValues.indexOf(currentSelected);

        setSelectedTimeValues(
          currentIndex < selectedTimeValues.length / 2
            ? selectedTimeValues
                .slice(currentIndex + 1)
                .filter(
                  (i) => !mappedBookings.some((b) => b.startDate === i.value)
                )
            : selectedTimeValues
                .slice(0, currentIndex)
                .filter(
                  (i) =>
                    !mappedBookings.some(
                      (b) => b.startDate <= i.value && b.endDate >= i.value
                    )
                )
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
        [...selectedTimeValues, ...hourBlock].filter(
          (i) =>
            !mappedBookings.some(
              (b) => b.startDate <= i.value && b.endDate >= i.value
            )
        )
      );
    } else {
      setSelectedTimeValues(
        hourBlock.filter(
          (i) =>
            !mappedBookings.some(
              (b) => b.startDate <= i.value && b.endDate >= i.value
            )
        )
      );
    }
  };

  return (
    <View>
      <View>
        <FlatList
          ref={ref}
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
                (b) =>
                  b.startDate <= item.value &&
                  b.endDate > item.value &&
                  b.startDate !== startTime
              )}
            />
          )}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              ref.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />
        <FAB
          style={[
            styles.floatingButton,
            { backgroundColor: colors.buttonBackground },
          ]}
          label="Confirm"
          onPress={handleSubmit}
          color={colors.buttonText}
        />
        <Separator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 0,
    bottom: 150,
  },
});
