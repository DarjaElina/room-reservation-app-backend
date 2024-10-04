import { DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, AllowNull, Default, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import Department from './department';
import { FacultyName } from '../types/faculty/faculty.enums';
import { faculties } from '../types/faculty/faculty.constants';

interface FacultyAttributes {
  id: string;
  name: FacultyName;
  createdAt: Date;
  updatedAt: Date;
}

type FacultyCreationAttributes = Optional<FacultyAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
  underscored: true,
  modelName: 'faculty'
})

class Faculty extends Model<FacultyAttributes, FacultyCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...faculties),
    validate: {
      isIn: [faculties],
    }
  })
  name!: FacultyName;

  @HasMany(() => Department)
  departments!: Department[];

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

export default Faculty;
