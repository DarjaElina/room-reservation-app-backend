import { Room } from '../room/room.types';
import { User } from '../user/user.types';
import { Venue } from '../venue/venue.types';
import { BookingStatus } from './booking.enums';

export interface Booking {
  id: string;
  startDate: Date;
  endDate: Date;
  venue: Venue;
  room: Room;
  user: User;
  status: BookingStatus;
}
