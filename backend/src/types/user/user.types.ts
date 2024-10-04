import { Booking } from '../booking/booking.types';
import { UserRole } from './user.enums';
import { UserStatus } from './user.enums';
import { Department } from '../department/department.types';

export interface User {
  id: string;
  givenName: string;
  familyName: string;
  middleName?: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  bookings: Booking[];
  department: Department;
}