import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {

  await queryInterface.bulkInsert('equipment', [
    {
        id: '97aa1b1e-7656-483e-9f46-4ad8b5842a16',
        name: 'Music stands',
    },
  ], {});
};

export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('equipment', {});
};