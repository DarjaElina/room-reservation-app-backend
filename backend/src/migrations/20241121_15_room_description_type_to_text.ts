import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn('rooms', 'description', {
    type: DataTypes.TEXT,
    allowNull: false,
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.changeColumn('rooms', 'description', {
    type: DataTypes.STRING,
    allowNull: true,
  });
};
