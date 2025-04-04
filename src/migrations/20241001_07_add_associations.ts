import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('bookings', 'user_id', {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  });

  await queryInterface.addColumn('users', 'department_id', {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'departments', key: 'id' },
  });

  await queryInterface.addColumn('rooms', 'venue_id', {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'venues', key: 'id' },
  });

  await queryInterface.addColumn('departments', 'faculty_id', {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'faculties', key: 'id' },
  });

  await queryInterface.addColumn('bookings', 'room_id', {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'rooms', key: 'id' },
  });

  await queryInterface.addColumn('rooms', 'department_id', {
    type: DataTypes.UUID,
    references: { model: 'departments', key: 'id' },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('bookings', 'user_id');
  await queryInterface.removeColumn('users', 'department_id');
  await queryInterface.removeColumn('rooms', 'venue_id');
  await queryInterface.removeColumn('departments', 'faculty_id');
  await queryInterface.removeColumn('bookings', 'room_id');
  await queryInterface.removeColumn('rooms', 'department_id');
};
