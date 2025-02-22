import { Module } from "@nestjs/common";
import { OffersController } from "./offer.controller";
import { OfferService } from "./offer.service";
import { OffersMobileController } from "./offer.mobile.controller";
import { OfferMobileService } from "./offer.mobile.service";

@Module({
  imports: [],
  controllers: [OffersController, OffersMobileController],
  providers: [OfferService, OfferMobileService],
})
export class OffersModule {}
