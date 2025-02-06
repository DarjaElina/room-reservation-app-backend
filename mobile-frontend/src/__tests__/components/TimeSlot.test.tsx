import TimeSlot from "@/src/components/TimeSlot";
import { render, screen, userEvent } from "@testing-library/react-native";
import { BookingProvider } from '@/src/context/BookingContext';
import useBookingContext from '@/src/hooks/useBookingContext'; 

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
        success: 'green'
      },
    }),
  };
});
jest.mock('@/src/hooks/useBookingContext');

describe('UserMessage Component', () => {
  const booking = {
    startDate: '2025-02-05T10:00:00Z',
    endDate: '2025-02-05T11:00:00Z',
    title: 'Reservation from Booking App',
    user: 'Anna Smith',
  };

  (useBookingContext as jest.Mock).mockReturnValue({
    selectedTimeValues: [{ hour: 10, value: '10:00:00' }],
  });

  it('should disable the pressable when there is a booking', async () => {
    const { getByTestId } = render(
      <BookingProvider>
        <TimeSlot
          onSelect={() => console.log('selected')}
          index={1}
          timeSlot={{ hour: 10, value: '10:00:00' }}
          booking={booking}
        />
      </BookingProvider>
    );

    const button = getByTestId('time_slot_btn');
    expect(button).toHaveProp('accessibilityState', { disabled: true });
    screen.debug();
  });

  it('should not disable the pressable when there is no booking', async () => {
    const { getByTestId } = render(
      <BookingProvider>
        <TimeSlot
          onSelect={() => console.log('selected')}
          index={1}
          timeSlot={{ hour: 10, value: '10:00:00' }}
        />
      </BookingProvider>
    );

    const button = getByTestId('time_slot_btn');
    expect(button).toHaveProp('accessibilityState', { disabled: false });
    screen.debug();
  });

  it('renders name of user created the booking for the second slot out of four', async () => {
    const { findByText } = render(
      <BookingProvider>
        <TimeSlot
          onSelect={() => console.log('selected')}
          index={1}
          timeSlot={{ hour: 10, value: '10:00:00' }}
          booking={booking}
        />
      </BookingProvider>
    );

    expect(await findByText('Anna Smith')).toBeDefined();
    screen.debug();
  });


  it('renders booking title for the first slot out of four', async () => {
    const { findByText } = render(
      <BookingProvider>
        <TimeSlot
          onSelect={() => console.log('selected')}
          index={0}
          timeSlot={{ hour: 10, value: '10:00:00' }}
          booking={booking}
        />
      </BookingProvider>
    );

    expect(await findByText('Reservation from Booking App')).toBeDefined();
    screen.debug();
  });

  it('calls onSelect when clicked if not booked', async () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <BookingProvider>
        <TimeSlot
          onSelect={onSelect}
          index={1}
          timeSlot={{ hour: 10, value: '10:00:00' }}
        />
      </BookingProvider>
    );

    const user = userEvent.setup();
    
    await user.press(getByTestId('time_slot_btn'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('renders SelectedTimeSlot if time is selected', async () => {
    const { findByText } = render(
      <TimeSlot
        onSelect={jest.fn()}
        index={1}
        timeSlot={{ hour: 10, value: '10:00:00' }}
      />
    );

    expect(await findByText('10:00')).toBeDefined();
  });
});