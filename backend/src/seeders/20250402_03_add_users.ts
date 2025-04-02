import type { Migration } from '../util/db';
import { createPasswordHash } from '../helpers/helpers';
import { generateUsername } from '../helpers/helpers';
import { UserRole, UserStatus } from '../types/user/user.enums';

export const up: Migration = async ({ context: queryInterface }) => {
  const givenName = 'Jane';
  const familyName = 'Doe';
  const userNumber = 10000;

  await queryInterface.bulkInsert('users', [
    {
        id: '6dbab97f-5c5f-4b3c-a53c-6da736389ed0',
        given_name: givenName,
        family_name: familyName,
        department_id: '62acdf6e-d19a-45bd-b72a-ae8e3ad308e2',
        email: 'jane.doe@example.com',
        password_hash: createPasswordHash('password'),
        username: generateUsername(givenName, familyName, userNumber),
        role: UserRole.Student,
        status: UserStatus.Active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
  ], {});
};

export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('users', {});
};