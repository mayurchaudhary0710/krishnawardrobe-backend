import { User } from '@models';
import { Model } from 'sequelize-typescript';

const FILE_PATHS = {
  BASE_PATH: 'assets',
  PUBLIC: 'public',
  AVATAR: 'avatar',
  PRIVATE: 'private',
  ADMIN: 'admin',
  USER: 'user',
  LOGO: 'logo',
  PROFILE_PICTURE: 'profileImg',
  TEMP: 'temp',
};

const TEMP_ASSETS = [
  'profileImg',
  'logo',
  'fullLogo',
  'thumbnail',
  'file',

];

const ACCEPTED_FIELDS = [
  { name: 'profilePicture', maxCount: 1 },
  { name: 'logo', maxCount: 5 },
];

type FILE_UPLOAD_FIELDS = (typeof ACCEPTED_FIELDS)[number]['name'];

const ALLOWED_MIMETYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'audio/mpeg',
  'video/mp4',
  'audio/mp4',
  'application/pdf',
  'application/msword',
  'text/csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-excel', // .xls
];

export { FILE_PATHS, TEMP_ASSETS, ACCEPTED_FIELDS, ALLOWED_MIMETYPES };
