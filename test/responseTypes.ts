import { RoomConnection, Room } from '../src/graphql/generated-types';
import Booking from '../src/models/booking';

interface ApolloError {
  message: string;
  extensions?: {
    code: string;
  };
}

export interface ApolloResponse<T> {
  data?: T;
  errors?: ApolloError[];
}

export type BookingResponse = ApolloResponse<{
  createBooking?: {
    booking: Booking;
  };
}>;

export type AllRoomsResponse = ApolloResponse<{
  rooms: RoomConnection;
}>;

export type FindRoomResponse = ApolloResponse<{
  findRoom: Room;
}>;

export type ToggleRoomResponse = ApolloResponse<{
  toggleFavorite: {
    success: boolean;
    message: string;
    isFavoriteNow: boolean;
    id: string;
  };
}>;

export type RefreshTokenResponse = ApolloResponse<{
  refreshToken?: {
    accessToken: string;
  };
}>;
