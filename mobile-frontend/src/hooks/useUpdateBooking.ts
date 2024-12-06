import { useMutation } from '@apollo/client';
import { UPDATE_BOOKING } from '@/src/graphql/mutations';

const useUpdateBooking = (): [
  (
    bookingId: string,
    startDate: number,
    endDate: number,
    roomId: string,
    title?: string
  ) => Promise<any>,
  { loading: boolean },
] => {
  const [mutate, { loading }] = useMutation(UPDATE_BOOKING, {
    update: (cache, { data }) => {
      if (!data?.updateBooking) return;

      const updatedBooking = data.updateBooking;
      console.log('updated booking:', updatedBooking);

      cache.modify({
        fields: {
          bookings(existingBookings = [], { readField }) {
            return existingBookings.map((booking) => {
              if (readField('id', booking) === updatedBooking.id) {
                console.log('we are going to update hehe');
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
    startDate: number,
    endDate: number,
    roomId: string,
    title?: string
  ) => {
    try {
      const { data } = await mutate({
        variables: { bookingId, startDate, endDate, title, roomId },
      });
      return data;
    } catch (error) {
      console.log(error);
      console.log('failed to update booking');
      throw error;
    }
  };

  return [updateBooking, { loading }];
};

export default useUpdateBooking;
