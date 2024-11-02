import { DataType } from 'sequelize-typescript';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  ForeignKey,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import Room from './room';
import Equipment from './equipment';

interface RoomEquipmentAttributes {
  id: string;
  roomId: string;
  equipmentId: string;
}

type RoomEquipmentCreationAttributes = Optional<RoomEquipmentAttributes, 'id'>;

@Table({
  underscored: true,
  modelName: 'room_equipment',
  tableName: 'room_equipment',
})
class RoomEquipment extends Model<
  RoomEquipmentAttributes,
  RoomEquipmentCreationAttributes
> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Room)
  @AllowNull(false)
  @Column(DataType.UUID)
  roomId!: string;

  @ForeignKey(() => Equipment)
  @AllowNull(false)
  @Column(DataType.UUID)
  equipmentId!: string;
}

export default RoomEquipment;
