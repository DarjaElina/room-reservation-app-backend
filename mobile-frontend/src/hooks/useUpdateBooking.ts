import { useMutation } from '@apollo/client';
import { UPDATE_BOOKING } from '@/src/graphql/mutations';
import { Booking } from '@/__generated__/graphql';

const useUpdateBooking = (): [
  (
    bookingId: string,
    bookingTime: [number, number],
    roomId: string,
    title?: string
  ) => Promise<any>,
  { loading: boolean },
] => {
  const [mutate, { loading }] = useMutation(UPDATE_BOOKING, {
    update: (cache, { data }) => {
      if (!data?.updateBooking) return;

      const updatedBooking = data.updateBooking;

      cache.modify({
        fields: {
          bookings(existingBookings = [], { readField }) {
            return existingBookings.map((booking: Booking) => {
              if (readField('id', booking) === updatedBooking.id) {
                return { ...booking, ...updatedBooking };
              }
              return booking;
            });
          },
        },
      });
    },
  });

  const updateBooking = async (
    bookingId: string,
    bookingTime: [number, number],
    roomId: string,
    title?: string
  ) => {
    try {
      const { data } = await mutate({
        variables: { bookingId, bookingTime, title, roomId },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return [updateBooking, { loading }];
};

export default useUpdateBooking;
