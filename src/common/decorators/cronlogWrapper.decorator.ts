// src/cron.decorator.ts
import { Cron, CronOptions } from "@nestjs/schedule";
import { CronLog } from "@models";
import { InjectModel } from "@nestjs/sequelize";
import { ModuleRef } from "@nestjs/core";
import { ModelStatic, Model } from "sequelize-typescript";
import { Sequelize } from "sequelize";
export function CronWrapper(
  cronName: string,
  options?: CronOptions & { cronExpression: string },
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        console.log(`
          ==================================================================================
                    Cron job ${cronName} started at ${new Date().toISOString()}
          ==================================================================================
          `);
        await originalMethod.apply(this, args);

        await CronLog.create({
          cronName,
          isSuccess: true,
        });
      } catch (error) {
        console.log(`
          ==================================================================================
                    Cron job ${cronName} failed: ${error.message}
          ==================================================================================
          `);
        await CronLog.create({
          cronName,
          isSuccess: false,
          error: error.message,
        });
      }
    };

    Cron(options.cronExpression)(target, propertyKey, descriptor);
  };
}
