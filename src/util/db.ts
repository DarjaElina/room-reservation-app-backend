import { Sequelize } from 'sequelize-typescript';
import { DATABASE_URL } from './config';
import User from '../models/user';
import Booking from '../models/booking';
import Venue from '../models/venue';
import Room from '../models/room';
import Department from '../models/department';
import Faculty from '../models/faculty';
import Equipment from '../models/equipment';
import RoomEquipment from '../models/room_equipment';
import UserToken from '../models/user_token';
import FavoriteRoom from '../models/favorite_rooms';

import { Umzug, SequelizeStorage } from 'umzug';

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined.');
}

export const sequelize = new Sequelize(DATABASE_URL, {
  models: [
    User,
    Booking,
    Venue,
    Room,
    Department,
    Faculty,
    Equipment,
    RoomEquipment,
    UserToken,
    FavoriteRoom
  ],
  logging: false,
});

const isProd = process.env.NODE_ENV === 'production';
const migrationPath = isProd
  ? './dist/migrations/*.js'
  : './src/migrations/*.ts';
const seedersPath = isProd
  ? './dist/seeders/*.js'
  : './src/seeders/*.ts';
const migrationConf = {
  migrations: {
    glob: migrationPath,
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
};

const seedConf = {
  migrations: {
    glob: seedersPath,
  },
  storage: new SequelizeStorage({ sequelize, tableName: "seeders" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const umzug = new Umzug(migrationConf);

const seedUmzug = new Umzug(seedConf);

export type Migration = typeof umzug._types.migration;

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();

    await umzug.up();
    if (process.env.NODE_ENV !== 'test') {
      await seedUmzug.up();
    }
  } catch (err) {
    console.error('ERROR IS', err);
    return process.exit(1);
  }

  return null;
};

export const rollbackMigration = async () => {
  try {
    await sequelize.authenticate();
    await umzug.down({ to: 0 });
    await seedUmzug.down();
  } catch (err) {
    console.error('Failed to rollback migration', err);
  }
};
