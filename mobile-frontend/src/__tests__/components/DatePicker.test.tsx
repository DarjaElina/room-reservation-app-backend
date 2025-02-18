import DatePicker from '@/src/components/DatePicker';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import { BookingProvider } from '@/src/context/BookingContext';
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

jest.mock('expo-font');

describe('DatePicker Component', () => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const tomorrowDate = new Date(
    new Date().setDate(new Date().getDate() + 1)
  ).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  it('renders pressable with current date on initial render', async () => {
    const { findByText } = render(
      <BookingProvider>
        <DatePicker />
      </BookingProvider>
    );

    expect(await findByText(currentDate)).toBeDefined();
  });

  it('does not render the date picker modal on initial render', async () => {
    const { queryByTestId } = render(
      <BookingProvider>
        <DatePicker />
      </BookingProvider>
    );

    screen.debug();
    await waitFor(() =>
      expect(queryByTestId('date_time_picker_modal')).not.toBeVisible()
    );
  });

  it('renders the date picker modal after pressing the date', async () => {
    const { findByText, queryByTestId } = render(
      <BookingProvider>
        <DatePicker />
      </BookingProvider>
    );

    const user = userEvent.setup();
    const datePressable = await findByText(currentDate);
    await user.press(datePressable);
    await waitFor(() =>
      expect(queryByTestId('date_time_picker_modal')).toBeVisible()
    );
  });

  it('shows the next day when clicking right arrow', async () => {
    const { findByText, findByTestId } = render(
      <BookingProvider>
        <DatePicker />
      </BookingProvider>
    );

    const user = userEvent.setup();
    const rightArrowBtn = await findByTestId('next_day_button');
    await user.press(rightArrowBtn);
    expect(await findByText(tomorrowDate)).toBeDefined();
  });

  it('does not allow to click the prev-day button if previous day is in the past', async () => {
    const { findByTestId } = render(
      <BookingProvider>
        <DatePicker />
      </BookingProvider>
    );

    expect(await findByTestId('prev_day_button')).toBeDisabled();
  });

  it('allows to click the prev-day button if previous day is in the future', async () => {
    const { findByText, findByTestId } = render(
      <BookingProvider>
        <DatePicker />
      </BookingProvider>
    );

    const user = userEvent.setup();
    const rightArrowBtn = await findByTestId('next_day_button');
    const leftArrowBtn = await findByTestId('prev_day_button');
    await user.press(rightArrowBtn);
    await user.press(leftArrowBtn);
    expect(await findByText(currentDate)).toBeDefined();
  });
});
