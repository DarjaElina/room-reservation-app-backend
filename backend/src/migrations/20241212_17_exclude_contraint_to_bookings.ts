import { DataTypes } from 'sequelize';
import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS btree_gist;');
  await queryInterface.addColumn('bookings', 'booking_time', {
    type: DataTypes.RANGE(DataTypes.DATE),
    allowNull: false,
  });


  await queryInterface.sequelize.query(`
    UPDATE bookings
    SET booking_time = tstzrange(start_date, end_date, '[)');
  `);


  await queryInterface.sequelize.query(`
    ALTER TABLE bookings
    ADD CONSTRAINT no_booking_overlap EXCLUDE USING gist (
      room_id WITH =,
      booking_time WITH &&
    );
  `);


  await queryInterface.removeColumn('bookings', 'start_date');
  await queryInterface.removeColumn('bookings', 'end_date');
};

export const down: Migration = async ({ context: queryInterface }) => {

  await queryInterface.addColumn('bookings', 'start_date', {
    type: DataTypes.DATE,
    allowNull: false,
  });
  await queryInterface.addColumn('bookings', 'end_date', {
    type: DataTypes.DATE,
    allowNull: false,
  });

  await queryInterface.sequelize.query(`
    ALTER TABLE bookings
    DROP CONSTRAINT no_booking_overlap;
  `);

  await queryInterface.removeColumn('bookings', 'booking_time');
};
