import { DataType } from 'sequelize-typescript';
import { Table, Model, Column, PrimaryKey, AllowNull, Default, HasMany, ForeignKey, BelongsTo, Unique, Length, Validate, IsUrl, BelongsToMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { RoomType } from '../types/room/room.enums';
import { roomTypes } from '../types/room/room.constants';
import Venue from './venue';
import Booking from './booking';
import Department from './department';
import Equipment from './equipment';
import RoomEquipment from './room_equipment';

interface RoomAttributes {
  id: string;
  code: string;
  type: RoomType;
  size: number;
  venueId: string;
  pictureUrl?: string;
  isBookable: boolean;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

type RoomCreationAttributes = Optional<RoomAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
  underscored: true,
  modelName: 'room'
})

class Room extends Model<RoomAttributes, RoomCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
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
    type: DataType.ENUM(...roomTypes),
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

  @IsUrl
  @Column(DataType.STRING)
  pictureUrl?: string;

  @AllowNull(false)
  @Column
  isBookable!: boolean;

  @ForeignKey(() => Venue)
  @AllowNull(false)
  @Column(DataType.UUID)
  venueId!: string;

  @BelongsTo(() => Venue)
  venue!: Venue;

  @HasMany(() => Booking)
  bookings!: Booking[];

  @ForeignKey(() => Department)
  @AllowNull(false)
  @Column(DataType.UUID)
  departmentId!: string;

  @BelongsTo(() => Department)
  department!: Department;

  @BelongsToMany(() => Equipment, () => RoomEquipment)
  equipments!: Equipment[];

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

export default Room;