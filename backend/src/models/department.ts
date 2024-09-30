import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Faculty from './faculty';
import { Optional } from 'sequelize';

interface DepartmentAttributes {
  id: number;
  name: string;
  facultyId: number;
}

type DepartmentCreationAttributes = Optional<DepartmentAttributes, 'id'>;

@Table({
  underscored: true,
  modelName: 'department'
})

class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes> {
  @Column
  id!: number;

  @Column
  name!: string;

  @ForeignKey(() => Faculty)
  @Column
  facultyId!: number;

  @BelongsTo(() => Faculty)
  faculty!: Faculty;
}

export default Department;
