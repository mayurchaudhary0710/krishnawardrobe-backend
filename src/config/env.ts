import { config } from 'dotenv';
import * as path from 'path';
function initConfig() {
  const env = process.env.NODE_ENV || 'dev'; 
  const envFile = env === 'prod' ? '.env' : `.env.${env}`;
  const envPath = path.resolve(process.cwd(), envFile); 

  console.log(`Loading environment variables from: ${envPath}`);
  config({ path: envPath });
}

initConfig();

const ENV = {
  PORT: Number(process.env.PORT ?? 4000),
  DB: {
    URL: process.env.DB_URL,
    DIALECT: process.env.DB_DIALECT,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },
  NODEMAILER: {
    FROM_NAME: process.env.NODEMAILER_FROM_NAME,
    HOST: process.env.NODEMAILER_HOST,
    PORT: process.env.NODEMAILER_PORT,
    SERVICE: process.env.NODEMAILER_SERVICE,
    AUTH: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS,
    },
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    ACCESSTOKENTIME: process.env.JWT_ACCESSTOKENTIME,
    REFRESHTOKENTIME: process.env.JWT_REFRESHACCESSTOKENTIME,
  },
  URLS: {
    ADMIN_PORTAL_URL: process.env.URLS_ADMIN_PORTAL_URL,
    ADMIN_PORTAL_RESET_PASSWORD_URL:
      process.env.ADMIN_PORTAL_RESET_PASSWORD_URL,
  },
  OTP_EXPIRES_IN_MINUTES: process.env.OTP_EXPIRES_IN_MINUTES,
  FORGOT_PASSWORD_EXPIRES_IN_MINUTES:
    process.env.FORGOT_PASSWORD_EXPIRES_IN_MINUTES,
  DEFAULT_TIMEZONE: process.env.DEFAULT_TIMEZONE,
  DATE_FORMAT: process.env.DATE_FORMAT,
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
  ORIGIN: process.env.ORIGIN,
  CRYPTO: {
    SECRET: process.env.CRYPTO_SECRET,
  },
  FIREBASE_ADMIN: {
    type: process.env.FIREBASE_ADMIN_TYPE,
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN,
  },
  COUNTRY_CODE: process.env.COUNTRY_CODE,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};

export { ENV };
