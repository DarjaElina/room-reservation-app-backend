import UserMessage from '@/src/components/UserMessage';
import { render } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
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

describe('UserMessage Component', () => {
  it('displays message correctly', async () => {
    const { findByText } = render(
      <UserMessage text={'I am a user message'} type={'success'} />
    );
    expect(await findByText('I am a user message')).toBeDefined();
  });

  it('applies success style when type is "success"', () => {
    const { getByText } = render(
      <UserMessage text="Success message" type="success" />
    );
    const getHostParent = (element: ReactTestInstance) => {
      let result = element.parent;
      while (typeof result?.type !== 'string') {
        result = result?.parent as ReactTestInstance;
      }

      return result;
    };
    const hostParent = getHostParent(getByText('Success message'));
    expect(hostParent).toHaveStyle({ borderColor: 'green' });
  });

  it('applies error style when type is "error"', () => {
    const { getByText } = render(
      <UserMessage text="Error message" type="error" />
    );
    const getHostParent = (element: ReactTestInstance) => {
      let result = element.parent;
      while (typeof result?.type !== 'string') {
        result = result?.parent as ReactTestInstance;
      }

      return result;
    };
    const hostParent = getHostParent(getByText('Error message'));
    expect(hostParent).toHaveStyle({ borderColor: 'red' });
  });
});
