import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query(`
      ALTER TABLE users
      ALTER COLUMN username DROP NOT NULL;
    `);
  
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.query(`
      ALTER TABLE users
      ALTER COLUMN username SET NOT NULL;
    `);
};
