import { ENV } from '@config';
import { CookieOptions } from 'express';
import * as moment from 'moment';

const ACCESS_TOKEN = 'kw-at-a';
const REFRESH_TOKEN = 'kw-at-r';

const accessTokenExpire = moment
  .duration(ENV.JWT.ACCESSTOKENTIME)
  .asMilliseconds();
const refresTokenExpire = moment
  .duration(ENV.JWT.REFRESHTOKENTIME)
  .asMilliseconds();
const cookiesConfig: CookieOptions = {
  secure: process.env.NODE_ENV === 'prod',
  httpOnly: true,
  signed: true,
  sameSite: true,
};

export {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  cookiesConfig,
  accessTokenExpire,
  refresTokenExpire,
}
