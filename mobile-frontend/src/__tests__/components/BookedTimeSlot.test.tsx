import BookedTimeSlot from '@/src/components/BookedTimeSlot';
import { render } from '@testing-library/react-native';
import React from 'react';
jest.mock('@react-navigation/native', () => {
  return {
    useTheme: () => ({
      dark: false,
      colors: {
        primary: 'blue',
        background: 'white',
        card: 'gray',
        text: 'black',
        border: 'green',
        error: 'red',
        success: 'green',
      },
    }),
  };
});

describe('BookedTimeSlot Component', () => {
  const booking = {
    title: 'Booking Title',
    user: 'Anna Smith',
    startDate: '01.03.2025, 15:00',
    endDate: '01.03.2025, 16:00',
  };
  it('does not render anything if the booking prop is null', async () => {
    const { queryByTestId } = render(
      <BookedTimeSlot
        booking={null}
        displayBookingTitle={false}
        displayBookingUser={false}
      />
    );
    expect(queryByTestId('selected_time_slot')).toBeNull();
  });
  it('renders SelectedTimeSlot when booking prop is passed', async () => {
    const { findByTestId } = render(
      <BookedTimeSlot
        booking={booking}
        displayBookingTitle={false}
        displayBookingUser={false}
      />
    );
    expect(findByTestId('selected_time_slot')).toBeDefined();
  });
});
