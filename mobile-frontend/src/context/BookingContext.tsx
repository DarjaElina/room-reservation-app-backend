import React, { createContext, useContext, useState } from 'react';

interface TimeSlot {
  value: string;
  hour: number;
  isBooked?: boolean;
}

interface BookingContextType {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedTimeValues: TimeSlot[];
  setSelectedTimeValues: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
  bookingStartDate: string;
  bookingEndDate: string;
  setBookingStartDate: React.Dispatch<React.SetStateAction<string>>;
  setBookingEndDate: React.Dispatch<React.SetStateAction<string>>;
}

interface Props {
  children: React.ReactNode;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: Props) => {
  const [selectedTimeValues, setSelectedTimeValues] = useState<TimeSlot[]>([]);
  const [date, setDate] = useState(new Date());
  const [bookingStartDate, setBookingStartDate] = useState('');
  const [bookingEndDate, setBookingEndDate] = useState('');

  return (
    <BookingContext.Provider
      value={{
        date,
        setDate,
        selectedTimeValues,
        setSelectedTimeValues,
        setBookingStartDate,
        setBookingEndDate,
        bookingStartDate,
        bookingEndDate,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
