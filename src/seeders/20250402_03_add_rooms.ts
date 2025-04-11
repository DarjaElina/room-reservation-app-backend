import type { Migration } from '../util/db';
import { Sequelize } from 'sequelize-typescript';
export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('rooms', [
    { id: 'cdf0365d-eb1d-4953-8f36-1292a6953f8d', code: 'T-100', type: 'CLASSROOM', size: 28, venue_id: '2e4bf800-0124-4ccb-8840-0e83eabae1ee', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A classroom designed for chamber music instruction.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'T-101', type: 'PRACTICE_ROOM', size: 12, venue_id: '2e4bf800-0124-4ccb-8840-0e83eabae1ee', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A practice room with excellent sound insulation.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'T-102', type: 'STUDIO', size: 45, venue_id: '2e4bf800-0124-4ccb-8840-0e83eabae1ee', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A well-equipped recording studio for students.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'T-103', type: 'CONCERT_HALL', size: 400, venue_id: '2e4bf800-0124-4ccb-8840-0e83eabae1ee', is_bookable: false, created_at: new Date(), updated_at: new Date(), description: 'A grand concert hall used for student recitals.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'T-104', type: 'MEETING_ROOM', size: 15, venue_id: '2e4bf800-0124-4ccb-8840-0e83eabae1ee', is_bookable: false, created_at: new Date(), updated_at: new Date(), description: 'A small room for faculty meetings and collaborations.' },

   
    { id: Sequelize.literal('gen_random_uuid()'), code: 'MB-100', type: 'CLASSROOM', size: 32, venue_id: '8870c7db-9287-4ae6-97f4-842f357d4f94', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A lecture room for composition and analysis.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'MB-101', type: 'PRACTICE_ROOM', size: 10, venue_id: '8870c7db-9287-4ae6-97f4-842f357d4f94', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A private practice room for string players.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'MB-102', type: 'THEATER', size: 260, venue_id: '8870c7db-9287-4ae6-97f4-842f357d4f94', is_bookable: false, created_at: new Date(), updated_at: new Date(), description: 'A theater for student performances and productions.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'MB-103', type: 'LIBRARY', size: 90, venue_id: '8870c7db-9287-4ae6-97f4-842f357d4f94', is_bookable: false, created_at: new Date(), updated_at: new Date(), description: 'A music library with rare manuscripts.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'MB-104', type: 'STUDIO', size: 50, venue_id: '8870c7db-9287-4ae6-97f4-842f357d4f94', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A soundproofed recording studio with professional gear.' },

    
    { id: Sequelize.literal('gen_random_uuid()'), code: 'R-100', type: 'CLASSROOM', size: 30, venue_id: '03bebdab-0dc0-410d-8e75-e64f17879ee7', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A harmony and counterpoint classroom.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'R-101', type: 'PRACTICE_ROOM', size: 8, venue_id: '03bebdab-0dc0-410d-8e75-e64f17879ee7', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A soundproofed room for solo practice.' },

    { id: Sequelize.literal('gen_random_uuid()'), code: 'M-100', type: 'CONCERT_HALL', size: 150, venue_id: 'c9d6949e-14b9-4911-afaa-000e3aaf0707', is_bookable: false, created_at: new Date(), updated_at: new Date(), description: 'A small concert hall for chamber concerts.' },
    { id: Sequelize.literal('gen_random_uuid()'), code: 'M-101', type: 'CLASSROOM', size: 25, venue_id: 'c9d6949e-14b9-4911-afaa-000e3aaf0707', is_bookable: true, created_at: new Date(), updated_at: new Date(), description: 'A classroom for music theory lectures.' },
  ]);
};

export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('rooms', {});
};