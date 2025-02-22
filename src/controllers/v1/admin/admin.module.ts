import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { OffersModule } from "./offers/offers.module";
import { UsersModule } from "./users/users.module";
@Module({
  imports: [AuthModule, UsersModule, OffersModule],
  controllers: [],
  providers: [],
})
export class AdminModule { }
