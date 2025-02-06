import { render, screen } from '@testing-library/react-native';
import RoomView from '@/src/components/RoomView';
import { MockedProvider } from '@apollo/client/testing';
import useAuth from '@/src/hooks/useAuth';
import { RoomType } from '@/__generated__/graphql';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
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

jest.mock('expo-router', () => {
  return {
    Redirect: jest.fn(({ href }) => `Redirected to ${href}`),
  };
});

const mockRoom = {
  id: 'room1',
  code: '101',
  isFree: true,
  isBookable: true,
  description: 'A spacious conference room.',
  equipment: [
    { id: 'eq1', name: 'Projector' },
    { id: 'eq2', name: 'Whiteboard' },
  ],
  venue: { name: 'Main Venue' },
  size: 10,
  type: RoomType.Classroom
};

jest.mock('@/src/hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/src/i18n/i18n-react', () => {
  return {
    useI18nContext: () => ({
      LL: {
        RESERVE: () => 'Reserve',
        AVAILABLE: () => 'Available',
        SHOW_UPCOMING_RESERVATIONS: () => 'Show upcoming reservations',
        NO_UPCOMING_BOOKINGS: () => 'You have no upcoming bookings',
        CLOSE: () => 'Close',
        LOADING: () => 'Loading',
        ERROR: () => 'Error',
      },
    }),
  };
});

jest.mock('expo-font');

describe('RoomView Component', () => {
  it('should redirect to the sign-in page if there is no user', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: null,
      error: null,
      loading: false,
    }));

    render(
      <MockedProvider>
        <RoomView room={mockRoom} />
      </MockedProvider>
    );

    expect(require('expo-router').Redirect).toHaveBeenCalledWith(
      expect.objectContaining({ href: '/sign-in' }),
      expect.any(Object)
    );
  });

  it('should display available if the room is free', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: {
        __typename: 'User',
        username: 'username',
        id: '82feaaca-bd4e-4829-9c8c-efe73a24b805',
      },
      error: null,
      loading: false,
    }));
    render(
      <MockedProvider>
        <RoomView room={mockRoom} />
      </MockedProvider>
    );
    expect(await screen.findByText('Available')).toBeDefined();
  });

  it('should display occupied if the room is free', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: {
        __typename: 'User',
        username: 'username',
        id: '82feaaca-bd4e-4829-9c8c-efe73a24b805',
      },
      error: null,
      loading: false,
    }));
    const room = { ...mockRoom, isFree: false };
    render(
      <MockedProvider>
        <RoomView room={mockRoom} />
      </MockedProvider>
    );
    expect(await screen.findByText('Available')).toBeDefined();
  });

  it('should display the room description', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: {
        username: 'username',
        id: '82feaaca-bd4e-4829-9c8c-efe73a24b805',
      },
      error: null,
      loading: false,
    }));

    render(
      <MockedProvider>
        <RoomView room={mockRoom} />
      </MockedProvider>
    );

    expect(
      await screen.findByText('A spacious conference room.')
    ).toBeDefined();
  });

  it('should display room equipment', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: {
        username: 'username',
        id: '82feaaca-bd4e-4829-9c8c-efe73a24b805',
      },
      error: null,
      loading: false,
    }));

    render(
      <MockedProvider>
        <RoomView room={mockRoom} />
      </MockedProvider>
    );

    expect(await screen.findByText('Projector')).toBeDefined();
    expect(await screen.findByText('Whiteboard')).toBeDefined();
  });

  it('should display "Reserve" button', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: {
        username: 'username',
        id: '82feaaca-bd4e-4829-9c8c-efe73a24b805',
      },
      error: null,
      loading: false,
    }));

    render(
      <MockedProvider>
        <RoomView room={{ ...mockRoom }} />
      </MockedProvider>
    );

    expect(await screen.findByText('Reserve')).toBeDefined();
  });

  it('should display the venue name', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: {
        username: 'username',
        id: '82feaaca-bd4e-4829-9c8c-efe73a24b805',
      },
      error: null,
      loading: false,
    }));

    render(
      <MockedProvider>
        <RoomView room={mockRoom} />
      </MockedProvider>
    );

    expect(await screen.findByText('Main Venue')).toBeDefined();
  });

  it('should display loading state when data is loading', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: {
        username: 'username',
        id: '82feaaca-bd4e-4829-9c8c-efe73a24b805',
      },
      error: null,
      loading: true,
    }));

    render(
      <MockedProvider>
        <RoomView room={mockRoom} />
      </MockedProvider>
    );

    expect(await screen.findByTestId('loading-indicator')).toBeDefined();
  });

  it('should display an error message if there is an error', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      user: {
        username: 'username',
        id: '82feaaca-bd4e-4829-9c8c-efe73a24b805',
      },
      error: 'An error occurred',
      loading: false,
    }));

    render(
      <MockedProvider>
        <RoomView room={mockRoom} />
      </MockedProvider>
    );

    expect(await screen.findByTestId('error-text')).toBeDefined();
  });
});
