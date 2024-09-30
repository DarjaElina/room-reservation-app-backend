import { DataTypes, Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, AllowNull, Default } from 'sequelize-typescript';

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

  @AllowNull(false)
  @Column
  name!: string;
}

export default Faculty;
