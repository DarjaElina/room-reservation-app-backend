import { Optional, DataTypes } from 'sequelize';
import { Table, Model, Column, HasMany, AllowNull, Default, PrimaryKey } from 'sequelize-typescript';
import { Role, Responsibility } from '../types/user.types';
import Booking from './booking';

interface UserAttributes {
  id: string;
  name: string;
  username: string;
  email: string;
  role: Role;
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
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  username!: string;

  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(Role)))
  role!: Role;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(Responsibility)))
  responsibility!: Responsibility;

  @HasMany(() => Booking)
  bookings!: Booking[];
}


export default User;