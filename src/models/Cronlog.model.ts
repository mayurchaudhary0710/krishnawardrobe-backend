// src/cron-log.model.ts
import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({ tableName: "cron_log", timestamps: true })
export class CronLog extends Model<CronLog> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    autoIncrement: true,
    defaultValue: DataType.UUIDV4,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cronName: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isSuccess: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  error: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
}
