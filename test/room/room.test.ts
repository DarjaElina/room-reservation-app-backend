import request from 'supertest';
import { createApp } from '../../src/app';
import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import { Express } from 'express';
import { seedTestDB } from '../seed';
import { seedRoomTestData } from './roomSeed';
import { rollbackMigration } from '../../src/util/db';
import { sequelize } from '../../src/util/db';
import { getTestAuthTokens } from '../getTestAuthTokens';
import { Room } from '../../src/graphql/generated-types';
import { ROOMS, FIND_ROOM } from './queries';
import { TOGGLE_FAVORITE_ROOM } from './mutations';
import { AllRoomsResponse, FindRoomResponse, ToggleRoomResponse } from '../responseTypes';

import {
  beforeAll,
  it,
  describe,
  beforeEach,
  afterAll,
  expect,
} from '@jest/globals';

let app: Express;
let accessToken: string | undefined;
let venues: {
  code: string;
  name: string;
  id: string;
}[];
let equipment: {
  name: string;
  id: string;
}[];
let favoriteRoom: Room;
let notFavoriteRoom: Room;



beforeAll(async () => {
  await connectTestDB();
  const server = await createApp();
  app = server.app;
});

beforeEach(async () => {
  await clearTestDB();
  await sequelize.query(
    'ALTER SEQUENCE users_user_number_seq RESTART WITH 10000'
  );

  await seedTestDB();

  const {testVenues, testEquipment, favoriteRoomWithPiano, notFavoriteRoomWithProjector } = await seedRoomTestData();
  venues = [...testVenues];
  equipment = [...testEquipment];
  favoriteRoom = favoriteRoomWithPiano;
  notFavoriteRoom = notFavoriteRoomWithProjector;
  

 const {testAccessToken} = await getTestAuthTokens(app);

 accessToken = testAccessToken;
 
});

afterAll(async () => {
  await rollbackMigration();
  await closeTestDB();
});

