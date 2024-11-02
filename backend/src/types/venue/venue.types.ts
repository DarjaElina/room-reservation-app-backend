import { Room } from '../room/room.types';

export interface Venue {
  id: string;
  code: string;
  name: string;
  rooms: Room[];
}
