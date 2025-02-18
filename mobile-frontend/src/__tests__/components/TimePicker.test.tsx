import React from 'react';
import { render, userEvent } from '@testing-library/react-native';
import TimePicker from '@/src/components/TimePicker';
import { BookingProvider } from '@/src/context/BookingContext';
import { MockedProvider } from '@apollo/client/testing';
import { BOOKINGS } from '@/src/graphql/queries';
jest.useFakeTimers();

jest.mock('expo-router', () => {
  return {
    useLocalSearchParams: () => ({ id: '1' }),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    AsyncStorage: jest.fn(),
  };
});

jest.mock('@/src/i18n/i18n-react', () => {
  return {
    useI18nContext: () => ({
      LL: {
        CONFIRM: () => 'Confirm',
      },
    }),
  };
});
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

const mocks = [
  {
    request: {
      query: BOOKINGS,
      variables: {
        roomId: '1',
        startDate: new Date().setHours(6, 0, 0, 0),
        endDate: new Date().setHours(23, 0, 0, 0),
        status: 'ACTIVE',
      },
    },
    result: {
      data: {
        bookings: [
          {
            title: 'Reservation from Booking App',
            bookingTime: [
              { value: new Date().setHours(7, 0, 0, 0) },
              { value: new Date().setHours(8, 0, 0, 0) },
            ],
            id: '1',
            user: {
              familyName: 'Smith',
              givenName: 'Rose',
            },
            room: {
              code: 'r-100',
              id: '1',
            },
          },
        ],
      },
    },
  },
];

const mocksWithEmptyResponse = [
  {
    request: {
      query: BOOKINGS,
      variables: {
        roomId: '1',
        startDate: new Date().setHours(6, 0, 0, 0),
        endDate: new Date().setHours(23, 0, 0, 0),
        status: 'ACTIVE',
      },
    },
    result: {
      data: {
        bookings: [],
      },
    },
  },
];

describe('TimePicker Component', () => {
  it('renders TimePicker with correct initial state', async () => {
    const { findByText, findByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingProvider>
          <TimePicker />
        </BookingProvider>
      </MockedProvider>
    );

    expect(await findByText('Confirm')).toBeDefined();
    expect(await findByTestId('time-picker')).toBeDefined();
  });

  it('selects a time slot when clicked', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingProvider>
          <TimePicker />
        </BookingProvider>
      </MockedProvider>
    );

    const user = userEvent.setup();

    await user.press(getByText('08:00:00'));
    const selectedSlot = getByText('08:00');
    expect(selectedSlot).toBeDefined();
  });

  it('renders a booking title and name of user', async () => {
    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingProvider>
          <TimePicker />
        </BookingProvider>
      </MockedProvider>
    );

    expect(await findByText('Rose Smith')).toBeDefined();
    expect(await findByText('Reservation from Booking App')).toBeDefined();
  });

  it('does not render booked slots if booking array is empty', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocksWithEmptyResponse} addTypename={false}>
        <BookingProvider>
          <TimePicker />
        </BookingProvider>
      </MockedProvider>
    );

    expect(queryByText('Rose Smith')).toBeNull();
    expect(queryByText('Reservation from Booking App')).toBeNull();
  });

  it('does not allow to select a booked time slot', async () => {
    const { findByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingProvider>
          <TimePicker />
        </BookingProvider>
      </MockedProvider>
    );

    const user = userEvent.setup();

    await user.press(await findByText('Reservation from Booking App'));
    expect(queryByText('06:00')).toBeNull();
  });

  it('deselects a time slot when clicked again', async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingProvider>
          <TimePicker />
        </BookingProvider>
      </MockedProvider>
    );

    const user = userEvent.setup();
    const slot = getByText('08:00:00');

    await user.press(slot);
    expect(getByText('08:00')).toBeDefined();

    await user.press(slot);
    expect(queryByText('08:00')).toBeNull();
  });
});
