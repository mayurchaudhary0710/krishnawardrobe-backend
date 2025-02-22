import { DataTypes, QueryInterface } from "sequelize";

export const up = async ({ context }: { context: QueryInterface }) => {
  await context.createTable("offer_redeems", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    offerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "offers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
  await context.dropTable("offer_redeems");
};
