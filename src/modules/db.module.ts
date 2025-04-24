import { Module } from '@nestjs/common';
import * as allModels from '../models/index';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { ENV } from '@config';

const dialect = ENV.DB.DIALECT as Dialect;
console.log('dialect ', ENV.DB.DIALECT);
const host = ENV.DB.HOST;
const port = Number(ENV.DB.PORT);
const username = ENV.DB.USERNAME;
const password = ENV.DB.PASSWORD;
const database = ENV.DB.DATABASE;

@Module({
  imports: [
    SequelizeModule.forRoot({
      // uri: DB_URL,
      dialect,
      host,
      port,
      username,
      password,
      database,
      // autoLoadModels: true,
      ssl: false,
      sync: {
        // alter: true,
        // force:true
      },
      pool: {
        max: 10,
        idle: 10000,
      },
      logging: process.env.NODE_ENV === 'dev',
      models: [
        allModels.SecurityTokens,
        allModels.User,
        allModels.Offer,
        allModels.OfferRedeem,
        allModels.CronLog,
        allModels.Policy,
        allModels.SystemSetting,
        allModels.Category,
      ],
    }),
  ],
})
export class DBModule {}
