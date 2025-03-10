import Faculty from '../src/models/faculty';;
import Department from '../src/models/department';
import User from '../src/models/user';
import { createPasswordHash } from '../src/helpers/helpers';
import { UserRole, UserStatus } from '../src/graphql/generated-types';
import { FacultyName } from '../src/types/faculty/faculty.enums';

export async function seedTestDB() {
  const faculty = await Faculty.create({name: FacultyName.Orchestral, id: '3f35f45d-3535-429d-a292-b9f0a4380e31'});

  const department = await Department.create({ name: 'Department of Viola', facultyId: faculty.id });

  const password = "password";
  const hashedPassword = createPasswordHash(password);
  const user = await User.create({
    givenName: 'Jane',
    familyName: 'Doe',
    email: 'jane.doe@example.com',
    role: UserRole.Student,
    status: UserStatus.Active,
    departmentId: department.id,
    passwordHash: hashedPassword
  });

  console.log(user);

  return { faculty, department };
}
