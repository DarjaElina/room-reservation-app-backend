import CheckBoxItem from '@/src/components/CheckBoxItem';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
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

describe('CheckBoxItem Component', () => {
  const setUpdatedCheckedValues = jest.fn();
  const onChange = jest.fn();
  it('renders the item label', async () => {
    const { findByText } = render(
      <CheckBoxItem
        item={{ value: 'ice cream', label: 'Ice cream' }}
        isActive={true}
        updatedCheckedValues={['ice cream', 'cheesecake', 'tiramisu']}
        setUpdatedCheckedValues={setUpdatedCheckedValues}
        onChange={onChange}
      />
    );
    expect(await findByText('Ice cream')).toBeDefined();
    screen.debug();
  });
  it('calls setUpdatedCheckedValues when pressed', async () => {
    const { findByText } = render(
      <CheckBoxItem
        item={{ value: 'ice cream', label: 'Ice cream' }}
        isActive={true}
        updatedCheckedValues={['ice cream', 'cheesecake', 'tiramisu']}
        setUpdatedCheckedValues={setUpdatedCheckedValues}
        onChange={onChange}
      />
    );
    const user = userEvent.setup();
    const item = await findByText('Ice cream');
    await user.press(item);
    waitFor(() => expect(setUpdatedCheckedValues).toHaveBeenCalled());
  });
  it('calls onChange when pressed', async () => {
    const { findByText } = render(
      <CheckBoxItem
        item={{ value: 'ice cream', label: 'Ice cream' }}
        isActive={true}
        updatedCheckedValues={['ice cream', 'cheesecake', 'tiramisu']}
        setUpdatedCheckedValues={setUpdatedCheckedValues}
        onChange={onChange}
      />
    );
    const user = userEvent.setup();
    const item = await findByText('Ice cream');
    await user.press(item);
    waitFor(() => expect(onChange).toHaveBeenCalled());
  });
  it('activates the checkbox when pressed', async () => {
    const { findByText } = render(
      <CheckBoxItem
        item={{ value: 'ice cream', label: 'Ice cream' }}
        isActive={false}
        updatedCheckedValues={[]}
        setUpdatedCheckedValues={setUpdatedCheckedValues}
        onChange={onChange}
      />
    );

    const user = userEvent.setup();
    const item = await findByText('Ice cream');
    await user.press(item);

    await waitFor(() =>
      expect(setUpdatedCheckedValues).toHaveBeenCalledWith(['ice cream'])
    );
  });

  it('deactivates the checkbox when pressed', async () => {
    const { findByText } = render(
      <CheckBoxItem
        item={{ value: 'ice cream', label: 'Ice cream' }}
        isActive={true}
        updatedCheckedValues={['ice cream']}
        setUpdatedCheckedValues={setUpdatedCheckedValues}
        onChange={onChange}
      />
    );

    const user = userEvent.setup();
    const item = await findByText('Ice cream');
    await user.press(item);

    await waitFor(() =>
      expect(setUpdatedCheckedValues).toHaveBeenCalledWith([])
    );
  });
});
