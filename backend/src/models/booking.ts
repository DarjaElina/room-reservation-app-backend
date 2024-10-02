import { Table, Model, Column, PrimaryKey, AllowNull, Default, ForeignKey, BelongsTo, BeforeSave } from 'sequelize-typescript';
import User from './user';
import Room from './room';
import { Optional, DataTypes } from 'sequelize';
import { BookingStatus } from '../types/booking/booking.enums';
import { bookingStatuses } from '../types/booking/booking.constants';

interface BookingAttributes {
  id: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  roomId: string;
  status: BookingStatus;
}

type BookingCreationAttributes = Optional<BookingAttributes, 'id'>;

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

  @BeforeSave
  static validateDates(instance: Booking) {
    if (instance.endDate <= instance.startDate) {
      throw new Error('endDate must be after startDate');
    }
  }

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
  @Column(DataTypes.UUID)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Room)
  @AllowNull(false)
  @Column(DataTypes.UUID)
  roomId!: string;

  @BelongsTo(() => Room)
  room!: Room;
}

export default Booking;