import type { Migration } from '../util/db';
export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('faculties', [
    {
        name: 'Piano Faculty',
        id: '26f25b75-aad0-4e18-9aa9-5375b3351bda',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
  ], {});
};

export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('faculties', {});
};