import { DataTypes, Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, AllowNull, Default, HasMany } from 'sequelize-typescript';
import Department from './department';
import { FacultyName } from '../types/faculty/faculty.enums';
import { faculties } from '../types/faculty/faculty.constants';

interface FacultyAttributes {
  id: number;
  name: FacultyName;
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
  @Column({
    type: DataTypes.ENUM(...faculties),
    validate: {
      isIn: [faculties],
    }
  })
  name!: FacultyName;

  @HasMany(() => Department)
  departments!: Department[];
}

export default Faculty;
