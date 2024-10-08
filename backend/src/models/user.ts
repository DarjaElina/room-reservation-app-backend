import { Optional } from 'sequelize';
import { DataType, Table, Model, Column, HasMany, AllowNull, Default, PrimaryKey, Length, IsEmail, Unique, Validate, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, AutoIncrement, AfterCreate } from 'sequelize-typescript';
import { UserRole, UserStatus } from '../types/user/user.enums';
import { roles, userStatuses } from '../types/user/user.constants';
import Booking from './booking';
import Department from './department';
import { generateUsername } from '../util/helper';

interface UserAttributes {
  id: string;
  givenName: string;
  middleName?: string;
  familyName: string;
  username?: string;
  passwordHash?: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
  userNumber: number;
}


type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'userNumber' | 'username'>;

@Table({
  underscored: true,
  modelName: 'user',
  initialAutoIncrement: '10000'
})

class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Length({ min: 2, max: 40 })
  @Validate({
    is: /^[a-zA-ZÀ-ÿ\s'-]+$/i,
    notEmpty: true
  })
  @Column
  givenName!: string;

  @AllowNull(false)
  @Length({ min: 2, max: 40 })
  @Validate({
    is: /^[a-zA-ZÀ-ÿ\s'-]+$/i,
    notEmpty: true
  })
  @Column
  familyName!: string;

  @Length({ min: 2, max: 40 })
  @Validate({
    is: /^[a-zA-ZÀ-ÿ\s'-]+$/i,
    notEmpty: true
  })
  @Column
  middleName?: string;

  @Validate({
    is: /^[A-Za-z]{1}[A-Za-z]{1}[0-9]{5}$/,
    notEmpty: true
  })
  @Unique
  @Column
  username!: string;

  @Column
  passwordHash?: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  email!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...roles),
    validate: {
      isIn: [roles]
    }
  })
  role!: UserRole;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...userStatuses),
    validate: {
      isIn: [userStatuses]
    }
  })
  status!: UserStatus;

  @HasMany(() => Booking)
  bookings!: Booking[];

  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column(DataType.UUID)
  departmentId!: string;

  @BelongsTo(() => Department)
  department!: Department;

  @CreatedAt
  @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW
  })
  updatedAt!: Date;

  @AllowNull(false)
  @Unique
  @AutoIncrement
  @Column
  userNumber!: number;

  @AfterCreate
  static async addUsername(instance: User) {
    const username = generateUsername(instance.givenName, instance.familyName, instance.userNumber);
    await instance.update({ username });
  }
}


export default User;