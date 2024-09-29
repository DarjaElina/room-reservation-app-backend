import { Table, Model, Column, PrimaryKey, AllowNull, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';
import Room from './room';
import { Optional, DataTypes } from 'sequelize';

interface BookingAttributes {
  id: string;
  startDate: Date;
  endDate: Date;
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

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Room)
  @Column
  roomId!: string;

  @BelongsTo(() => Room)
  room!: Room;
}

export default Booking;