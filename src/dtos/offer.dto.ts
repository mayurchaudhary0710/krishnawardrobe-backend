import { BaseQueryParamsDTO } from './common.dtos';

export interface OffersQueryParams extends BaseQueryParamsDTO {
  offerCode?: string;
  description?: string;
  validTill?: string;
  noOfRedeemed?: number;
  offerStatus?: string;
  bundleValidDaysFrom?: string;
  bundleValidDaysTo?: string;
  id?: string;
  noOfSession?: number;
}

export interface ICheckOfferValidityDTO {
  offerId?: string;
  userId: string;
  offerCode?: string;
  priceForClient?: number;
}

export interface IApplyOfferBookingDTO {
  bookingId: string;
  offerCode: string;
  userId: string;
}
