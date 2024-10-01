import { Table, Model, Column, PrimaryKey, AllowNull, Default, HasMany, ForeignKey, BelongsTo, Unique, Length, Validate, IsUrl } from 'sequelize-typescript';
import { Optional, DataTypes } from 'sequelize';
import { RoomType } from '../types/room.types';
import Venue from './venue';
import Booking from './booking';
import Department from './department';

interface RoomAttributes {
  id: string;
  code: string;
  type: RoomType;
  size: number;
  venueId: string;
  equipment: string[];
  pictureUrl: string;
  isBookable: boolean;
  departmentId: string;
}

type RoomCreationAttributes = Optional<RoomAttributes, 'id'>;

const roomTypes: string[] = Object.values(RoomType);

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
  @Unique
  @Length({ min: 3, max: 10 })
  @Validate({
    is: /^[A-Z0-9-]+$/
  })
  @Column
  code!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(...roomTypes),
    validate: {
      isIn: [roomTypes]
    }
  })
  type!: RoomType;

  @AllowNull(false)
  @Validate({
    min: 3,
    max: 1000
  })
  @Column
  size!: number;

  @Column(DataTypes.ARRAY(DataTypes.STRING))
  equipment!: string[];

  @IsUrl
  @Column(DataTypes.STRING)
  pictureUrl!: string;

  @AllowNull(false)
  @Column
  isBookable!: boolean;

  @ForeignKey(() => Venue)
  @AllowNull(false)
  @Column
  venueId!: string;

  @BelongsTo(() => Venue)
  venue!: Venue;

  @HasMany(() => Booking)
  bookings!: Booking[];

  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column
  departmentId!: string;

  @BelongsTo(() => Department)
  department!: Department;
}

export default Room;