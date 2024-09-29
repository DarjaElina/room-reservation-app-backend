import { Room } from './room.types';
import { User } from './user.types';
import { Venue } from './venue.types';

export interface Booking {
  id: string;
  startDate: Date;
  endDate: Date;
  venue: Venue;
  room: Room;
  user: User;
}