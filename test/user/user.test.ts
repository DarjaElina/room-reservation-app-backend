import request from 'supertest';
import { createApp } from '../../src/app';
import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import { Express } from 'express';
import { AUTHENTICATE } from './mutations';
import { seedTestDB } from '../seed';
import { rollbackMigration } from '../../src/util/db';
import { sequelize } from '../../src/util/db';
import {
  beforeAll,
  it,
  describe,
  beforeEach,
  afterAll,
  expect,
} from '@jest/globals';
let app: Express;

interface AuthResponse {
  data?: {
    authenticate?: {
      accessToken: string;
      refreshToken: string;
    };
  };
  errors?: { message: string }[];
}

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
  await seedTestDB();
});

afterAll(async () => {
  await rollbackMigration();
  await closeTestDB();
});

describe('User API', () => {
  it('should return access token when logging in with correct credentials', async () => {
    const variables = {
      username: 'jd10000',
      password: 'password',
    };

    const response = await request(app)
      .post('/')
      .send({ query: AUTHENTICATE, variables });

    const body = response.body as AuthResponse;

    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('authenticate');
    expect(body.data?.authenticate).toHaveProperty('accessToken');
    expect(typeof body.data?.authenticate?.accessToken).toBe('string');
  });

  it('should return error when logging in with nonexisting username', async () => {
    const variables = {
      username: 'jd10001',
      password: 'password',
    };

    const response = await request(app)
      .post('/')
      .send({ query: AUTHENTICATE, variables });

    const body = response.body as AuthResponse;
    expect(body).toHaveProperty('errors');
    expect(body.errors?.[0].message).toBe('Invalid username or password.');
  });

  it('should return error when logging in with incorrect password', async () => {
    const variables = {
      username: 'jd10000',
      password: 'wrong password',
    };

    const response = await request(app)
      .post('/')
      .send({ query: AUTHENTICATE, variables });
    const body = response.body as AuthResponse;
    expect(body).toHaveProperty('errors');
    expect(body.errors?.[0].message).toBe('Invalid username or password.');
  });

  it('should return an error when username is missing', async () => {
    const variables = { password: 'password' };

    const response = await request(app)
      .post('/')
      .send({ query: AUTHENTICATE, variables });
    const body = response.body as AuthResponse;

    expect(body).toHaveProperty('errors');
    expect(body.errors?.[0].message).toBe(
      'Variable "$username" of required type "String!" was not provided.'
    );
  });

  it('should return an error when password is missing', async () => {
    const variables = { username: 'jd10000' };

    const response = await request(app)
      .post('/')
      .send({ query: AUTHENTICATE, variables });
    const body = response.body as AuthResponse;
    expect(body).toHaveProperty('errors');
    expect(body.errors?.[0].message).toBe(
      'Variable "$password" of required type "String!" was not provided.'
    );
  });
});
