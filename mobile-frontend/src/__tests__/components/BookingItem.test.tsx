import BookingItem from '@/src/components/BookingItem';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

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

jest.mock('expo-router', () => {
  return {
    router: jest.fn(),
  };
});

jest.mock('@/src/i18n/i18n-react', () => {
  return {
    useI18nContext: () => ({
      LL: {},
    }),
  };
});

jest.mock('@/src/i18n/i18n-react', () => {
  return {
    useI18nContext: () => ({
      LL: {
        CANCEL: () => 'Cancel',
        MODIFY: () => 'Modify',
        CANCEL_BOOKING_TITLE: () => 'Cancel Booking',
        CANCEL_BOOKING_MESSAGE: () =>
          'Are you sure you want to cancel this booking?',
        CANCEL_BOOKING_NO: () => 'No',
        CANCEL_BOOKING_YES: () => 'Yes, Cancel',
      },
    }),
  };
});

jest.mock('expo-font');

describe('BookingItem Component', () => {
  it('renders initial booking details correctly', async () => {
    const { findByText } = render(
      <MockedProvider>
        <BookingItem
          startDate={new Date(new Date().setHours(9, 0, 0, 0))}
          endDate={new Date(new Date().setHours(10, 0, 0, 0))}
          roomCode="r-100"
          id="1"
          roomId="2"
        />
      </MockedProvider>
    );

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date());
    expect(await findByText('r-100')).toBeDefined();
    expect(
      await findByText(`${formattedDate}, 09:00 - ${formattedDate}, 10:00`)
    ).toBeDefined();
    //screen.debug();
  });

  it('renders cancel and modify buttons for future booking', async () => {
    const { findByText } = render(
      <MockedProvider>
        <BookingItem
          startDate={new Date(new Date().setHours(new Date().getHours() + 1))}
          endDate={new Date(new Date().setHours(new Date().getHours() + 2))}
          roomCode="r-100"
          id="1"
          roomId="2"
        />
      </MockedProvider>
    );

    expect(await findByText('Cancel')).toBeDefined();
    expect(await findByText('Modify')).toBeDefined();
  });

  it('does not render cancel and modify buttons for past booking', async () => {
    const { findByText } = render(
      <MockedProvider>
        <BookingItem
          startDate={new Date(new Date().setHours(new Date().getHours() - 1))}
          endDate={new Date(new Date().setHours(new Date().getHours()))}
          roomCode="r-100"
          id="1"
          roomId="2"
        />
      </MockedProvider>
    );

    await expect(findByText('Cancel')).rejects.toThrow();
    await expect(findByText('Modify')).rejects.toThrow();
  });

  it('shows the alert when Cancel button is pressed', async () => {
    const { getByText } = render(
      <MockedProvider>
        <BookingItem
          startDate={new Date(new Date().setHours(new Date().getHours() + 1))}
          endDate={new Date(new Date().setHours(new Date().getHours() + 2))}
          roomCode="r-100"
          id="1"
          roomId="2"
        />
      </MockedProvider>
    );

    const user = userEvent.setup();
    await user.press(getByText('Cancel'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      expect.any(Array),
      { cancelable: true }
    );
  });
});
