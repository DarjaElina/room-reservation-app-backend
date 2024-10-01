import { Table, Model, Column, ForeignKey, BelongsTo, PrimaryKey, AllowNull, Default, Unique, Length, Validate } from 'sequelize-typescript';
import Faculty from './faculty';
import { Optional, DataTypes } from 'sequelize';

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
  @PrimaryKey
  @AllowNull(false)
  @Default(() => DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @Unique
  @Length({ min: 5, max: 50 })
  @Validate({
    is: /^[A-Z0-9-]+$/
  })
  @Column
  name!: string;

  @ForeignKey(() => Faculty)
  @AllowNull(false)
  @Column
  facultyId!: number;

  @BelongsTo(() => Faculty)
  faculty!: Faculty;
}

export default Department;
