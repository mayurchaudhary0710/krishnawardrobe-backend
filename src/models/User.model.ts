import { ROLE } from '@constants';
import {
  Table,
  Column,
  DataType,
  Index,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Model,
} from 'sequelize-typescript';

@Table({
  modelName: 'users',
  freezeTableName: true,
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  @Index
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  profilePicture: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pincode?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isDeleted: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(ROLE)),
    allowNull: true,
  })
  roleName: ROLE;

  @Column({
    allowNull: true,
  })
  createdBy: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  deletedBy: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    defaultValue: null,
    allowNull: true,
  })
  updatedBy?: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  declare updatedAt?: Date;

  @DeletedAt
  @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
  declare deletedAt?: Date;

  @BelongsTo(() => User, { foreignKey: 'createdBy', as: 'userCreator' })
  userCreator: User;

  @BelongsTo(() => User, { foreignKey: 'updatedBy', as: 'userUpdater' })
  userUpdater: User;

  @BelongsTo(() => User, { foreignKey: 'deletedBy', as: 'userDeleter' })
  userDeleter: User;
}
