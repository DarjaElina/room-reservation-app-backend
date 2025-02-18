import EquipmentItem from '@/src/components/EquipmentItem';
import { render } from '@testing-library/react-native';
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

describe('EquipmentItem Component', () => {
  it('renders equipment name correctly', async () => {
    const { findByText } = render(<EquipmentItem name="violin" />);
    expect(await findByText('violin')).toBeDefined();
  });
});
