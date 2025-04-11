import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeConstraint('room_equipment', 'room_equipment_room_id_fkey');

  await queryInterface.addConstraint('room_equipment', {
    fields: ['room_id'],
    type: 'foreign key',
    name: 'room_equipment_room_id_fkey',
    references: {
      table: 'rooms',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });


  await queryInterface.removeConstraint('room_equipment', 'room_equipment_equipment_id_fkey');

  await queryInterface.addConstraint('room_equipment', {
    fields: ['equipment_id'],
    type: 'foreign key',
    name: 'room_equipment_equipment_id_fkey',
    references: {
      table: 'equipment',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};
