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

  await queryInterface.removeConstraint('departments', 'departments_faculty_id_fkey');

  await queryInterface.addConstraint('departments', {
    fields: ['faculty_id'],
    type: 'foreign key',
    name: 'departments_faculty_id_fkey',
    references: {
      table: 'faculties',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  await queryInterface.removeConstraint('bookings', 'bookings_user_id_fkey');

  await queryInterface.addConstraint('bookings', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'bookings_user_id_fkey',
    references: {
      table: 'users',
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

  await queryInterface.removeConstraint('departments', 'departments_faculty_id_fkey');

  await queryInterface.addConstraint('departments', {
    fields: ['faculty_id'],
    type: 'foreign key',
    name: 'departments_faculty_id_fkey',
    references: {
      table: 'faculties',
      field: 'id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });

  await queryInterface.removeConstraint('bookings', 'bookings_user_id_fkey');

  await queryInterface.addConstraint('bookings', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'bookings_users_id_fkey',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
};