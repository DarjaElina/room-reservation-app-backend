import type { Migration } from '../util/db';
import { Sequelize } from 'sequelize-typescript';

export const up: Migration = async ({ context: queryInterface }) => {

  await queryInterface.bulkInsert('room_equipment', [
    {
        id: Sequelize.literal('gen_random_uuid()'),
        equipment_id: '97aa1b1e-7656-483e-9f46-4ad8b5842a16',
        room_id: 'cdf0365d-eb1d-4953-8f36-1292a6953f8d',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
  ], {});
};

export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('room_equipment', {});
};