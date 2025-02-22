import { CronWrapper } from "@decorators";
import {
  CronLog,
} from "@models";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectConnection } from "@nestjs/sequelize";
import * as moment from "moment";
import { Op, Sequelize } from "sequelize";

@Injectable()
export class CronService {
  constructor(
    @InjectConnection()
    private readonly _sequelize: Sequelize,
  ) { }

  @Cron("0 0 1 * *") // Runs every moneth 1st day at 00:00
  async deleteOldRecordsCron() {
    {
      const transaction = await this._sequelize.transaction();
      try {
        const threeMonthsAgo = moment().subtract(3, "months").startOf("month");

        console.log(
          `Deleting records older than: ${threeMonthsAgo.format("YYYY-MM-DD")}`,
        );

        await CronLog.destroy({
          where: {
            createdAt: { [Op.lt]: threeMonthsAgo.toDate() },
          },
          force: true,
          transaction,
        });

        await transaction.commit();
        console.log("Old cron logs deleted successfully");
      } catch (error) {
        await transaction.rollback();
        console.error("Error deleting old cron logs:", error);
        throw error;
      }
    }
  }

}
