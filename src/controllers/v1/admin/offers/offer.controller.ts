import { AuthGuard, RolesGuard } from '@guards';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import {
  CreateOfferDTO,
  createOfferSchema,
  UpdateOfferDTO,
  updateOfferSchema,
} from '@validators';
import { ZodValidationPipe } from '@pipes';
import { CurrentUser } from '@decorators';
import { ICurrentUser, OffersQueryParams } from '@dtos';
import { Messages, OFFERTYPES, ROLE } from '@constants';
import { handleError } from '@utils';
import { Response } from 'express';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Controller('offers')
@UseGuards(AuthGuard, new RolesGuard([ROLE.ADMIN]))
export class OffersController {
  constructor(
    private readonly offerService: OfferService,
    @InjectConnection()
    private readonly _sequelize: Sequelize,
  ) {}

  @Post()
  async createOffer(
    @Body(new ZodValidationPipe(createOfferSchema)) offerData: CreateOfferDTO,
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ) {
    const transaction = await this._sequelize.transaction();
    try {
      offerData.createdBy = currentUser.id;
      const offer = await this.offerService.createOffer(offerData, transaction);
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

  @Put(':id')
  async updateOffer(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateOfferSchema)) offerData: UpdateOfferDTO,
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ) {
    const transaction = await this._sequelize.transaction();
    try {
      offerData.updatedBy = currentUser.id;
      await this.offerService.updateOffer(id, offerData, transaction);
      await transaction.commit();
      const offer = await this.offerService.getSingleOffer(id);
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
  @Get('')
  async getOffers(
    @Query() queryParams: OffersQueryParams,
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ) {
    try {
      const offer = await this.offerService.getAllOffers(
        OFFERTYPES.OFFER,
        queryParams,
      );
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

  @Get('bundles')
  async getBundles(
    @Query() queryParams: OffersQueryParams,
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ) {
    try {
      const offer = await this.offerService.getAllOffers(
        OFFERTYPES.BUNDLE,
        queryParams,
      );
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
  @Get(':id')
  async getOffer(
    @Param('id') id: string,
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ) {
    try {
      const offer = await this.offerService.getSingleOffer(id);
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
}
