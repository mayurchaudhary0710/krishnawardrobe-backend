import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'system_settings',
  timestamps: false,
})
export class SystemSetting extends Model<SystemSetting> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
    allowNull: true,
  })
  largeLogo: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
    allowNull: true,
  })
  smallLogo: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
    allowNull: true,
  })
  faviconIcon: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
    allowNull: true,
  })
  homePageCarouselImages: string[]; // Store URLs or paths as a string array

  @Column({
    type: DataType.STRING,
    defaultValue: '',
    allowNull: true,
  })
  footerText: string;
}
