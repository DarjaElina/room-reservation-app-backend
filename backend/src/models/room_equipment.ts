import { Table, Model, Column, PrimaryKey, AllowNull, Default, ForeignKey } from 'sequelize-typescript';
import { Optional, DataTypes } from 'sequelize';
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
  modelName: 'room_equipment'
})

class RoomEquipment extends Model<RoomEquipmentAttributes, RoomEquipmentCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @ForeignKey(() => Room)
  @Column(DataTypes.UUID)
  roomId!: string;

  @ForeignKey(() => Equipment)
  @Column(DataTypes.UUID)
  equipmentId!: string;
}

export default RoomEquipment;