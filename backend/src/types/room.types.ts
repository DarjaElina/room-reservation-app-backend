import { Venue } from "./venue.types";

export enum RoomType {
  PRACTICE_ROOM = "practice room",
  CONCERT_HALL = "concert hall",
  ADMINISTRATIVE_SPACE = "administrative space",
  CLASSROOM = "classroom",
  STUDIO = "studio",
  LIBRARY = "library",
  MEETING_ROOM = "meeting room",
  THEATER = "theater",
}


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