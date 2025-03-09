import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { DBModule } from '@modules';
import { CronController } from './cron.controller';

@Module({
  controllers: [CronController],
  imports: [DBModule],
  providers: [CronService],
})
export class CronModule {}
