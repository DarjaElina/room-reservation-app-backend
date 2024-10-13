import { DataType } from 'sequelize-typescript';
import { Table, Model, Column, PrimaryKey, AllowNull, Default, ForeignKey, BelongsTo, BeforeSave, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import User from './user';
import Room from './room';
import { Optional } from 'sequelize';
import { BookingStatus } from '../types/booking/booking.enums';
import { bookingStatuses } from '../types/booking/booking.constants';

export interface BookingAttributes {
  id: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  roomId: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

type BookingCreationAttributes = Optional<BookingAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
  underscored: true,
  modelName: 'booking'
})

class Booking extends Model<BookingAttributes, BookingCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  startDate!: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  endDate!: Date;

  @BeforeSave
  static validateDates(instance: Booking) {
    if (instance.endDate <= instance.startDate) {
      throw new Error('endDate must be after startDate');
    }
  }

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...bookingStatuses),
    validate: {
      isIn: [bookingStatuses],
    }
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
      defaultValue: DataType.NOW
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW
  })
  updatedAt!: Date;
}

export default Booking;