import { Module } from '@nestjs/common';
import { SyetemsettingsService } from './syetemsettings.service';
import { SyetemsettingsController } from './syetemsettings.controller';

@Module({
  controllers: [SyetemsettingsController],
  providers: [SyetemsettingsService],
})
export class SyetemsettingsModule {}
