import { Sequelize } from 'sequelize-typescript';
import { DATABASE_URL } from './config';
import User from '../models/user';
import Booking from '../models/booking';
import Venue from '../models/venue';
import Room from '../models/room';
import Department from '../models/department';
import Faculty from '../models/faculty';

import { Umzug, SequelizeStorage } from 'umzug';

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined.");
}

export const sequelize = new Sequelize(DATABASE_URL, {
  models: [User, Booking, Venue, Room, Department, Faculty],
});

const migrationConf = {
  migrations: {
    glob: './src/migrations/*.ts',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const umzug = new Umzug(migrationConf);

export type Migration = typeof umzug._types.migration;

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');

    const migrations = await umzug.up();
    console.log('Migrations up to date', {
      files: migrations.map((mig) => mig.name),
    });
  } catch (err) {
    console.log('Failed to connect to the database');
    console.error(err);
    return process.exit(1);
  }

  return null;
};

export const rollbackMigration = async () => {
  try {
    await sequelize.authenticate();
    const migrations = await umzug.down();
    console.log('Rolled back migrations', {
      files: migrations.map((mig) => mig.name),
    });
  } catch (err) {
    console.error('Failed to rollback migration', err);
  }
};
