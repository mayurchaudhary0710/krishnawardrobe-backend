import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
  AllowNull,
} from 'sequelize-typescript';

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model<Category> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
  })
  categoryNumber!: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  categoryName!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted!: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW, allowNull: true })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW, allowNull: true })
  updatedAt: Date;
}
