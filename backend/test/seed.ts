import Faculty from '../src/models/faculty';;
import Department from '../src/models/department';
import User from '../src/models/user';
import Room from '../src/models/room';
import Venue from '../src/models/venue';
import { createPasswordHash } from '../src/helpers/helpers';
import { UserRole, UserStatus } from '../src/graphql/generated-types';
import { FacultyName } from '../src/types/faculty/faculty.enums';
import { RoomType } from '../src/types/room/room.enums';

export async function seedTestDB() {
  const faculty = await Faculty.create({name: FacultyName.Orchestral, id: '3f35f45d-3535-429d-a292-b9f0a4380e31'});

  const department = await Department.create({ name: 'Department of Viola', facultyId: faculty.id });

  await Venue.create({name: 'Test Building', code: 'TEST', id: '65059bf7-aa11-4dbb-a675-2ee6d95d8405'});

  const password = "password";
  const hashedPassword = createPasswordHash(password);
  await User.create({
    givenName: 'Jane',
    familyName: 'Doe',
    email: 'jane.doe@example.com',
    role: UserRole.Student,
    status: UserStatus.Active,
    departmentId: department.id,
    passwordHash: hashedPassword
  });

  await Room.create({code: 'T-100', id: '93d14d84-3acd-4a3a-ba1b-81e9a7aa546d', type: RoomType.Classroom, size: 10, venueId: '65059bf7-aa11-4dbb-a675-2ee6d95d8405', isBookable: true, description: 'Test description'})

  return { faculty, department };
}

