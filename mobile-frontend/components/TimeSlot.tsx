import { Pressable, Text } from 'react-native';
import { memo } from 'react';
import SelectedTimeSlot from './SelectedTimeSlot';
import BookedTimeSlot from './BookedTimeSlots';
import useBookingContext from '../hooks/useBookingContext';
import theme from '../theme';

export interface TimeSlotType {
  hour: number;
  value: string;
}

interface TimeSlotProps {
  onSelect: (timeSlot: TimeSlotType) => void;
  timeSlot: TimeSlotType;
  index: number;
  booking?:
    | {
        __typename?: 'Booking';
        id: string;
        endDate: any;
        startDate: any;
        user: {
          __typename?: 'User';
          familyName: string;
          givenName: string;
        };
      }
    | undefined;
}

const TimeSlot = memo(function TimeSlotItem({
  timeSlot,
  onSelect,
  index,
  booking,
}: TimeSlotProps) {
  const { selectedTimeValues } = useBookingContext();

  return (
    <Pressable
      disabled={booking ? true : false}
      onPress={() => onSelect(timeSlot)}
      style={{
        height: 25,
        borderTopWidth: 1,
        borderColor: index !== 0 && index % 4 === 0 ? 'grey' : 'lightgrey',
        position: 'relative',
        backgroundColor: theme.colors.backgroundSecondary,
      }}
    >
      {index % 4 === 0 ? (
        <Text style={{ padding: 2 }}>{timeSlot.value}</Text>
      ) : null}
      {selectedTimeValues.find((i) => i.value === timeSlot.value) &&
      !booking ? (
        <SelectedTimeSlot
          color={theme.colors.success}
          value={timeSlot.value.slice(0, 5)}
        />
      ) : null}
      <BookedTimeSlot booking={booking} />
    </Pressable>
  );
});

export default TimeSlot;
