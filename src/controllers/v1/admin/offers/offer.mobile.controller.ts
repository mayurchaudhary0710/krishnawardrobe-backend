import { AuthGuard, RolesGuard } from '@guards';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApplyOfferDTO, UpdateOfferDTO, updateOfferSchema } from '@validators';
import { CurrentUser } from '@decorators';
import { ICurrentUser, OffersQueryParams } from '@dtos';
import { Messages, OFFERTYPES, ROLE } from '@constants';
import { handleError } from '@utils';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { OfferMobileService } from './offer.mobile.service';
import { Response } from 'express';

@Controller('mobile/offers')
@UseGuards(AuthGuard)
export class OffersMobileController {
  constructor(
    private readonly offerService: OfferMobileService,
    @InjectConnection()
    private readonly _sequelize: Sequelize,
  ) { }

  @Get()
  async getCurrentOffers(
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ) {
    try {
      const offer = await this.offerService.getCurrentOffers(currentUser.id);
      res.status(HttpStatus.OK).json({
        success: true,
        data: offer,
        message: Messages.successMessage,
        status: HttpStatus.OK,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  @Post('apply')
  async applyOffer(
    @Body() { offerCode, bookingId }: ApplyOfferDTO,
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ) {
    const transaction = await this._sequelize.transaction();
    try {
      const offer = await this.offerService.applyOfferForBooking(
        {
          offerCode,
          bookingId,
          userId: currentUser.id,
        },
        transaction,
      );
      await transaction.commit();

      res.status(HttpStatus.OK).json({
        success: true,
        data: offer,
        message: Messages.successMessage,
        status: HttpStatus.OK,
      });
    } catch (error) {
      handleError(res, error, transaction);
    }
  }
}
