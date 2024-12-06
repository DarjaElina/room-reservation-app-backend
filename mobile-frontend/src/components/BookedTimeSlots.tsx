import SelectedTimeSlot from './SelectedTimeSlot';

interface BookedTimeSlotProps {
  booking: { startDate: string; endDate: string } | undefined;
}

export default function BookedTimeSlot({ booking }: BookedTimeSlotProps) {
  if (!booking) {
    return null;
  }
  return <SelectedTimeSlot color="darkred" />;
}
