import type { Migration } from '../util/db';
export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('venues', [
    {   
        id: 'c9d6949e-14b9-4911-afaa-000e3aaf0707',
        name: 'M-Building',
        code: 'M',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '03bebdab-0dc0-410d-8e75-e64f17879ee7',
        name: 'R-Building',
        code: 'R',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2e4bf800-0124-4ccb-8840-0e83eabae1ee',
        name: 'T-Building',
        code: 'T',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '8870c7db-9287-4ae6-97f4-842f357d4f94',
        name: 'Main Building',
        code: 'MB',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
  ], {});
};

export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('venues', {});
};