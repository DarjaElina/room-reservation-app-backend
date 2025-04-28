import request from 'supertest';
import { createApp } from '../../src/app';
import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import { Express } from 'express';
import { seedTestDB } from '../seed';
import { rollbackMigration } from '../../src/util/db';
import { sequelize } from '../../src/util/db';
import { CREATE_BOOKING } from './mutations';
import Room from '../../src/models/room';
import { getNextBookingTimeRange, getBookingTimeForDb } from './helpers';
import { getTestAuthTokens } from '../getTestAuthTokens';
import { BookingResponse } from '../responseTypes';
import Booking from '../../src/models/booking';
import User from '../../src/models/user';
import {
  beforeAll,
  it,
  describe,
  beforeEach,
  afterAll,
  expect,
} from '@jest/globals';
import { BookingStatus } from '../../src/types/booking/booking.enums';
let app: Express;

let token: string | undefined;
let room: Room;
let user: User;


beforeAll(async () => {
  await connectTestDB();
  const server = await createApp();
  app = server.app;
});

beforeEach(async () => {
  await clearTestDB();
  await sequelize.query(
    'ALTER SEQUENCE users_user_number_seq RESTART WITH 10000'
  );
  const { room: createdRoom, user: createdUser } = await seedTestDB();
  room = createdRoom;
  user = createdUser;



  const {testAccessToken} = await getTestAuthTokens(app);

  token = testAccessToken;
});

afterAll(async () => {
  await clearTestDB();
  await rollbackMigration();
  const models = sequelize.models;
    for (const model of Object.values(models)) {
      if (model.name == 'SequelizeMeta') {
        try {
          await model.destroy({ where: {}, force: true });
        } catch {
          console.log('ooops');
        }
      }
    }
  await closeTestDB();
});

