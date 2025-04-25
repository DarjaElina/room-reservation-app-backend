import { DataType } from 'sequelize-typescript';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  ForeignKey,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import Room from './room';
import User from './user';

interface FavoriteRoomsAttributes {
  id: string;
  userId: string;
  roomId: string;
}

type FavoriteRoomsCreationAttributes = Optional<FavoriteRoomsAttributes, 'id'>;

@Table({
  underscored: true,
  modelName: 'favorite_room',
})
class FavoriteRoom extends Model<
  FavoriteRoomsAttributes,
  FavoriteRoomsCreationAttributes
> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId!: string;

  @ForeignKey(() => Room)
  @AllowNull(false)
  @Column(DataType.UUID)
  roomId!: string;
}

export default FavoriteRoom;