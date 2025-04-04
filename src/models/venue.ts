import { DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  HasMany,
  Unique,
  Length,
  Validate,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import Room from './room';

interface VenueAttributes {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type VenueCreationAttributes = Optional<
  VenueAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

@Table({
  underscored: true,
  modelName: 'venue',
})
class Venue extends Model<VenueAttributes, VenueCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Unique
  @Length({ min: 3, max: 10 })
  @Validate({
    is: /^[A-Z0-9-]+$/,
  })
  @Column
  code!: string;

  @AllowNull(false)
  @Length({ min: 5, max: 50 })
  @Validate({
    is: /^[a-zA-ZÀ-ÿ\s'-]+$/,
  })
  @Column
  name!: string;

  @HasMany(() => Room, { onDelete: 'CASCADE' })
  rooms!: Room[];

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;
}

export default Venue;
