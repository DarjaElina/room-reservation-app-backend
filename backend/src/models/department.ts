import { DataType } from 'sequelize-typescript';
import { Table, Model, Column, ForeignKey, BelongsTo, PrimaryKey, AllowNull, Default, Unique, Length, Validate, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import Faculty from './faculty';
import { Optional } from 'sequelize';
import { Departments } from '../types/department/department.constants';

interface DepartmentAttributes {
  id: number;
  name: string;
  facultyId: number;
  created_at: Date;
  updated_at: Date;
}

type DepartmentCreationAttributes = Optional<DepartmentAttributes, 'id' | 'created_at' | 'updated_at'>;

@Table({
  underscored: true,
  modelName: 'department'
})

class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @Length({ min: 5, max: 100 })
  @Validate({
    isIn: [Departments]
  })
  @Column
  name!: string;

  @ForeignKey(() => Faculty)
  @AllowNull(false)
  @Column(DataType.UUID)
  facultyId!: string;

  @BelongsTo(() => Faculty)
  faculty!: Faculty;

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

export default Department;
