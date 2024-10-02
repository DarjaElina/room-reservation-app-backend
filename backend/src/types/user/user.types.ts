import { Booking } from '../booking/booking.types';
import { Role, Responsibility } from './user.enums';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: Role;
  responsibility: Responsibility;
  bookings: Booking[];
}