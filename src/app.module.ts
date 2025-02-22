import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DBModule, Modules } from "@modules";
import { MorganMiddleware } from "@nest-middlewares/morgan";
import * as fs from "fs";
import * as path from "path";
import { Request, Response } from "express";
import { ScheduleModule } from "@nestjs/schedule";
import { HttpModule } from "@nestjs/axios";
import { CronModule } from "./cron/cron.module";

@Module({
  imports: [
    DBModule,
    Modules,
    HttpModule,
    ScheduleModule.forRoot(),
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    const logDirectory = `${__dirname}/../logs`;
    fs.mkdirSync(logDirectory, { recursive: true });
    const logFilePath = path.join(
      logDirectory,
      `${new Date().toISOString().slice(0, 10)}.log`,
    );
    const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });
    MorganMiddleware.token("onerror", (req: Request, res: Response) => {
      return res.statusCode >= 400
        ? `Error : ${res.statusMessage}`
        : `Success : ${res.statusMessage}`;
    });
    MorganMiddleware.configure(
      "IP:remote-addr Time :date[iso] Method: :method URL: :url Status: :status Response Time: :response-time ms :onerror",
      {
        stream: accessLogStream,
      },
    );
    consumer.apply(MorganMiddleware).forRoutes("*");
  }
}
