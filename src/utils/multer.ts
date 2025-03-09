import { ALLOWED_MIMETYPES, TEMP_ASSETS } from '@constants';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
// const s3 = new S3Client(config.get('S3'));

// Define the base path for storing uploaded files.
const UPLOADS_PATH = `assets/public`;
const TEMP_UPLOADS_PATH = `assets/public/temp`;

// Maximum file size in megabytes and its equivalent in bytes.
const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const UPLOAD_FOLDER = join(__dirname, '../../../public');

// Function to generate a dynamic upload path based on a subfolder.
const generateDynamicUploadPath = async (subfolder) => {
  try {
    const uploadDir = TEMP_ASSETS.includes(subfolder)
      ? TEMP_UPLOADS_PATH
      : UPLOADS_PATH;
    return uploadDir + '/' + subfolder;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw new Error('Failed to create upload directory.');
  }
};

// Set up and configure Multer instance.
// export const multerInstance = {
//   limits: { fileSize: MAX_FILE_SIZE_BYTES },
//   fileFilter(req, file, cb) {
//     if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(
//         new BadRequestException(
//           'Invalid file type. Only image and document files are allowed.',
//         ),
//         false,
//       );
//     }
//   },
// storage: multerS3({
//   s3,
//   bucket: config.get('S3.BUCKET_NAME'),
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   key: async (req, file, cb) => {
//     file.filename = Date.now() + '-' + file.originalname;
//     const s3Key = file.fieldname
//       ? (await generateDynamicUploadPath(file.fieldname)) +
//         '/' +
//         file.filename
//       : file.filename;
//     cb(null, s3Key);
//   },
// }),
// };

export const multerInstance = {
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter(req, file, cb) {
    if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException(
          'Invalid file type. Only image and document files are allowed.',
        ),
        false,
      );
    }
  },
  // storage: multerS3({
  //   s3,
  //   bucket: config.get('S3.BUCKET_NAME'),
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   key: async (req, file, cb) => {
  //     file.filename = Date.now() + '-' + file.originalname;
  //     const s3Key = file.fieldname
  //       ? (await generateDynamicUploadPath(file.fieldname)) +
  //         '/' +
  //         file.filename
  //       : file.filename;
  //     cb(null, s3Key);
  //   },
  // }),
  storage: diskStorage({
    destination: UPLOAD_FOLDER,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `${uniqueSuffix}${extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
};
