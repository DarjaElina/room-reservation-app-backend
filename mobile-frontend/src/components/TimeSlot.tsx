import { Pressable, Text } from 'react-native';
import { memo } from 'react';
import SelectedTimeSlot from './SelectedTimeSlot';
import BookedTimeSlot from './BookedTimeSlots';
import useBookingContext from '@/src/hooks/useBookingContext';

export interface TimeSlotType {
  hour: number;
  value: string;
}

interface TimeSlotProps {
  onSelect: (timeSlot: TimeSlotType) => void;
  timeSlot: TimeSlotType;
  index: number;
  booking?: { startDate: string; endDate: string } | undefined;
  bookingToModify?: { startDate: string; endDate: string } | undefined;
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
        backgroundColor: '#F6F5F5',
      }}
    >
      {index % 4 === 0 ? (
        <Text style={{ padding: 2 }}>{timeSlot.value}</Text>
      ) : null}
      {selectedTimeValues.find((i) => i.value === timeSlot.value) ? (
        <SelectedTimeSlot
          color="darkgreen"
          value={timeSlot.value.slice(0, 5)}
        />
      ) : null}
      <BookedTimeSlot booking={booking} />
    </Pressable>
  );
});

export default TimeSlot;
