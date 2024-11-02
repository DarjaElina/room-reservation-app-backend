import { Venue } from '../venue/venue.types';
import { RoomType } from './room.enums';

export interface Room {
  id: string;
  venue: Venue;
  code: string;
  type: RoomType;
  size: number;
  equipment: string[];
  pictureUrl: string;
  isBookable: boolean;
}
