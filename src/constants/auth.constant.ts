import { ENV } from '@config';

const forgetPasswordUrl = (token: string) =>
  ENV.URLS.ADMIN_PORTAL_RESET_PASSWORD_URL + '?token=' + token;

export { forgetPasswordUrl };
