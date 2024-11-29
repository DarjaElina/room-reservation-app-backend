import crypto from 'crypto';
import UserToken from '../models/user_token';
import { TokenType } from '../types/token/token.enums';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UserRole } from '../types/user/user.enums';
import { GraphQLError } from 'graphql';
import Booking from '../models/booking';
import { Op } from 'sequelize';
import User from '../models/user';
import { Request } from 'express';
import { JWT_SECRET } from '../util/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { BookingStatus } from '../types/booking/booking.enums';
import { startOfWeek, endOfWeek } from 'date-fns';
import Sequelize from 'sequelize';
import { BookingAttributes } from '../models/booking';
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

export const checkOverlappingBookings = async (
  roomId: string,
  startDate: Date,
  endDate: Date
) => {
  const hasOverlappingBooking = await Booking.findOne({
    where: {
      roomId,
      startDate: { [Op.lt]: endDate },
      endDate: { [Op.gt]: startDate },
      status: BookingStatus.Active
    },
  });
  if (hasOverlappingBooking) {
    throw new GraphQLError(
      'This room is already booked for the selected time range'
    );
  }
};

interface IJwtPayload extends JwtPayload {
  userId: string;
  isAdmin: boolean;
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
    } catch (error) {
      console.log('JWT verification error:', error);
      return { user: null, isAdmin: false };
    }
  }

  return { user, isAdmin };
};

interface BookingWithTotalHours extends BookingAttributes {
  totalHours: number;
}

export const getTotalBookedHoursForWeek = async (
  userId: string
): Promise<number> => {
  const now = new Date();
  const startOfWeekDate = startOfWeek(now);
  const endOfWeekDate = endOfWeek(now);
  const result = (await Booking.findOne({
    where: {
      userId,
      startDate: { [Op.between]: [startOfWeekDate, endOfWeekDate] },
      status: {
        [Op.or]: [BookingStatus.Past, BookingStatus.CancelledLate],
      },
    },
    attributes: [
      [
        Sequelize.fn(
          'SUM',
          Sequelize.literal(
            `(EXTRACT(EPOCH FROM end_date - start_date) / 3600)`
          )
        ),
        'totalHours',
      ],
    ],
  })) as BookingWithTotalHours | null;

  const totalHours = result?.totalHours || 0;
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
  roomId: string
): Promise<void> => {
  const room = await Room.findByPk(roomId);
  if (room?.department && user.department.id !== room.departmentId) {
    throw new GraphQLError(
      `This room can be booked only from students from ${room.department.name}`
    );
  }
};

export const validateBooking = async (
  user: User,
  roomId: string,
  startDate: Date,
  endDate: Date
) => {
  validateSingleBooking(user.role, startDate, endDate);
  await checkOverlappingBookings(roomId, startDate, endDate);

  const totalBookedHours = await getTotalBookedHoursForWeek(user.id);

  const newBookingHours =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

  checkBookingLimit(user.role, totalBookedHours, newBookingHours);
};
