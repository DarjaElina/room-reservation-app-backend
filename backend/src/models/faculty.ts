import { DataTypes, Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, AllowNull, Default, HasMany, Length, Validate } from 'sequelize-typescript';
import Department from './department';

interface FacultyAttributes {
  id: number;
  name: string;
}

type FacultyCreationAttributes = Optional<FacultyAttributes, 'id'>;

@Table({
  underscored: true,
  modelName: 'faculty'
})

class Faculty extends Model<FacultyAttributes, FacultyCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(() => DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @Length({ min: 5, max: 50 })
  @Validate({
    is: /^[A-Z0-9-]+$/
  })
  @Column
  name!: string;

  @HasMany(() => Department)
  departments!: Department[];
}

export default Faculty;
