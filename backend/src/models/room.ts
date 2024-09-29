import { Table, Model, Column, PrimaryKey, AllowNull, Default, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional, DataTypes } from 'sequelize';
import { RoomType } from '../types/room.types';
import Venue from './venue';
import Booking from './booking';

interface RoomAttributes {
  id: string;
  code: string;
  type: RoomType;
  size: number;
  equipment: string[];
  pictureUrl: string;
  isBookable: boolean;
}

type RoomCreationAttributes = Optional<RoomAttributes, 'id'>;

@Table({
  underscored: true,
  modelName: 'room'
})

class Room extends Model<RoomAttributes, RoomCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @AllowNull(false)
  @Column
  code!: string;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(RoomType)))
  type!: RoomType;

  @AllowNull(false)
  @Column
  size!: number;

  @Column(DataTypes.ARRAY(DataTypes.STRING))
  equipment!: [string];

  @Column(DataTypes.STRING)
  pictureUrl!: string;

  @AllowNull(false)
  @Column
  isBookable!: boolean;

  @ForeignKey(() => Venue)
  @Column
  venueId!: string;

  @BelongsTo(() => Venue)
  venue!: Venue;

  @HasMany(() => Booking)
  bookings!: Booking[];
}

export default Room;