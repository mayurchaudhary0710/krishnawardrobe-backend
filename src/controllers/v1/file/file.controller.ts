import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ACCEPTED_FIELDS } from '@constants';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { handleError } from '@utils';
import { AuthGuard } from '@guards';
import * as crypto from 'crypto';
import { CurrentUser } from '@decorators';
import { ICurrentUser } from '@dtos';
import { Response, Request } from 'express';
import path from 'path';
@UseGuards(AuthGuard)
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor(ACCEPTED_FIELDS))
  async uploadFile(
    @Req() req: Request,
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: Response,
  ) {
    try {
      const file = req.files;
      const uploadedField = Object.keys(req.files)[0];
      const uploadedFile = file[uploadedField][0];

      const uniqueId = crypto.randomBytes(16).toString('hex');
      const ext = path.extname(uploadedFile.originalname);
      const filename = `${uniqueId}-${new Date().getTime()}${ext}`;
      await this.fileService.uploadFile(uploadedFile, uploadedField);
      res.status(HttpStatus.CREATED).json({
        success: true,
        status: HttpStatus.CREATED,
        data: 'success',
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}
