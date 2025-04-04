import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'user_number', {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  });

  await queryInterface.sequelize.query(`
    CREATE SEQUENCE users_user_number_seq
    START WITH 10000;
  `);

  await queryInterface.sequelize.query(`
    ALTER TABLE users
    ALTER COLUMN user_number SET DEFAULT nextval('users_user_number_seq');
  `);
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'user_number');
  await queryInterface.sequelize.query(`
    DROP SEQUENCE IF EXISTS users_user_number_seq;
  `);
};
