import { QueryInterface, DataTypes } from 'sequelize';

export const up = async ({ context }: { context: QueryInterface }) => {
  await context.createTable('policies', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    policyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down = async ({ context }: { context: QueryInterface }) => {
  await context.dropTable('policies');
};
