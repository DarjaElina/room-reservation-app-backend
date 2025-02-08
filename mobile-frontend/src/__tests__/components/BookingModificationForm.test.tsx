import BookingModificationForm from '@/src/components/BookingModificationForm';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { renderRouter } from 'expo-router/testing-library';
import { View } from 'react-native';
import { UPDATE_BOOKING } from '@/src/graphql/mutations';
import { Alert } from 'react-native';
jest.spyOn(Alert, 'alert');
jest.useFakeTimers();

const mocks = [
  {
    request: {
      variables: {
        bookingId: '1',
        bookingTime: [1738990800000,1738994400000],
        roomId: '1',
        title: 'New Title',
      },
      query: UPDATE_BOOKING
    },
    result: {
      data: {
        updateBooking: {
          title: 'New Title',
          id: '1',
          bookingTime: [
            { value: 1738908000000, __typename:  'BookingTimeItem'},
            { value: 1738904400000, __typename:  'BookingTimeItem' },
          ],
          __typename: 'Booking',
        },
      },
    },
  },
];

const badMocks = [
  {
    request: {
      variables: {
        bookingId: '1',
        bookingTime: ['1738990800000','1738994400000'],
        roomId: '1',
        title: 'New Title',
      },
      query: UPDATE_BOOKING
    },
    result: {
      data: {
        updateBooking: {
          title: 'New Title',
          id: '1',
          bookingTime: [
            { value: 1738908000000, __typename:  'BookingTimeItem'},
            { value: 1738904400000, __typename:  'BookingTimeItem' },
          ],
          __typename: 'Booking',
        },
      },
    },
  },
];


const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => {
    return mockNavigation;
  },
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
}));

jest.mock('@/src/i18n/i18n-react', () => {
  return {
    useI18nContext: () => ({
      LL: {
        BOOKING_TITLE: () => 'Booking title',
        STARTS: () => 'Starts',
        ENDS: () => 'Ends',
        SAVE: () => 'Save',
        CANCEL: () => 'Cancel',
        BOOKING_UPDATED_SUCCESSFULLY: () => 'Booking updated successfully'
      },
    }),
  };
});

jest.mock('expo-font');



describe('BookingModificationForm Component', () => {
  const onCancel = jest.fn();
  const initialData = {
    title: 'Reservation from Booking App',
    roomId: '1',
    startDate: new Date(new Date ().setHours(7, 0, 0, 0)),
    endDate: new Date(new Date ().setHours(8, 0, 0, 0)),
    id: '1'
  }
  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  it('displays initial data correctly', async () => {
    const { findByText, findByPlaceholderText } = render(
      <MockedProvider>
        <BookingModificationForm onCancel={onCancel} initialData={initialData}/>
      </MockedProvider>
    )

    expect(await findByPlaceholderText('Booking title')).toBeDefined();
    expect(await findByText('Cancel')).toBeDefined();
    expect(await findByText('Save')).toBeDefined();
    expect(await findByText('Starts:')).toBeDefined();
    expect(await findByText('Ends:')).toBeDefined();
    expect(await findByText(formatDate(new Date(new Date ().setHours(7, 0, 0, 0))))).toBeDefined();
    expect (await findByText(formatDate(new Date(new Date ().setHours(8, 0, 0, 0))))).toBeDefined();
  });

  it('can update and save title', async () => {
    const { findByText, findByPlaceholderText, findByDisplayValue } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BookingModificationForm onCancel={onCancel} initialData={initialData}/>
      </MockedProvider>
    )

    const user = userEvent.setup();
    const titleInput = await findByPlaceholderText('Booking title');
    const saveBtn = await findByText('Save');
    await user.clear(titleInput);
    await user.type(titleInput, 'New Title');
    expect(await findByDisplayValue('New Title')).toBeDefined();
    await user.press(saveBtn);
    expect(await findByText('Booking updated successfully'));
  })

  test("redirects to date-time picker when user presses date input", async () => {
    const user = userEvent.setup();
    renderRouter(
      {
        index: jest.fn(() => <MockedProvider mocks={mocks} addTypename={false}><BookingModificationForm onCancel={onCancel} initialData={{...initialData, title: 'New Title'}}/></MockedProvider>),
        "(tabs)/(home)/rooms/[id]/modify-booking": jest.fn(() => <View />),
      },
      {
        initialUrl: "/",
      }
    );
  
    const dateInput = await screen.findByText(formatDate(new Date(new Date().setHours(7, 0, 0, 0))));
    await user.press(dateInput);
  
    expect(screen).toHavePathname("/rooms/1/modify-booking");
  });


  test("shows an error message if modification fails", async () => {
    const { findByText, findByPlaceholderText, findByDisplayValue } = render(
      <MockedProvider mocks={badMocks} addTypename={false}>
        <BookingModificationForm onCancel={onCancel} initialData={initialData}/>
      </MockedProvider>
    )

    const user = userEvent.setup();
    const titleInput = await findByPlaceholderText('Booking title');
    const saveBtn = await findByText('Save');
    await user.clear(titleInput);
    await user.type(titleInput, 'New Title');
    expect(await findByDisplayValue('New Title')).toBeDefined();
    await user.press(saveBtn);
    screen.debug()
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Something went wrong!'
    );
  });
});
