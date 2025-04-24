import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { SyetemsettingsModule } from './syetemsettings/syetemsettings.module';
import { PolicyModule } from './policy/policy.module';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    OffersModule,
    SyetemsettingsModule,
    PolicyModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AdminModule {}
