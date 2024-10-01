import { Optional, DataTypes } from 'sequelize';
import { Table, Model, Column, PrimaryKey, AllowNull, Default, HasMany, Unique, Length, Validate } from 'sequelize-typescript';
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
  @Unique
  @Length({ min: 3, max: 10 })
  @Validate({
    is: /^[A-Z0-9-]+$/
  })
  @Column
  code!: string;

  @AllowNull(false)
  @Length({ min: 5, max: 50 })
  @Validate({
    is: /^[a-zA-ZÀ-ÿ\s'-]+$/
  })
  @Column
  name!: string;

  @HasMany(() => Room)
  rooms!: Room[];
}

export default Venue;