import BookingDetailsCard from '@/src/components/BookingDetailsCard';
import { render, userEvent, waitFor } from '@testing-library/react-native';
jest.useFakeTimers();
import { useState } from 'react';

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
      },
    }),
  };
});

jest.mock('@/src/i18n/i18n-react', () => {
  return {
    useI18nContext: () => ({
      LL: {
        BOOKING_DETAILS: () => 'Booking details',
        TITLE: () => 'Title',
        BOOKING_TITLE: () => 'Booking title',
        ROOM: () => 'Room',
        STARTS: () => 'Starts',
        ENDS: () => 'Ends',
      },
    }),
  };
});

jest.mock('expo-font');

describe('BookingDetailsCard Component', () => {
  it('renders initial booking details correctly', async () => {
    const { findByText, findByPlaceholderText } = render(
      <BookingDetailsCard
        bookingStartDate={new Date(
          new Date().setHours(7, 0, 0, 0)
        ).toISOString()}
        bookingEndDate={new Date(new Date().setHours(8, 0, 0, 0)).toISOString()}
        bookingTitle="My booking"
        setBookingTitle={() => 'Some title'}
        error={null}
        onSubmit={() => 'Submitted'}
        buttonText="Reserve"
        loading={false}
      />
    );
    expect(await findByText('Booking details')).toBeDefined();
    expect(await findByText('Title')).toBeDefined();
    expect(await findByPlaceholderText('Booking title')).toBeDefined();
    expect(await findByText('Room:')).toBeDefined();
    expect(await findByText('Starts:')).toBeDefined();
    expect(await findByText('Ends:')).toBeDefined();

    expect(await findByPlaceholderText('Booking title')).toHaveProp(
      'value',
      'My booking'
    );

    const formattedStartDate = new Date().setHours(7, 0, 0, 0);
    const formattedEndDate = new Date().setHours(8, 0, 0, 0);
    expect(
      await findByText(
        `Starts: ${new Date(formattedStartDate).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      )
    ).toBeDefined();
    expect(
      await findByText(
        `Ends: ${new Date(formattedEndDate).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      )
    ).toBeDefined();
  });

  it('renders an error message if error prop is passed', async () => {
    const errorText = 'This is a test error';
    const { findByText } = render(
      <BookingDetailsCard
        bookingStartDate={new Date(
          new Date().setHours(7, 0, 0, 0)
        ).toISOString()}
        bookingEndDate={new Date(new Date().setHours(8, 0, 0, 0)).toISOString()}
        bookingTitle="My booking"
        setBookingTitle={() => {}}
        error={errorText}
        onSubmit={() => {}}
        buttonText="Reserve"
        loading={false}
      />
    );
    expect(await findByText(errorText)).toBeDefined();
  });

  it('calls setBookingTitle with the final input value', async () => {
    const mockSetBookingTitle = jest.fn();

    const TestComponent = () => {
      const [bookingTitle, setBookingTitle] = useState('');
      return (
        <BookingDetailsCard
          bookingStartDate={new Date(
            new Date().setHours(7, 0, 0, 0)
          ).toISOString()}
          bookingEndDate={new Date(
            new Date().setHours(8, 0, 0, 0)
          ).toISOString()}
          bookingTitle={bookingTitle}
          setBookingTitle={(value) => {
            setBookingTitle(value);
            mockSetBookingTitle(value);
          }}
          error={null}
          onSubmit={() => {}}
          buttonText="Reserve"
          loading={false}
        />
      );
    };

    const { findByPlaceholderText } = render(<TestComponent />);

    const user = userEvent.setup();
    const input = await findByPlaceholderText('Booking title');

    await user.type(input, 'New Booking Title');

    expect(input).toHaveDisplayValue('New Booking Title');
    expect(mockSetBookingTitle).toHaveBeenCalledWith('New Booking Title');
  });

  it('renders the room code when provided', async () => {
    const { findByText } = render(
      <BookingDetailsCard
        bookingStartDate={new Date(
          new Date().setHours(7, 0, 0, 0)
        ).toISOString()}
        bookingEndDate={new Date(new Date().setHours(8, 0, 0, 0)).toISOString()}
        bookingTitle="My booking"
        setBookingTitle={() => {}}
        error={null}
        onSubmit={() => {}}
        buttonText="Reserve"
        loading={false}
        roomCode="1234"
      />
    );

    expect(await findByText('Room: 1234')).toBeDefined();
  });

  it('calls onSubmit when the reserve button is pressed', async () => {
    const mockOnSubmit = jest.fn();
    const { findByText } = render(
      <BookingDetailsCard
        bookingStartDate={new Date(
          new Date().setHours(7, 0, 0, 0)
        ).toISOString()}
        bookingEndDate={new Date(new Date().setHours(8, 0, 0, 0)).toISOString()}
        bookingTitle="My booking"
        setBookingTitle={() => {}}
        error={null}
        onSubmit={mockOnSubmit}
        buttonText="Reserve"
        loading={false}
        roomCode="1234"
      />
    );

    const user = userEvent.setup();

    await user.press(await findByText('Reserve'));

    expect(mockOnSubmit).toHaveBeenCalled();
  });
  it('matches the snapshot', async () => {
    const { toJSON } = render(
      <BookingDetailsCard
        bookingStartDate={new Date(
          new Date().setHours(7, 0, 0, 0)
        ).toISOString()}
        bookingEndDate={new Date(new Date().setHours(8, 0, 0, 0)).toISOString()}
        bookingTitle="My booking"
        setBookingTitle={() => {}}
        error={null}
        onSubmit={() => {}}
        buttonText="Reserve"
        loading={false}
        roomCode="1234"
      />
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
