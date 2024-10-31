import { useMutation } from '@apollo/client';
import { CREATE_BOOKING } from '../graphql/mutations';

const useBooking = () => {
  const [mutate] = useMutation(CREATE_BOOKING);

  const createBooking = async (
    roomId: string,
    startDate: Date,
    endDate: Date
  ) => {
    try {
      const { data } = await mutate({
        variables: { roomId, startDate, endDate },
      });

      return data;
    } catch (error) {
      console.error('Booking creation failed:', error);
      throw error;
    }
  };

  return [createBooking];
};

export default useBooking;
