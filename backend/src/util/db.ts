import { Sequelize } from 'sequelize-typescript';
import { DATABASE_URL } from './config';
import User from '../models/user';
import Booking from '../models/booking';
import Venue from '../models/venue';
import Room from '../models/room';

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined.");
}

export const sequelize = new Sequelize(DATABASE_URL, {
  models: [User, Booking, Venue, Room],
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database');
    console.log(err);
    return process.exit(1);
  }

  return null;
};