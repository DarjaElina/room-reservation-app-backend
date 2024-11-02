import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';
import { roomTypes } from '../types/room/room.constants';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('rooms', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM(...roomTypes),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    equipment: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    picture_url: {
      type: DataTypes.STRING,
    },
    is_bookable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('rooms', {});
};
