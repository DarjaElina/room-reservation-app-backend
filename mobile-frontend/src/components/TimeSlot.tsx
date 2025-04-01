import { Pressable, Text } from 'react-native';
import { memo } from 'react';
import SelectedTimeSlot from './SelectedTimeSlot';
import BookedTimeSlot from './BookedTimeSlot';
import useBookingContext from '@/src/hooks/useBookingContext';
import useStyles from '../hooks/useStyles';
import { useTheme } from '@react-navigation/native';

export interface TimeSlotType {
  hour: number;
  value: string;
}

interface TimeSlotProps {
  onSelect: (timeSlot: TimeSlotType) => void;
  timeSlot: TimeSlotType;
  index: number;
  booking: {
    startDate: string;
    endDate: string;
    title: string | null | undefined;
    user: string;
  } | null;
  bookingToModify?: { startDate: string; endDate: string } | undefined;
}

const TimeSlot = memo(function TimeSlotItem({
  timeSlot,
  onSelect,
  index,
  booking,
}: TimeSlotProps) {
  const { selectedTimeValues } = useBookingContext();
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <Pressable
      testID="time_slot_btn"
      disabled={booking ? true : false}
      onPress={() => onSelect(timeSlot)}
      style={[
        styles.timeSlot,
        { borderColor: index !== 0 && index % 4 === 0 ? 'gray' : 'lightgray' },
      ]}
    >
      {index % 4 === 0 ? (
        <Text style={{ padding: 2 }}>{timeSlot.value}</Text>
      ) : null}
      {selectedTimeValues.find((i) => i.value === timeSlot.value) ? (
        <SelectedTimeSlot
          color={colors.success}
          value={timeSlot.value.slice(0, 5)}
        />
      ) : null}
      <BookedTimeSlot
        booking={booking}
        displayBookingTitle={index % 4 === 0}
        displayBookingUser={index % 4 === 1}
      />
    </Pressable>
  );
});

export default TimeSlot;
