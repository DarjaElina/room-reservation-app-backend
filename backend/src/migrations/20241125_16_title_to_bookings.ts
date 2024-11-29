import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('bookings', 'title', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Reservation from Booking App'
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('bookings', 'title');
};
