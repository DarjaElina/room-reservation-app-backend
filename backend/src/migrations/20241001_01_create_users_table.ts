import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';
import { roles, responsibilities, userStatuses } from '../types/user/user.constants';


export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    given_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    family_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM(...roles),
      allowNull: false,
    },
    responsibility: {
      type: DataTypes.ENUM(...responsibilities),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...userStatuses),
      allowNull: false,
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
  await queryInterface.dropTable('users', {});
};