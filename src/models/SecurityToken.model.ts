import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './User.model';
import { ENV } from '@config';

const OTP_EXPIRES_IN_MINUTES = Number(ENV.OTP_EXPIRES_IN_MINUTES) ?? 10;

@Table({
  tableName: 'security_tokens',
  timestamps: true,
})
export class SecurityTokens extends Model<SecurityTokens> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: null,
  })
  userId?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: () =>
      new Date().setMinutes(new Date().getMinutes() + OTP_EXPIRES_IN_MINUTES),
  })
  expiresAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  token: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  count: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  //relations

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'tokenUser' })
  user: User;
}
