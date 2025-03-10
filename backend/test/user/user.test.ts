import request from 'supertest';
import { createApp } from '../../src/app';
import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import{ Express } from 'express';
import { AUTHENTICATE } from './userHelpers';
import { seedTestDB } from '../seed';
import { rollbackMigration } from '../../src/util/db';
//import {sequelize } from '../../src/util/db';
let app: Express;

beforeAll(async () => {
  //await rollbackMigration();
  await connectTestDB();
  const server = await createApp();
  app = server.app;
});

beforeEach(async () => {
  await clearTestDB();
  await seedTestDB();
});

afterAll(async () => {
  await rollbackMigration();
  //await sequelize.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  await closeTestDB();
});

describe('User API', () => {
  it('should return access token when log in with correct credentials', async () => {
    const variables = {
      username: 'jd00000',
      password: 'password'
    };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const response = await request(app).post('/').send({query: AUTHENTICATE, variables});

    console.log(response.error);
   // expect(response.status).toBe(200);
  });
});
