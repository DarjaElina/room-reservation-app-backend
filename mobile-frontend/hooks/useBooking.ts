import { useMutation } from '@apollo/client';
import { CREATE_BOOKING } from '../graphql/mutations';

const useBooking = (): [
  (roomId: string, startDate: number, endDate: number) => Promise<any>,
  { loading: boolean },
] => {
  const [mutate, { loading }] = useMutation(CREATE_BOOKING);

  const createBooking = async (
    roomId: string,
    startDate: number,
    endDate: number
  ) => {
    try {
      const { data } = await mutate({
        variables: { roomId, startDate, endDate },
      });

      return data;
    } catch (error) {
      //console.error('Booking creation failed:', error);
      throw error;
    }
  };

  return [createBooking, { loading }];
};

export default useBooking;