describe('Room API', () => {
  it('should fetched paginated room list with valid token', async () => {
    const response = await request(app)
      .post('/')
      .send({ query: ROOMS })
      .set({ Authorization: `Bearer ${accessToken}` });

    const body = response.body as AllRoomsResponse;

    expect(body.data).toHaveProperty('rooms');
    expect(body?.data?.rooms).toHaveProperty('edges');
    expect(Array.isArray(body?.data?.rooms.edges)).toBe(true);
    expect(body?.data?.rooms.edges[0]).toHaveProperty('cursor');
    expect(typeof body?.data?.rooms.edges[0].cursor).toBe('string');
    expect(body?.data?.rooms.edges).toHaveLength(5);
  });

  it('should return rooms filtered by building', async () => {
    const variables = {
      venueIds: [venues[0].id],
    };
  
    const response = await request(app)
      .post('/')
      .send({ query: ROOMS, variables })
      .set({ Authorization: `Bearer ${accessToken}` });
  
    const body = response.body as AllRoomsResponse;
  
    expect(body?.data?.rooms.edges.every(edge => 
      edge.node.venue.name === 'Old Hall'
    )).toBe(true);
  
    expect(body?.data?.rooms.edges.length).toBeGreaterThan(0);
  });

  it('should return rooms filtered by tools', async () => {
    const variables = {
      equipmentIds: [equipment.find(eq => eq.name === 'Piano')!.id],
    };
  
    const response = await request(app)
      .post('/')
      .send({ query: ROOMS, variables })
      .set({ Authorization: `Bearer ${accessToken}` });
  
    const body = response.body as AllRoomsResponse;
  
    expect(body?.data?.rooms.edges.length).toBeGreaterThan(0);
    const edges = body?.data?.rooms?.edges || [];
    for (const edge of edges) {
      const hasPiano = edge.node.equipment.some(eq => eq.name === 'Piano');
      expect(hasPiano).toBe(true);
    }
  });

  it('should return rooms filtered by type', async () => {
    const variables = {
      roomTypes: ['STUDIO'],
    };
  
    const response = await request(app)
      .post('/')
      .send({ query: ROOMS, variables })
      .set({ Authorization: `Bearer ${accessToken}` });
  
    const body = response.body as AllRoomsResponse;
  
    expect(body?.data?.rooms.edges.length).toBeGreaterThan(0);
    const edges = body?.data?.rooms?.edges || [];
    for (const edge of edges) {
      expect(edge.node.type).toContain('STUDIO');
      expect(edge.node.type).not.toContain('PRACTICE_ROOM');
    }
  });

  it('should return rooms filtered by showFavorites', async () => {
    const variables = {
      showFavorites: true,
    };
  
    const response = await request(app)
      .post('/')
      .send({ query: ROOMS, variables })
      .set({ Authorization: `Bearer ${accessToken}` });
  
    const body = response.body as AllRoomsResponse;
  
    const expectedFavRoomCodes = ['OLD-100', 'OLD-101'];
    const returnedCodes = body?.data?.rooms.edges.map(edge => edge.node.code) || [];
  
    expect(body?.data?.rooms.edges).toHaveLength(2);
    for (const code of returnedCodes) {
      expect(expectedFavRoomCodes).toContain(code);
    }
  });

  it('should return rooms matching all combined filters', async () => {
    const variables = {
      venueIds: [venues[0].id],
      equipmentIds: [equipment.find(eq => eq.name === 'Piano')!.id],
      roomTypes: ['PRACTICE_ROOM'], 
      showFavorites: true
    };
  
    const response = await request(app)
      .post('/')
      .send({ query: ROOMS, variables })
      .set({ Authorization: `Bearer ${accessToken}` });
  
    const body = response.body as AllRoomsResponse;
  
    expect(body?.data?.rooms.edges).toHaveLength(1);
    const room = body?.data?.rooms.edges[0].node;
    expect(room?.code).toBe('OLD-100');
    expect(room?.venue.name).toBe('Old Hall');
    expect(room?.equipment.some(eq => eq.name === 'Piano')).toBe(true);
  });

  it('should return correct room data with valid ID', async () => {
    const variables = { roomId: favoriteRoom.id };
  
    const response = await request(app)
      .post('/')
      .send({ query: FIND_ROOM, variables })
      .set({ Authorization: `Bearer ${accessToken}` });
  
    const body = response.body as FindRoomResponse;
  
    const result = body?.data?.findRoom;
  
    expect(result).toBeDefined();
    expect(result?.code).toBe('OLD-100');
    expect(result?.description).toBe('Practice room with piano');
    expect(result?.size).toBe(10);
    expect(result?.isFree).toBe(true);
    expect(result?.venue.name).toBe('Old Hall');
    expect(result?.equipment).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Piano' }),
      ])
    );
  });
  
  
  it('should return error for non-existing room ID', async () => {
    const variables = { roomId: '13e06aca-22d6-4d8d-8628-66478a803394' };
  
    const response = await request(app)
      .post('/')
      .send({ query: FIND_ROOM, variables })
      .set({ Authorization: `Bearer ${accessToken}` });
  
    const body = response.body as FindRoomResponse;
  
    expect(body.errors).toBeDefined();
    expect(body.errors?.[0].message).toMatch('Room not found');
  });

  it('should return error when missing token for rooms query', async () => {
    const response = await request(app)
      .post('/')
      .send({ query: ROOMS });

    const body = response.body as AllRoomsResponse;
  
    expect(body.errors).toBeDefined();
    expect(body.errors?.[0].message).toMatch("User is not authenticated");
  });


  it('toggles the favorite state from favorite to not favorite', async () => {
    const variables = {
      roomId: favoriteRoom.id
    };

    const response = await request(app)
      .post('/')
      .send({ query: TOGGLE_FAVORITE_ROOM, variables })
      .set({ Authorization: `Bearer ${accessToken}` });

    const body = response.body as ToggleRoomResponse;
    expect(body?.data?.toggleFavorite.message).toBe('Room OLD-100 successfully deleted from favorite.');
    expect(body?.data?.toggleFavorite.success).toBe(true);
    expect(body?.data?.toggleFavorite.isFavoriteNow).toBe(false);
  });

  it('toggles the favorite state from not favorite to favorite', async () => {
    const variables = {
      roomId: notFavoriteRoom.id
    };

    const response = await request(app)
      .post('/')
      .send({ query: TOGGLE_FAVORITE_ROOM, variables })
      .set({ Authorization: `Bearer ${accessToken}` });

    const body = response.body as ToggleRoomResponse;
    expect(body?.data?.toggleFavorite.message).toBe('Room NEW-200 successfully added to favorite 🧡');
    expect(body?.data?.toggleFavorite.success).toBe(true);
    expect(body?.data?.toggleFavorite.isFavoriteNow).toBe(true);
  });
});