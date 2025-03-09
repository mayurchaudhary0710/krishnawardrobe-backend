import { Messages, OFFERSTATUS, OFFERTYPES, SESSIONTYPE } from '@constants';
import { Offer, OfferRedeem } from '@models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError, ifNull } from '@utils';
import moment from 'moment';
import {
  and,
  cast,
  col,
  fn,
  literal,
  Op,
  Sequelize,
  Transaction,
  where,
} from 'sequelize';

@Injectable()
export class OfferMobileService {
  constructor() {}

  async getCurrentOffers(userId: string) {
    const todayDate = moment().format('YYYY-MM-DD');
    const offers = await Offer.findAll({
      where: {
        offerStatus: OFFERSTATUS.ACTIVE,
        offerType: {
          [Op.in]: [OFFERTYPES.BUNDLE, OFFERTYPES.OFFER],
        },
        isActive: true,
        showOnHome: true,
        isDeleted: false,
        startDate: {
          [Op.lte]: moment(todayDate).toDate(),
        },
        endDate: {
          [Op.gte]: moment(todayDate).toDate(),
        },
      },
      include: [
        {
          model: OfferRedeem,
          as: 'offerRedeems',
          required: false,
          attributes: [],
        },
      ],
      attributes: [
        'id',
        'discountRate',
        'offerType',
        'maxDiscountValue',
        'minPaymentValue',
        'maxUser',
        'usageLimit',
        'offerCode',
        ifNull('noOfSession', 0),
        ifNull('maxDiscountValue', 0),
        ifNull('minPaymentValue', 0),
        ifNull('description', ''),
        // [
        //   cast(fn('COUNT', col('offerRedeems.id')), 'INTEGER'),
        //   'totalRedeemCount',
        // ],
        // [
        //   cast(
        //     fn(
        //       'SUM',
        //       literal(
        //         `CASE WHEN "offerRedeems"."userId" = '${userId}' THEN 1 ELSE 0 END`,
        //       ),
        //     ),
        //     'INTEGER',
        //   ),
        //   'userRedeemCount',
        // ],
      ],
      group: ['Offer.id', 'Offer.maxUser', 'Offer.usageLimit'],
      having: and(
        where(
          cast(
            fn(
              'SUM',
              literal(
                `CASE WHEN "offerRedeems"."userId" = '${userId}' THEN 1 ELSE 0 END`,
              ),
            ),
            'INTEGER',
          ),
          '<',
          col('maxUser'),
        ),
        where(
          cast(fn('COUNT', col('offerRedeems.id')), 'INTEGER'),
          '<',
          col('usageLimit'),
        ),
      ),
    });

    return offers;
  }

  async applyOfferForBooking(
    { bookingId, offerCode, userId }: any,
    transaction?: Transaction,
  ) {
    const validOffer = await this.checkOfferValidity({
      offerCode,
      userId,
      priceForClient: 0,
    });

    const addedRedeemCount = await OfferRedeem.create(
      {
        offerId: validOffer.id,
        userId,
      },
      { transaction },
    );

    //TODO: need to add in payment and transaction history for booking coupens
  }

  async checkOfferValidity({
    offerCode,
    offerId,
    userId,
    priceForClient,
  }: any) {
    const orCondition: any[] = [];
    if (offerId) {
      orCondition.push({
        id: offerId,
      });
    }
    if (offerCode) {
      orCondition.push({
        offerCode,
      });
    }
    const offer = await Offer.findOne({
      where: {
        [Op.or]: orCondition,
      },
      include: [
        {
          model: OfferRedeem,
          as: 'offerRedeems',
          where: {
            userId,
          },
          required: false,
        },
      ],
    });
    const todayFormatedDate = moment().format('YYYY-MM-DD');
    const todaysDate = moment(todayFormatedDate);
    if (offerCode && offer.offerCode !== offerCode) {
      throw new CustomError(HttpStatus.BAD_REQUEST, Messages.invalidOfferCode);
    }

    if (offer?.startDate) {
      const offerStart = moment(offer.startDate).startOf('day');
      if (todaysDate.isBefore(offerStart)) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          Messages.offerCodeExpired,
        );
      }
    }

    if (offer?.endDate) {
      const offerEnd = moment(offer.endDate).endOf('day');
      if (todaysDate.isAfter(offerEnd)) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          Messages.offerCodeExpired,
        );
      }
    }

    if (
      priceForClient &&
      offer?.minPaymentValue &&
      offer?.minPaymentValue > priceForClient
    ) {
      throw new CustomError(HttpStatus.CONFLICT, Messages.minimumPaymentValue);
    }

    if (offer?.usageLimit > 0) {
      const redeemedCount = await OfferRedeem.count({
        where: {
          offerId: offer.id,
        },
      });

      if (redeemedCount >= offer.usageLimit) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          Messages.offerUsageLimitReached,
        );
      }
    }
    if (offer?.maxUser > 0) {
      const redeemedCount = await OfferRedeem.count({
        where: {
          offerId: offer.id,
          userId,
        },
      });

      if (redeemedCount >= offer.maxUser) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          Messages.offerUsageLimitReached,
        );
      }
    }
    return offer;
  }
}
