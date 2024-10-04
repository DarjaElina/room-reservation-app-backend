import { DataType } from 'sequelize-typescript';
import { Table, Model, Column, PrimaryKey, AllowNull, Default, Unique, Length, Validate, BelongsToMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { EquipmentTypes } from '../types/equipment/equipment.constants';
import Room from './room';
import RoomEquipment from './room_equipment';

interface EquipmentAttributes {
  id: string;
  name: string;
}

type EquipmentCreationAttributes = Optional<EquipmentAttributes, 'id'>;

@Table({
  underscored: true,
  modelName: 'equipment',
  tableName: 'equipment'
})

class Equipment extends Model<EquipmentAttributes, EquipmentCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @Length({ min: 5, max: 100 })
  @Validate({
    isIn: [EquipmentTypes]
  })
  @Column
  name!: string;

  @BelongsToMany(() => Room, () => RoomEquipment)
  rooms!: Room[];
}

export default Equipment;
