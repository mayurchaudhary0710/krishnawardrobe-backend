import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule, Modules } from '@modules';
import * as fs from 'fs';
import * as path from 'path';
import * as morgan from 'morgan';
import { Request, Response } from 'express';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { CronModule } from './cron/cron.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(),'public'),
      serveRoot: '/public',
    }),
    MulterModule.register({
      dest: '../uploads',
    }),
    DBModule,
    Modules,
    HttpModule,
    ScheduleModule.forRoot(),
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const logDirectory = path.join(process.cwd(), 'logs');
    fs.mkdirSync(logDirectory, { recursive: true });

    const logFilePath = path.join(
      logDirectory,
      `${new Date().toISOString().slice(0, 10)}.log`,
    );
    const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    // Custom Morgan Token
    morgan.token('onerror', (req: Request, res: Response) => {
      return res.statusCode >= 400
        ? `Error: ${res.statusMessage}`
        : `Success: ${res.statusMessage}`;
    });

    const morganFormat =
      'IP: :remote-addr Time: :date[iso] Method: :method URL: :url Status: :status Response Time: :response-time ms :onerror';

    consumer
      .apply(morgan(morganFormat, { stream: accessLogStream }))
      .forRoutes('*');
  }
}
