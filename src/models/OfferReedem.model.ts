import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Offer } from './Offer.model';
import { User } from './User.model';

@Table({
  tableName: 'offer_redeems',
  timestamps: true,
})
export class OfferRedeem extends Model<OfferRedeem> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Offer)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  offerId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => Offer, {
    foreignKey: 'offerId',
    as: 'offer',
  })
  offer: Offer;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    as: 'user',
  })
  user: User;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
