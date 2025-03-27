/* eslint-disable @typescript-eslint/no-misused-promises */
import request from 'supertest';
import { createApp } from '../../src/app';
import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import{ Express } from 'express';
import { AUTHENTICATE } from '../user/mutations';
import { BOOKINGS } from './queries';
import { CREATE_BOOKING } from './mutations';
import { seedTestDB } from '../seed';
import { rollbackMigration } from '../../src/util/db';
import { sequelize } from '../../src/util/db';
import { getNextBookingTimeRange } from './helpers';
let app: Express;

let token: string;

beforeAll(async () => {
  await connectTestDB();
  const server = await createApp();
  app = server.app;
});

beforeEach(async () => {
  await clearTestDB();
  await sequelize.query('ALTER SEQUENCE users_user_number_seq RESTART WITH 10000');
  await seedTestDB();

  const variables = { username: 'jd10000', password: 'password' };
  const response = await request(app)
    .post('/')
    .send({ query: AUTHENTICATE, variables });

  token = response.body.data.authenticate.value;
});

afterAll(async () => {
  await rollbackMigration();
  await closeTestDB();
});

describe('Booking API', () => {
  it('should returns bookings as json', async () => {
    await request(app)
        .post('/')
        .send({ query: BOOKINGS })
        .set({authorization: `Bearer ${token}`})
        .expect('Content-Type', /application\/json/)
  });

  it('should create a booking with valid data', async () => {
    const bookingTime = getNextBookingTimeRange();
    const response = await request(app)
        .post('/')
        .send({ query: CREATE_BOOKING, variables: {roomId: '93d14d84-3acd-4a3a-ba1b-81e9a7aa546d', bookingTime, title: 'Test booking'}})
        .set({authorization: `Bearer ${token}`})
    console.log(response);
  })
});