describe('Booking API', () => {
  it('should create a booking when valid auth token is provided', async () => {
    const bookingTime = getNextBookingTimeRange();

    const variables = {
      bookingTime,
      title: 'Test booking',
      roomId: room.id,
    };

    const bookingResponse = await request(app)
      .post('/')
      .send({
        query: CREATE_BOOKING,
        variables,
      })
      .set({ Authorization: `Bearer ${token}` });

    const body = bookingResponse.body as BookingResponse;

    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('createBooking');
    expect(body.data?.createBooking).toHaveProperty('title');
    expect(body.data?.createBooking).toHaveProperty('bookingTime');
    expect(body.data?.createBooking).toHaveProperty('user');
    expect(body.data?.createBooking).toHaveProperty('room');
  });
  it('should return an error if no token is provided', async () => {
    const bookingTime = getNextBookingTimeRange();
    const variables = {
      bookingTime,
      title: 'Test booking',
      roomId: room.id,
    };

    const bookingResponse = await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables });

    const body = bookingResponse.body as BookingResponse;

    expect(body.errors).toHaveLength(1);
    expect(body.errors?.[0].message).toBe('User is not authenticated');
  });

  it('should return an error if the token is invalid', async () => {
    const invalidToken = 'invalid.token.here';
    const bookingTime = getNextBookingTimeRange();
    const variables = {
      bookingTime,
      title: 'Test booking',
      roomId: room.id,
    };

    const bookingResponse = await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables })
      .set({ Authorization: `Bearer ${invalidToken}` });

    const body = bookingResponse.body as BookingResponse;

    expect(body.errors).toHaveLength(1);
    expect(body.errors?.[0].message).toBe('User is not authenticated');
  });

  it('should return an error if the room ID is invalid', async () => {
    const invalidRoomId = 'ba28f83f-e6e1-44c1-acd1-243794da0e6e'; // room with this id does not exist
    const bookingTime = getNextBookingTimeRange();
    const variables = {
      bookingTime,
      title: 'Test booking',
      roomId: invalidRoomId,
    };

    const bookingResponse = await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables })
      .set({ Authorization: `Bearer ${token}` });

    const body = bookingResponse.body as BookingResponse;

    expect(body.errors).toHaveLength(1);
    expect(body.errors?.[0].message).toBe('Room not found!');
  });

  it('should return an error if the booking time conflicts with an existing booking', async () => {
    const initialBookingTime = getNextBookingTimeRange();
    const initialBookingVariables = {
      bookingTime: initialBookingTime,
      title: 'Initial Test booking',
      roomId: room.id,
    };

    await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables: initialBookingVariables })
      .set({ Authorization: `Bearer ${token}` });

    const conflictingBookingTime = initialBookingTime;
    const conflictingBookingVariables = {
      bookingTime: conflictingBookingTime,
      title: 'Conflicting Test booking',
      roomId: room.id,
    };

    const bookingResponse = await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables: conflictingBookingVariables })
      .set({ Authorization: `Bearer ${token}` });

    const body = bookingResponse.body as BookingResponse;

    expect(body.errors).toHaveLength(1);
    expect(body.errors?.[0].message).toBe('Exclusion constraint error');
  });

  it('should return an error if the booking time is in an invalid format', async () => {
    const invalidBookingTime = 'invalid-time';
    const variables = {
      bookingTime: invalidBookingTime,
      title: 'Test booking',
      roomId: room.id,
    };

    const bookingResponse = await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables })
      .set({ Authorization: `Bearer ${token}` });

    const body = bookingResponse.body as BookingResponse;

    expect(body.errors).toHaveLength(1);
    expect(body.errors?.[0].message).toBe(
      'Variable "$bookingTime" got invalid value "invalid-time"; Expected type "Date". GraphQL Date Scalar parser expected a `number`'
    );
  });

  it('should return an error if required fields are missing', async () => {
    const variables = {
      title: 'Test booking',
      roomId: room.id,
    };

    const bookingResponse = await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables })
      .set({ Authorization: `Bearer ${token}` });

    const body = bookingResponse.body as BookingResponse;

    expect(body.errors).toHaveLength(1);
    expect(body.errors?.[0].message).toBe(
      'Variable "$bookingTime" of required type "[Date!]!" was not provided.'
    );
  });

  it('does not allow to create single booking exceeding 3 hours for students', async () => {
    const tooLongBooking = getNextBookingTimeRange(14, 4);
    const variables = {
      bookingTime: tooLongBooking,
      title: 'Test booking',
      roomId: room.id,
    };

    const bookingResponse = await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables })
      .set({ Authorization: `Bearer ${token}` });

    const body = bookingResponse.body as BookingResponse;

    expect(body.errors).toHaveLength(1);
    expect(body.errors?.[0].message).toBe(
      'Single booking cannot exceed 3 hours'
    );
  });

  it('does not allow to book more that 12 hours/week for students', async () => {
    const variables = {
      bookingTime: getNextBookingTimeRange(18, 3),
      title: 'Test booking',
      roomId: room.id,
    };

    console.log(getBookingTimeForDb(getNextBookingTimeRange(6, 3)));

    //creating for this week 12 hours
    await Booking.bulkCreate([
      {
        userId: user.id,
        roomId: room.id,
        status: BookingStatus.Active,
        bookingTime: getBookingTimeForDb(getNextBookingTimeRange(6, 3))
      },
      {
        userId: user.id,
        roomId: room.id,
        status: BookingStatus.Active,
        bookingTime: getBookingTimeForDb(getNextBookingTimeRange(9, 3))
      },
      {
        userId: user.id,
        roomId: room.id,
        status: BookingStatus.Active,
        bookingTime: getBookingTimeForDb(getNextBookingTimeRange(12, 3))
      },
      {
        userId: user.id,
        roomId: room.id,
        status: BookingStatus.Active,
        bookingTime: getBookingTimeForDb(getNextBookingTimeRange(15, 3))
      },
    ]);

    const bookingResponse = await request(app)
      .post('/')
      .send({ query: CREATE_BOOKING, variables })
      .set({ Authorization: `Bearer ${token}` });

    const body = bookingResponse.body as BookingResponse;

      expect(body.errors).toHaveLength(1);
      expect(body.errors?.[0].message).toBe(
      'You cannot make more bookings this week. Limit of 12 hours exceeded.'
      );
    });
  
  
});
