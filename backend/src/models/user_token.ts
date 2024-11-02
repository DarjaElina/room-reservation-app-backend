import { Optional } from 'sequelize';
import {
  DataType,
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  CreatedAt,
  UpdatedAt,
  Unique,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { TokenType } from '../types/token/token.enums';
import { tokenTypes } from '../types/token/token.constants';
import User from './user';

interface UserTokenAttributes {
  id: string;
  userId: string;
  token: string;
  type: TokenType;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

type UserTokenCreationAttributes = Optional<
  UserTokenAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

@Table({
  underscored: true,
  modelName: 'user_token',
})
class UserToken extends Model<
  UserTokenAttributes,
  UserTokenCreationAttributes
> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Unique
  @Column
  token!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...tokenTypes),
    validate: {
      isIn: [tokenTypes],
    },
  })
  type!: TokenType;

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

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @Column
  expiresAt!: Date;
}

export default UserToken;
