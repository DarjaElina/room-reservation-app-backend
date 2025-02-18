import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query(`
    ALTER TABLE bookings DROP CONSTRAINT no_booking_overlap;
    
    ALTER TABLE bookings
    ADD CONSTRAINT no_booking_overlap EXCLUDE USING gist (
      room_id WITH =,
      booking_time WITH &&
    ) WHERE (status NOT IN ('CANCELLED', 'CANCELLED_LATE', 'PAST'));
  `);
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query(`
    ALTER TABLE bookings
    DROP CONSTRAINT no_booking_overlap;
  `);
};
