import { Messages, OFFERSTATUS, OFFERTYPES } from '@constants';
import { OffersQueryParams } from '@dtos';
import { Offer, OfferRedeem } from '@models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from '@utils';
import { CreateOfferDTO, UpdateOfferDTO } from '@validators';
import moment from 'moment';
import sequelize, {
  and,
  cast,
  col,
  fn,
  literal,
  Op,
  Transaction,
  where,
} from 'sequelize';

@Injectable()
export class OfferService {
  constructor() {}

  async createOffer(offerData: CreateOfferDTO, transaction?: Transaction) {
    const {
      offerCode,
      startDate,
      endDate,
      usageLimit,
      maxUser,
      minPaymentValue,
      discountRate,
      discountType,
      maxDiscountValue,
      offerType,
      description,
      createdBy,
      showOnHome,
      noOfSession,
    } = offerData;
    const existingCodeOffer = await Offer.findOne({
      where: {
        offerCode,
      },
    });

    if (existingCodeOffer) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        Messages.alreadyExist(`Offer with offercode ${offerCode}`),
      );
    }

    const newOffer = new Offer({
      offerCode,
      startDate: startDate ? moment(startDate, 'DD/MM/YYYY').toDate() : null,
      endDate: endDate ? moment(endDate, 'DD/MM/YYYY').toDate() : null,
      usageLimit,
      maxUser,
      minPaymentValue,
      discountRate,
      discountType,
      maxDiscountValue,
      offerType,
      description,
      createdBy,
      showOnHome,
      offerStatus: OFFERSTATUS.ACTIVE,
      noOfSession,
    });
    await newOffer.save({ transaction });
    if (showOnHome) {
      await Offer.update(
        { showOnHome: false },
        {
          where: { showOnHome: true, [Op.not]: { id: newOffer.id } },
          transaction,
        },
      );
    }
    return newOffer;
  }

  async updateOffer(
    id: string,
    offerData: UpdateOfferDTO,
    transaction?: Transaction,
  ) {
    const {
      offerCode,
      startDate,
      endDate,
      usageLimit,
      maxUser,
      minPaymentValue,
      discountRate,
      discountType,
      maxDiscountValue,
      offerType,
      description,
      isActive,
      updatedBy,
      showOnHome,
      noOfSession,
      isDeleted,
    } = offerData;

    if (offerCode) {
      const existingCodeOffer = await Offer.findOne({
        where: {
          offerCode,
          [Op.not]: { id },
        },
      });
      if (existingCodeOffer) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          Messages.alreadyExist(`Offer with offercode ${offerCode}`),
        );
      }
    }

    await Offer.update(
      {
        offerCode,
        ...(startDate
          ? { startDate: moment(startDate, 'DD/MM/YYYY').toDate() }
          : {}),
        ...(endDate ? { endDate: moment(endDate, 'DD/MM/YYYY').toDate() } : {}),
        usageLimit,
        maxUser,
        minPaymentValue,
        discountRate,
        discountType,
        maxDiscountValue,
        offerType,
        description,
        isActive,
        updatedBy,
        noOfSession,
        showOnHome,
        isDeleted,
      },
      {
        where: {
          id,
        },
        transaction,
      },
    );
    if (showOnHome) {
      await Offer.update(
        { showOnHome: false },
        {
          where: { showOnHome: true, [Op.not]: { id } },
          transaction,
        },
      );
    }
  }

  async getSingleOffer(id: string) {
    const offer = await Offer.findOne({
      where: {
        id,
      },
    });
    if (!offer)
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        Messages.recordNotFound('Offer'),
      );
    return offer;
  }

  async getAllOffers(offerType: OFFERTYPES, queryParams?: OffersQueryParams) {
    const {
      pageNum = '1',
      pageLimit = '10',
      sortField = 'createdAt',
      sortOrder = 'DESC',
    } = queryParams;

    const { andQuery, orQuery } = this.getOffersConditions(queryParams);
    const page = parseInt(pageNum, 10);
    const limit = parseInt(pageLimit, 10);
    const offset = (page - 1) * limit;
    const where = {
      isDeleted: false,
      offerType,
    };
    if (orQuery.length) {
      Object.assign(where, { [Op.or]: orQuery });
    }
    if (andQuery.length) {
      Object.assign(where, { [Op.and]: andQuery });
    }
    const offers = await Offer.findAndCountAll({
      where,
      attributes: {
        include: [
          [
            literal(`
              (
               SELECT COUNT(*)
              FROM offer_redeems AS "offerRedeems"
              WHERE "offerRedeems"."offerId" = "Offer".ID
            )::INTEGER
            `),
            'redeemCount',
          ],
        ],
        exclude: [
          'deletedAt',
          'createdBy',
          'updatedBy',
          'deletedBy',
          'isDeleted',
        ],
      },
      limit,
      offset,
      order: [[sortField, sortOrder.toUpperCase()]],
    });

    return {
      data: offers.rows,
      totalRecords: offers.count,
      currentPage: page,
      totalPages: Math.ceil(Number(offers.count) / limit),
    };
  }

  private getOffersConditions(queryParams?: OffersQueryParams) {
    const {
      search,
      offerCode,
      description,
      validTill,
      noOfRedeemed,
      offerStatus,
      bundleValidDaysFrom,
      bundleValidDaysTo,
      id,
      noOfSession,
    } = queryParams;

    const orQuery: any[] = [];
    const andQuery: any[] = [];

    if (search) {
      orQuery.push(
        { offerCode: { [Op.iLike]: `%${search}%` } },
        { id: where(cast(col('id'), 'TEXT'), { [Op.iLike]: `%${search}%` }) },
        { description: { [Op.iLike]: `%${search}%` } },
        {
          endDate: where(cast(col('endDate'), 'TEXT'), {
            [Op.iLike]: `%${search}%`,
          }),
        },
        {
          status: where(cast(col('offerStatus'), 'TEXT'), {
            [Op.iLike]: `%${search}%`,
          }),
        },
        {
          noOfSession: where(cast(col('noOfSession'), 'TEXT'), {
            [Op.iLike]: `%${search}%`,
          }),
        },
        where(
          literal(` (
            SELECT COUNT(*)
           FROM offer_redeems AS "offerRedeems"
           WHERE "offerRedeems"."offerId" = "Offer".id
         )::TEXT`),
          { [Op.iLike]: `%${search}%` },
        ),
      );
    }
    if (offerCode) {
      andQuery.push({ offerCode: { [Op.iLike]: `%${offerCode}%` } });
    }

    if (description) {
      andQuery.push({ description: { [Op.iLike]: `%${description}%` } });
    }

    if (validTill) {
      andQuery.push({ endDate: { [Op.lte]: new Date(validTill) } });
    }

    if (noOfSession) {
      andQuery.push(
        where(cast(col('noOfSession'), 'TEXT'), {
          [Op.iLike]: `%${noOfSession}%`,
        }),
      );
    }

    if (noOfRedeemed) {
      andQuery.push(
        literal(` (
              SELECT COUNT(*)
             FROM offer_redeems AS "offerRedeems"
             WHERE "offerRedeems"."offerId" = "Offer".id
           )::INTEGER = ${noOfRedeemed}`),
      );
    }

    if (offerStatus !== undefined) {
      andQuery.push(
        where(cast(col('offerStatus'), 'TEXT'), {
          [Op.iLike]: `%${search}%`,
        }),
      );
    }

    if (id) {
      andQuery.push({
        id: where(cast(col('id'), 'TEXT'), { [Op.iLike]: `%${id}%` }),
      });
    }

    if (bundleValidDaysFrom !== undefined || bundleValidDaysTo !== undefined) {
      if (
        bundleValidDaysFrom !== undefined &&
        !Number.isNaN(Number(bundleValidDaysFrom))
      ) {
        andQuery.push({
          usageLimit: {
            [Op.gte]: Number(bundleValidDaysFrom),
          },
        });
      }
      if (
        bundleValidDaysTo !== undefined &&
        !Number.isNaN(Number(bundleValidDaysTo))
      ) {
        andQuery.push({
          usageLimit: {
            [Op.lte]: Number(bundleValidDaysTo),
          },
        });
      }
    }

    return { orQuery, andQuery };
  }
}
