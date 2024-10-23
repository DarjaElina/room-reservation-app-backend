import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('room_equipment', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    room_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'rooms', key: 'id' },
    },
    equipment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'equipment', key: 'id' },
    }
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('room_equipment');
};