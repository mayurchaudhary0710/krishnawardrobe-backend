import { DataTypes, QueryInterface } from 'sequelize';

export const up = async ({ context }: { context: QueryInterface }) => {
  await context.createTable('system_settings', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    largeLogo: {
      type: DataTypes.STRING,
      allowNull: true, // Set as per your requirement
    },
    smallLogo: {
      type: DataTypes.STRING,
      allowNull: true, // Set as per your requirement
    },
    faviconIcon: {
      type: DataTypes.STRING,
      allowNull: true, // Set as per your requirement
    },
    homePageCarouselImages: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Consider using a JSON or text array if needed
      allowNull: true,
    },
    footerText: {
      type: DataTypes.STRING,
      allowNull: true, // Set as per your requirement
    },
  });
};

export const down = async ({ context }: { context: QueryInterface }) => {
  await context.dropTable('system_settings');
};
