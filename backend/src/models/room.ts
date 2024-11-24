import { DataType } from 'sequelize-typescript';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  HasMany,
  ForeignKey,
  BelongsTo,
  Unique,
  Length,
  Validate,
  IsUrl,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { RoomType } from '../types/room/room.enums';
import { roomTypes } from '../types/room/room.constants';
import Venue from './venue';
import Booking from './booking';
import Department from './department';
import Equipment from './equipment';
import RoomEquipment from './room_equipment';
import {
  PaginateOptions,
  PaginationConnection,
} from 'sequelize-cursor-pagination';

interface RoomAttributes {
  id: string;
  code: string;
  type: RoomType;
  size: number;
  venueId: string;
  pictureUrl?: string;
  isBookable: boolean;
  departmentId?: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

type RoomCreationAttributes = Optional<
  RoomAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

@Table({
  underscored: true,
  modelName: 'room',
})
class Room extends Model<RoomAttributes, RoomCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Unique
  @Length({ min: 3, max: 10 })
  @Validate({
    is: /^[A-Z0-9-]+$/,
  })
  @Column
  declare code: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...roomTypes),
    validate: {
      isIn: [roomTypes],
    },
  })
  declare type: RoomType;

  @AllowNull(false)
  @Validate({
    min: 3,
    max: 1000,
  })
  @Column
  declare size: number;

  @IsUrl
  @Column(DataType.STRING)
  declare pictureUrl?: string;

  @AllowNull(false)
  @Column
  declare isBookable: boolean;

  @ForeignKey(() => Venue)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare venueId: string;

  @BelongsTo(() => Venue)
  declare venue: Venue;

  @HasMany(() => Booking)
  declare bookings: Booking[];

  @ForeignKey(() => Department)
  @Column(DataType.UUID)
  declare departmentId?: string;

  @BelongsTo(() => Department)
  declare department?: Department;

  @BelongsToMany(() => Equipment, () => RoomEquipment)
  declare equipment?: Array<Equipment & { RoomEquipment: RoomEquipment }>;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;

  @AllowNull(false)
  @Column
  declare description: string;

  declare static paginate: (
    options: PaginateOptions<Room>
  ) => Promise<PaginationConnection<Room>>;
}

export default Room;
