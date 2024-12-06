import { useContext } from 'react';
import { BookingContext } from '@/src/context/BookingContext';

const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};

export default useBookingContext;
