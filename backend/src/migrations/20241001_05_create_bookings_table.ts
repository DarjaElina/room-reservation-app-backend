import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';
import { bookingStatuses } from '../types/booking/booking.constants';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('bookings', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...bookingStatuses),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('bookings', {});
};