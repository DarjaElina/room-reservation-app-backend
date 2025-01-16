import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import TimePicker from '@/src/components/TimePicker';
import { BookingProvider } from '@/src/context/BookingContext';
import { MockedProvider } from "@apollo/client/testing";

jest.mock('expo-router', () => {
  return {
    useLocalSearchParams: () => [{ id: '4fe3e3e1-8208-4ab2-9d68-8645547d4426'}],
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
       CONFIRM: () => 'Confirm'
      }
    })
  }
})

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

describe('TimePicker Component', () => {
 

  it('renders TimePicker with correct initial state', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider>
        <BookingProvider>
          <TimePicker />
        </BookingProvider>
      </MockedProvider>
    );
    
    expect(getByText('Confirm')).toBeDefined();
    expect(getByTestId('time-picker')).toBeDefined();
  });
});
