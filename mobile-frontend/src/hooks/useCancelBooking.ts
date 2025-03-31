import { useMutation } from '@apollo/client';
import { CANCEL_BOOKING } from '@/src/graphql/mutations';

const useCancelBooking = (): [
  (bookingId: string) => Promise<unknown>,
  { loading: boolean },
] => {
  const [mutate, { loading }] = useMutation(CANCEL_BOOKING, {
    update: (cache, { data }) => {
      if (!data?.cancelBooking) return;

      cache.modify({
        fields: {
          bookings(existingBookings, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const cancelBooking = async (bookingId: string) => {
    try {
      const { data } = await mutate({
        variables: { bookingId },
      });
      return data;
    } catch (error) {
      console.error('Booking cancellation failed:', error);
      throw error;
    }
  };

  return [cancelBooking, { loading }];
};

export default useCancelBooking;
