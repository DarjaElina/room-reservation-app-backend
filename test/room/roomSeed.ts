import Venue from '../../src/models/venue';
import Room from '../../src/models/room';
import Equipment from '../../src/models/equipment';
import { RoomType } from '../../src/graphql/generated-types';
import RoomEquipment from '../../src/models/room_equipment';
import FavoriteRoom from '../../src/models/favorite_rooms';
import User from '../../src/models/user';

export async function seedRoomTestData() {
  const user = await User.findOne({ where: { email: 'jane.doe@example.com' } });
  const venueA = await Venue.create({
    name: 'Old Hall',
    code: 'OLD',
  });

  const venueB = await Venue.create({
    name: 'New Studio',
    code: 'NEW',
  });

  const piano = await Equipment.create({ name: 'Piano' });
  const projector = await Equipment.create({ name: 'Projector' });

  const roomWithPiano = await Room.create({
    code: 'OLD-100',
      type: RoomType.PracticeRoom,
      venueId: venueA.id,
      size: 10,
      isBookable: true,
      description: 'Practice room with piano',
  });

  const roomWithProjector = await Room.create({
      code: 'NEW-200',
      type: RoomType.Studio,
      venueId: venueB.id,
      size: 50,
      isBookable: true,
      description: 'Large room with piano and projector',
    }
  );

  const roomWithPianoAndProjector = await Room.create({
    code: 'OLD-101',
    type: RoomType.Classroom,
    venueId: venueA.id,
    size: 15,
    isBookable: false,
    description: 'Classroom, no equipment',
  });

  await Room.create(
    {
      code: 'NEW-201',
      type: RoomType.Classroom,
      venueId: venueB.id,
      size: 20,
      isBookable: true,
      description: 'Projector room',
    }
  );

  await RoomEquipment.bulkCreate([
    
      {
        roomId: roomWithPiano.id,
        equipmentId: piano.id
      },
      {
        roomId: roomWithProjector.id,
        equipmentId: projector.id
      },
      {
        roomId: roomWithPianoAndProjector.id,
        equipmentId: projector.id
      },
      {
        roomId: roomWithPianoAndProjector.id,
        equipmentId: piano.id
      }
  ]);

  await FavoriteRoom.bulkCreate([
    {
      userId: user!.id,
      roomId: roomWithPianoAndProjector.id,
    },
    {
      userId: user!.id,
      roomId: roomWithPiano.id,
    },
  ]);

  return {
    testVenues: [venueA, venueB],
    testEquipment: [piano, projector],
    favoriteRoomWithPiano: roomWithPiano,
    notFavoriteRoomWithProjector: roomWithProjector
  };
}
