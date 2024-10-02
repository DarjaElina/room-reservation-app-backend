import { Optional, DataTypes } from 'sequelize';
import { Table, Model, Column, HasMany, AllowNull, Default, PrimaryKey, Length, IsEmail, Unique, Validate, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role, Responsibility, Status } from '../types/user/user.enums';
import { roles, responsibilities, userStatuses } from '../types/user/user.constants';
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
  departmentId: string;
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
  middleName!: string;

  @AllowNull(false)
  @Validate({
    is: /^[A-Za-z]{2}[A-Za-z]{2}[0-9]{4}$/,
    notEmpty: true
  })
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
  @Column(DataTypes.UUID)
  departmentId!: string;

  @BelongsTo(() => Department)
  department!: Department;
}


export default User;