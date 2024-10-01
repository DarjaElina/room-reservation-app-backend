import { Table, Model, Column, PrimaryKey, AllowNull, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';
import Room from './room';
import { Optional, DataTypes } from 'sequelize';
import { BookingStatus } from '../types/booking.types';

interface BookingAttributes {
  id: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  roomId: string;
  status: BookingStatus;
}

type BookingCreationAttributes = Optional<BookingAttributes, 'id'>;

const bookingStatuses: string[] = Object.values(BookingStatus);

@Table({
  underscored: true,
  modelName: 'booking'
})

class Booking extends Model<BookingAttributes, BookingCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  startDate!: Date;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  endDate!: Date;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(...bookingStatuses),
    validate: {
      isIn: [bookingStatuses],
    }
  })
  status!: BookingStatus;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Room)
  @AllowNull(false)
  @Column
  roomId!: string;

  @BelongsTo(() => Room)
  room!: Room;
}

export default Booking;