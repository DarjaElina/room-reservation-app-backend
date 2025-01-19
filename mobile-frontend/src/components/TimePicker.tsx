import { FlatList, View } from 'react-native';
import useBookingContext from '@/src/hooks/useBookingContext';
import { FAB } from 'react-native-paper';
import { Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Separator from './Separator';
import { timeArray } from '@/src/constants/TimeArray';
import TimeSlot from './TimeSlot';
import { TimeSlotType } from './TimeSlot';
import useBookings from '@/src/hooks/useBookings';
import { useRef, useEffect, useCallback } from 'react';
import { BookingStatus } from '@/__generated__/graphql';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { useI18nContext } from '../i18n/i18n-react';
import type { Locales } from '../i18n/i18n-types';
import { loadLocaleAsync } from '../i18n/i18n-util.async';
import { setUserLocale } from '@/src/utils/localeStorage';
import useStyles from '../hooks/useStyles';

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

  const { locale, LL, setLocale } = useI18nContext();

  const styles = useStyles();

  const onLocaleSelected = useCallback((locale: Locales) => {
    setUserLocale(locale)
      .then(async (locale) => {
        await loadLocaleAsync(locale);
        return locale;
      })
      .then(setLocale);
  }, []);

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
      Alert.alert(LL.EMPTY_BOOKINGS(), LL.SELECT_BOOKING_TIME());
    }
  };

  const mappedBookings = bookings
    .map((b) => {
      const startDate = b.bookingTime[0].value;
      const endDate = b.bookingTime[1].value;

      let startHours;
      let endHours;
      let startMinutes;
      let endMinutes;
      if (new Date(startDate).getHours() < 10) {
        startHours = `0${new Date(startDate).getHours()}`;
      } else {
        startHours = new Date(startDate).getHours();
      }
      if (new Date(endDate).getHours() < 10) {
        endHours = `0${new Date(endDate).getHours()}`;
      } else {
        endHours = new Date(endDate).getHours();
      }
      if (new Date(startDate).getMinutes() < 15) {
        startMinutes = `${new Date(startDate).getMinutes()}0`;
      } else {
        startMinutes = new Date(startDate).getMinutes();
      }
      if (new Date(endDate).getMinutes() < 15) {
        endMinutes = `${new Date(endDate).getMinutes()}0`;
      } else {
        endMinutes = new Date(endDate).getMinutes();
      }

      return {
        startDate: `${startHours}:${startMinutes}:00`,
        endDate: `${endHours}:${endMinutes}:00`,
        title: b.title,
        user: `${b.user.givenName} ${b.user.familyName}`,
      };
    })
    .filter((b) => {
      if (startTime && endTime)
        return !(b.startDate >= startTime && b.endDate <= endTime);
      else return b;
    });

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

        setSelectedTimeValues((prev) => {
          const newValues =
            currentIndex < prev.length / 2
              ? prev.slice(currentIndex + 1)
              : prev.slice(0, currentIndex);

          return newValues.filter(
            (i) =>
              !mappedBookings.some(
                (b) => b.startDate <= i.value && b.endDate > i.value
              )
          );
        });
      }
    } else if (
      !isHourSelected &&
      (selectedTimeValues.length === 0 ||
        selectedTimeValues.filter((i) => i.hour === item.hour - 1).length ===
          4 ||
        selectedTimeValues.filter((i) => i.hour === item.hour + 1).length === 4)
    ) {
      setSelectedTimeValues((prev) =>
        [...prev, ...hourBlock]
          .filter(
            (i) =>
              !mappedBookings.some(
                (b) => b.startDate <= i.value && b.endDate > i.value
              )
          )
          .sort((a, b) => a.hour - b.hour)
      );
    } else {
      setSelectedTimeValues(
        hourBlock.filter(
          (i) =>
            !mappedBookings.some(
              (b) => b.startDate <= i.value && b.endDate > i.value
            )
        )
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        testID="time-picker"
        ref={ref}
        keyExtractor={(item) => item.value}
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
        style={[styles.fab, { backgroundColor: colors.buttonBackground }]}
        label={LL.CONFIRM()}
        onPress={handleSubmit}
        color={colors.buttonText}
      />
      <Separator />
    </View>
  );
}
