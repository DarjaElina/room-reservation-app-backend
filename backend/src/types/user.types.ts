import { Booking } from './booking.types';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

export enum Responsibility {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  BOOKING_AGENT = 'BOOKING_AGENT',
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
  responsibility: Responsibility;
  bookings: Booking[];
}