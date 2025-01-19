import SelectedTimeSlot from './SelectedTimeSlot';

interface BookedTimeSlotProps {
  booking:
    | {
        startDate: string;
        endDate: string;
        title: string | null | undefined;
        user: string;
      }
    | undefined;
  displayBookingTitle: boolean;
  displayBookingUser: boolean;
}

export default function BookedTimeSlot({
  booking,
  displayBookingTitle,
  displayBookingUser,
}: BookedTimeSlotProps) {
  if (!booking) {
    return null;
  }
  return (
    <SelectedTimeSlot
      displayBookingTitle={displayBookingTitle}
      displayBookingUser={displayBookingUser}
      color="darkred"
      bookingInfo={{ title: booking.title, user: booking.user }}
    />
  );
}
