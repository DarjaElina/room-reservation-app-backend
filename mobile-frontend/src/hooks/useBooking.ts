import { useMutation } from '@apollo/client';
import { CREATE_BOOKING } from '@/src/graphql/mutations';

const useBooking = (): [
  (
    roomId: string,
    bookingTime: [number, number],
    title?: string
  ) => Promise<any>,
  { loading: boolean },
] => {
  const [mutate, { loading }] = useMutation(CREATE_BOOKING, {
    update: (cache, { data }) => {
      if (!data?.createBooking) return;

      cache.modify({
        fields: {
          bookings(existingBookings = []) {
            return [...existingBookings, data.createBooking];
          },
        },
      });
    },
  });

  const createBooking = async (
    roomId: string,
    bookingTime: [number, number],
    title?: string
  ) => {
    try {
      const { data } = await mutate({
        variables: { roomId, bookingTime, title },
      });
      return data;
    } catch (error) {
      console.log(error);
      //console.error('Booking creation failed:', error);
      throw error;
    }
  };

  return [createBooking, { loading }];
};

export default useBooking;
