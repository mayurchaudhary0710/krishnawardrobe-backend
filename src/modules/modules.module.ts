import { AdminModule, FileModule } from '@controllers';
import { Global, Module } from '@nestjs/common';
import { CommonService } from '@utils';

@Global()
@Module({
  imports: [FileModule, AdminModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class Modules {}
