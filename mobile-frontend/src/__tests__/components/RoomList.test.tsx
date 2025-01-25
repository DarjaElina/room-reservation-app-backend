import { screen, render, userEvent } from '@testing-library/react-native';
import RoomListContainer from '@/src/components/RoomList/RoomListContainer';
import { Room } from '@/__generated__/graphql';
import { ReactNode } from 'react';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => {
    return mockNavigation;
  },
}));

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
        AVAILABLE: () => 'Avaliable',
        OCCUPIED: () => 'Occupied',
      },
    }),
  };
});

jest.mock('expo-font');

describe('RoomList', () => {
  describe('RoomListContainer', () => {
    it('renders room information correctly', async () => {
      const rooms = [
        {
          __typename: 'Room',
          code: 'rach-100',
          id: 'e19c44a6-75de-4b79-a55f-63473b9ae251',
          isFree: true,
          pictureUrl: 'https://example.com/room-rach-100.jpg',
          size: 50,
          description: 'A large room suitable for meetings and events.',
          equipment: [
            { __typename: 'Equipment', name: 'Projector', id: 'eq-1' },
            { __typename: 'Equipment', name: 'Whiteboard', id: 'eq-2' },
          ],
          venue: {
            __typename: 'Venue',
            name: 'Sergei Rachmaninoff Building',
          },
        },
        {
          __typename: 'Room',
          code: 'rach-101',
          id: '56d89aaf-c3bb-4f41-b4e2-75f2ea6d108b',
          isFree: false,
          pictureUrl: 'https://example.com/room-rach-101.jpg',
          size: 40,
          description: 'A medium-sized room for workshops.',
          equipment: [
            { __typename: 'Equipment', name: 'Speakers', id: 'eq-3' },
          ],
          venue: {
            __typename: 'Venue',
            name: 'Sergei Rachmaninoff Building',
          },
        },
        {
          __typename: 'Room',
          code: 'rach-102',
          id: '21d379f4-05bb-4cdd-9536-7a2ebc93c007',
          isFree: true,
          pictureUrl: 'https://example.com/room-rach-102.jpg',
          size: 60,
          description: 'A spacious room for conferences.',
          equipment: [
            { __typename: 'Equipment', name: 'Microphone', id: 'eq-4' },
            { __typename: 'Equipment', name: 'Stage Lighting', id: 'eq-5' },
          ],
          venue: {
            __typename: 'Venue',
            name: 'Sergei Rachmaninoff Building',
          },
        },
        {
          __typename: 'Room',
          code: 'tane-130',
          id: 'f8101c57-64d1-4a7e-93e2-e20762d14e90',
          isFree: false,
          pictureUrl: 'https://example.com/room-tane-130.jpg',
          size: 35,
          description: 'A cozy room for music rehearsals.',
          equipment: [{ __typename: 'Equipment', name: 'Piano', id: 'eq-6' }],
          venue: {
            __typename: 'Venue',
            name: 'Sergei Taneyev Building',
          },
        },
        {
          __typename: 'Room',
          code: 'tane-131',
          id: '5e67dcca-5aa6-453b-aeed-3680bc8e706d',
          isFree: true,
          pictureUrl: 'https://example.com/room-tane-131.jpg',
          size: 25,
          description: 'A small room ideal for private lessons.',
          equipment: [
            { __typename: 'Equipment', name: 'Music Stand', id: 'eq-7' },
          ],
          venue: {
            __typename: 'Venue',
            name: 'Sergei Taneyev Building',
          },
        },
        {
          __typename: 'Room',
          code: 'tcha-200',
          id: '8c6c7a45-f676-4b0b-95b8-2fa3c702b0ad',
          isFree: true,
          pictureUrl: 'https://example.com/room-tcha-200.jpg',
          size: 70,
          description: 'A grand room perfect for orchestral rehearsals.',
          equipment: [
            { __typename: 'Equipment', name: 'Conductor’s Podium', id: 'eq-8' },
            { __typename: 'Equipment', name: 'Chair Set', id: 'eq-9' },
          ],
          venue: {
            __typename: 'Venue',
            name: 'Pyotr Tchaikovsky Hall',
          },
        },
        {
          __typename: 'Room',
          code: 'tcha-201',
          id: 'de91fecd-5ab8-4352-845e-e7596893ad71',
          isFree: false,
          pictureUrl: 'https://example.com/room-tcha-201.jpg',
          size: 80,
          description: 'A state-of-the-art room for recording sessions.',
          equipment: [
            { __typename: 'Equipment', name: 'Recording Console', id: 'eq-10' },
            {
              __typename: 'Equipment',
              name: 'Soundproofing Panels',
              id: 'eq-11',
            },
          ],
          venue: {
            __typename: 'Venue',
            name: 'Pyotr Tchaikovsky Hall',
          },
        },
      ] as Room[];

      const { getAllByTestId, findAllByText } = render(
        <RoomListContainer
          onEndReach={(info: { distanceFromEnd: number }) =>
            console.log('reached')
          }
          rooms={rooms}
        />
      );

      const roomItems = getAllByTestId('room-item');
      expect(roomItems).toHaveLength(rooms.length);

      rooms.forEach((room) => {
        const roomCode = screen.getByText(room.code);
        expect(roomCode).toBeDefined();
      });

      const rachmaninoffRooms = await findAllByText(
        'Sergei Rachmaninoff Building'
      );
      expect(rachmaninoffRooms).toHaveLength(3);
    });
  });
});
