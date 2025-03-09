import { FILE_PATHS, statusCodes, TEMP_ASSETS } from '@constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError, UPLOAD_FOLDER } from '@utils';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
type FileMoves = Record<string, any>;
@Injectable()
export class FileService {
  constructor() { }

  async uploadFile(file: Express.Multer.File, FOLDER_NAME: string) {
    if (!file)
      throw new CustomError(HttpStatus.BAD_REQUEST, 'No file uploaded');

    const uploadDir = path.join(UPLOAD_FOLDER, FOLDER_NAME);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueId = crypto.randomBytes(16).toString('hex');
    const filename = `${uniqueId}-${file.filename}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, file.buffer);

    const relativeFilePath = `/public/${FOLDER_NAME}/${filename}`;
    return relativeFilePath;
  }
}
