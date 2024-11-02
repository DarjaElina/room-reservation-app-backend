import SelectedTimeSlot from './SelectedTimeSlot';

interface BookedTimeSlotProps {
  booking:
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

export default function BookedTimeSlot({ booking }: BookedTimeSlotProps) {
  if (!booking) {
    return null;
  }
  console.log(booking);
  return <SelectedTimeSlot color="darkred" />;
}
