import { OFFERDISCOUNTTYPES, OFFERSTATUS, OFFERTYPES } from '../constants/enums';
import { DataTypes, QueryInterface } from 'sequelize';

export const up = async ({ context }: { context: QueryInterface }) => {
  await context.createTable('offers', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    offerStatus: {
      type: DataTypes.ENUM(...Object.values(OFFERSTATUS)),
      allowNull: true,
    },
    offerType: {
      type: DataTypes.ENUM(...Object.values(OFFERTYPES)),
      allowNull: false,
    },
    discountType: {
      type: DataTypes.ENUM(...Object.values(OFFERDISCOUNTTYPES)),
      allowNull: false,
    },
    discountRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    maxDiscountValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    minPaymentValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    maxUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    noOfSession: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usageLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    offerCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    showOnHome: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down = async ({ context }: { context: QueryInterface }) => {
  await context.dropTable('offers');
};
