import request from 'supertest';
import { AUTHENTICATE } from './user/mutations';
import { App } from 'supertest/types';

type Tokens = {
  testAccessToken: string;
  testRefreshToken: string;
};

interface AuthResponse {
  data?: {
    authenticate?: {
      accessToken: string;
      refreshToken: string;
    };
  };
  errors?: { message: string }[];
}

export async function getTestAuthTokens(
  app: App,
  username = 'jd10000',
  password = 'password'
): Promise<Tokens> {
  const response = await request(app)
    .post('/')
    .send({
      query: AUTHENTICATE,
      variables: { username, password },
    });

  const body = response.body as AuthResponse;

  if (!body?.data?.authenticate?.accessToken) {
    throw new Error('Authentication failed for test user');
  }

  return {
    testAccessToken: body.data.authenticate.accessToken,
    testRefreshToken: body.data.authenticate.refreshToken,
  };
}
