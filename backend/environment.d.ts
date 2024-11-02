import { Secret } from 'jwt-promisify';

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    PORT?: string;
    NODE_ENV: 'development' | 'production' | 'test';
    MAIL_PASSWORD: string;
    MAIL_USERNAME: string;
    JWT_SECRET: Secret;
  }
}
