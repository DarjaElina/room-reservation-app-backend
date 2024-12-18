import { DataType } from 'sequelize-typescript';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import User from './user';
import Room from './room';
import { Optional } from 'sequelize';
import { BookingStatus } from '../types/booking/booking.enums';
import { bookingStatuses } from '../types/booking/booking.constants';

export interface BookingTimeItem {
  value: Date;
  inclusive?: boolean;
}

export interface BookingAttributes {
  id: string;
  bookingTime: BookingTimeItem[];
  userId: string;
  roomId: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
}

type BookingCreationAttributes = Optional<
  BookingAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

@Table({
  underscored: true,
  modelName: 'booking',
})
class Booking extends Model<BookingAttributes, BookingCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.RANGE(DataType.DATE))
  bookingTime!: BookingTimeItem[];

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...bookingStatuses),
    validate: {
      isIn: [bookingStatuses],
    },
  })
  status!: BookingStatus;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Room)
  @AllowNull(false)
  @Column(DataType.UUID)
  roomId!: string;

  @BelongsTo(() => Room)
  room!: Room;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: 'Reservation from Booking App',
  })
  title?: string;
}

export default Booking;
