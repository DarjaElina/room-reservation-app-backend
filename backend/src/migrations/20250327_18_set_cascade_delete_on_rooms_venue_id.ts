import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeConstraint('rooms', 'rooms_venue_id_fkey');

  await queryInterface.addConstraint('rooms', {
    fields: ['venue_id'],
    type: 'foreign key',
    name: 'rooms_venue_id_fkey',
    references: {
      table: 'venues',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeConstraint('rooms', 'rooms_venue_id_fkey');

  await queryInterface.addConstraint('rooms', {
    fields: ['venue_id'],
    type: 'foreign key',
    name: 'rooms_venue_id_fkey',
    references: {
      table: 'venues',
      field: 'id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
};
