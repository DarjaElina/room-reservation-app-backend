import { Optional, DataTypes } from 'sequelize';
import { Table, Model, Column, PrimaryKey, AllowNull, Default, HasMany } from 'sequelize-typescript';
import Room from './room';

interface VenueAttributes {
  id: string;
  code: string;
  name: string;
}

type VenueCreationAttributes = Optional<VenueAttributes, 'id'>;

@Table({
  underscored: true,
  modelName: 'venue'
})

class Venue extends Model<VenueAttributes, VenueCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @AllowNull(false)
  @Column
  code!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @HasMany(() => Room)
  rooms!: Room[];
}

export default Venue;