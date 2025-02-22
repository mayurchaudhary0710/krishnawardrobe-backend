import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from "sequelize-typescript";
import { OfferRedeem } from "./OfferReedem.model";
import { User } from "./User.model";
import { OFFERDISCOUNTTYPES, OFFERSTATUS, OFFERTYPES } from "@constants";

@Table({
  tableName: "offers",
  timestamps: true,
})
export class Offer extends Model<Offer> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ENUM(...Object.values(OFFERSTATUS)),
    allowNull: true,
  })
  offerStatus?: OFFERSTATUS;

  @Column({
    type: DataType.ENUM(...Object.values(OFFERTYPES)),
    allowNull: false,
  })
  offerType: OFFERTYPES;

  @Column({
    type: DataType.ENUM(...Object.values(OFFERDISCOUNTTYPES)),
    allowNull: false,
  })
  discountType: OFFERDISCOUNTTYPES;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  discountRate: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  maxDiscountValue: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  minPaymentValue: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  maxUser: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  usageLimit: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  noOfSession?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  offerCode: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  endDate: Date;

  @Default("")
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  showOnHome: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  createdBy: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  updatedBy: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isDeleted: boolean;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  deletedBy: string;

  @BelongsTo(() => User, { foreignKey: "createdBy", as: "offerCreator" })
  offerCreator: User;

  @BelongsTo(() => User, { foreignKey: "updatedBy", as: "offerUpdater" })
  offerUpdater: User;

  @BelongsTo(() => User, { foreignKey: "deletedBy", as: "offerDeleter" })
  offerDeleter: User;

  @HasMany(() => OfferRedeem, { foreignKey: "offerId", as: "offerRedeems" })
  offerRedeems: OfferRedeem[];
}
