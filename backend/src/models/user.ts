import { Optional, DataTypes } from 'sequelize';
import { Table, Model, Column, HasMany, AllowNull, Default, PrimaryKey, Length, IsEmail, Unique, Validate, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role, Responsibility, Status } from '../types/user.types';
import Booking from './booking';
import Department from './department';

interface UserAttributes {
  id: string;
  givenName: string;
  middleName?: string;
  familyName: string;
  username: string;
  passwordHash: string;
  email: string;
  role: Role;
  status: Status;
  responsibility: Responsibility;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

const roles: string[] = Object.values(Role);
const userStatuses: string[] = Object.values(Status);
const responsibilities: string[] = Object.values(Responsibility);

@Table({
  underscored: true,
  modelName: 'user'
})

class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @AllowNull(false)
  @Length({ min: 2, max: 40 })
  @Validate({
    is: /^[a-zA-ZÀ-ÿ\s'-]+$/i
  })
  @Column
  givenName!: string;

  @AllowNull(false)
  @Length({ min: 2, max: 40 })
  @Validate({
    is: /^[a-zA-ZÀ-ÿ\s'-]+$/i
  })
  @Column
  familyName!: string;

  @Length({ min: 2, max: 40 })
  @Validate({
    is: /^[a-zA-ZÀ-ÿ\s'-]+$/i
  })
  @Column
  middleName!: string;

  @AllowNull(false)
  @Unique
  @Column
  username!: string;

  @AllowNull(false)
  @Column
  passwordHash!: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  email!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(...roles),
    validate: {
      isIn: [roles]
    }
  })
  role!: Role;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(...userStatuses),
    validate: {
      isIn: [userStatuses]
    }
  })
  status!: Status;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(...responsibilities),
    validate: {
      isIn: [responsibilities]
    }
  })
  responsibility!: Responsibility;

  @HasMany(() => Booking)
  bookings!: Booking[];

  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column
  departmentId!: string;

  @BelongsTo(() => Department)
  department!: Department;
}


export default User;