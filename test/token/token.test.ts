import request from 'supertest';
import { createApp } from '../../src/app';
import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import { Express } from 'express';
import { REFRESH_TOKEN } from './mutations';
import { AUTHENTICATE } from '../user/mutations';
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

let accessToken: string | undefined;
let refreshToken: string | undefined;

interface AuthResponse {
  data?: {
    authenticate?: {
      accessToken: string;
      refreshToken: string;
    };
  };
  errors?: { message: string }[];
}

interface RefreshTokenResponse {
  data?: {
    refreshToken?: {
      accessToken: string;
    };
  };
  errors?: {
    message: string,
    extensions: {
      code: string
    }
  }[];
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

  const authVariables = {
    username: 'jd10000',
    password: 'password',
  };

  const authResponse = await request(app)
    .post('/')
    .send({ query: AUTHENTICATE, variables: authVariables });

  const body = authResponse.body as AuthResponse;
  accessToken = body?.data?.authenticate?.accessToken;
  refreshToken = body?.data?.authenticate?.refreshToken;
});

afterAll(async () => {
  await clearTestDB();
  await rollbackMigration();
  await closeTestDB();
});

describe('Refresh token', () => {
  it('should fetch new access token when valid', async () => {
    const variables = {
      token: refreshToken
    };

    const response = await request(app)
      .post('/')
      .send({ query: REFRESH_TOKEN, variables })
      .set({ Authorization: `Bearer ${accessToken}` });

    const body = response.body as RefreshTokenResponse;

    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('refreshToken');
    expect(body.data?.refreshToken).toHaveProperty('accessToken');
    expect(typeof body.data?.refreshToken?.accessToken).toBe('string');
  });

  it('return 401 unauthenticated when invalid or expired', async () => {
    const variables = {
      token: 'invalidToken'
    };

    const response = await request(app)
      .post('/')
      .send({ query: REFRESH_TOKEN, variables })
      .set({ Authorization: `Bearer ${accessToken}` });

    const body = response.body as RefreshTokenResponse;

    expect(body).toHaveProperty('errors');
    expect(body.errors?.[0].message).toBe('User is not authenticated');
    expect(body.errors?.[0].extensions?.code).toBe('UNAUTHENTICATED');
  });
  
});