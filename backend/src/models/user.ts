import { Optional, DataTypes } from 'sequelize';
import { Table, Model, Column, HasMany, AllowNull, Default, PrimaryKey, Length, IsEmail, Unique, Validate } from 'sequelize-typescript';
import { Role, Responsibility, Status } from '../types/user.types';
import Booking from './booking';

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
  @Column(DataTypes.ENUM(...Object.values(Role)))
  role!: Role;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(Status)))
  status!: Status;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(Responsibility)))
  responsibility!: Responsibility;

  @HasMany(() => Booking)
  bookings!: Booking[];
}


export default User;