import crypto from 'crypto';
import UserToken from '../models/user_token';
import { TokenType } from '../types/token/token.enums';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UserRole } from '../types/user/user.enums';
import { GraphQLError } from 'graphql';
import Booking from '../models/booking';
import { Transaction, Op } from 'sequelize';
import User from '../models/user';
import { Request } from 'express';
import { JWT_SECRET } from '../util/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { BookingStatus } from '../types/booking/booking.enums';
import { startOfWeek, endOfWeek } from 'date-fns';
import Room from '../models/room';
import { User as UserType } from '../graphql/generated-types';

export const generateUsername = (
  firstName: string,
  lastName: string,
  userNumber: number
): string => {
  const firstLetter = firstName.toLowerCase().slice(0, 1);
  const secondLetter = lastName.toLowerCase().slice(0, 1);
  return `${firstLetter}${secondLetter}${userNumber}`;
};

export const createToken = async (
  userId: string,
  type: TokenType,
  expiresAt: Date
) => {
  const token = crypto.randomBytes(32).toString('hex');

  await UserToken.create({
    token,
    userId,
    expiresAt,
    type,
  });

  return token;
};

export const createPasswordHash = (password: string) => {
  const salt = genSaltSync();
  const passwordHash = hashSync(password, salt);
  return passwordHash;
};

export const validateSingleBooking = (
  userRole: UserRole,
  startDate: Date,
  endDate: Date
) => {
  const now = new Date();
  if (startDate < now) {
    throw new GraphQLError('Cannot book a room in the past');
  }
  const total = endDate.getTime() - startDate.getTime();
  const totalHours = Math.floor(total / (1000 * 60 * 60));
  switch (userRole) {
    case UserRole.Student:
      if (totalHours > 3) {
        throw new GraphQLError('Single booking cannot exceed 3 hours');
      }
      break;
    case UserRole.Teacher:
      {
        if (totalHours > 8) {
          throw new GraphQLError('Single booking cannot exceed 8 hours');
        }
      }
      break;
    case UserRole.Admin:
    case UserRole.Manager:
      break;

    default:
      throw new GraphQLError('Invalid user role');
  }
};

export interface IJwtPayload extends JwtPayload {
  userId: string;
  isAdmin?: boolean;
}

export const getUserFromReq = async (
  req: Request
): Promise<{ user: User | null; isAdmin: boolean }> => {
  const auth = req?.headers.authorization ?? null;
  let user = null;
  let isAdmin = false;

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    if (!JWT_SECRET) {
      throw new Error('JWT secret is not defined');
    }
    try {
      const { userId } = jwt.verify(
        auth.substring(7),
        JWT_SECRET
      ) as IJwtPayload;
      user = await User.findByPk(userId);
      isAdmin = user?.role === UserRole.Admin;
    } catch {
      return { user: null, isAdmin: false };
    }
  }

  return { user, isAdmin };
};

export const getTotalBookedHoursForWeek = async (
  userId: string,
  transaction: Transaction
): Promise<number> => {
  const now = new Date();
  const startOfWeekDate = startOfWeek(now);
  const endOfWeekDate = endOfWeek(now);
  const bookings = await Booking.findAll({
    where: {
      userId,
      bookingTime: {
        [Op.overlap]: [startOfWeekDate, endOfWeekDate],
      },
      status: {
        [Op.or]: [
          BookingStatus.Past,
          BookingStatus.CancelledLate,
          BookingStatus.Active,
        ],
      },
    },
    attributes: ['bookingTime'],
    transaction,
  });
  const totalHours = bookings.reduce((acc, booking) => {
    const bookingHours = booking.bookingTime.reduce((bookingAcc, _, index) => {
      if (index < booking.bookingTime.length - 1) {
        const startTime = new Date(booking.bookingTime[index].value);
        const endTime = new Date(booking.bookingTime[index + 1].value);

        const durationInHours =
          (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        return bookingAcc + durationInHours;
      }
      return bookingAcc;
    }, 0);

    return acc + bookingHours;
  }, 0);

  return totalHours;
};

export const checkBookingLimit = (
  userRole: UserRole,
  totalBookedHours: number,
  newBookingHours: number
) => {
  const maxLimit = userRole === UserRole.Student ? 12 : 30;

  if (totalBookedHours + newBookingHours > maxLimit) {
    throw new GraphQLError(
      `You cannot make more bookings this week. Limit of ${maxLimit} hours exceeded.`
    );
  }
};

export const checkRoomDepartmentRestriction = async (
  user: UserType,
  roomId: string,
  transaction: Transaction
): Promise<void> => {
  const room = await Room.findByPk(roomId, { transaction });
  if (room?.department && user.department.id !== room.departmentId) {
    throw new GraphQLError(
      `This room can be booked only from students from ${room.department.name}`
    );
  }
};
