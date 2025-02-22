import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { ACCEPTED_FIELDS } from "@constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { handleError } from "@utils";
import { AuthGuard } from "@guards";
import * as crypto from "crypto";
import { CurrentUser } from "@decorators";
import { ICurrentUser } from "@dtos";
import { FastifyReply, FastifyRequest } from "fastify";
// @UseGuards(AuthGuard)
@Controller("files")
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) { }

  @Post("upload")
  //  @UseInterceptors(FileFieldsInterceptor(ACCEPTED_FIELDS))
  async uploadFile(
    @Req() req: FastifyRequest,
    @CurrentUser() currentUser: ICurrentUser,
    @Res() res: FastifyReply,
  ) {
    try {
      const file = await req.file();
      const uploadedField = file.fieldname;
      await this.fileService.uploadFile(file, uploadedField)
      res.status(HttpStatus.CREATED).send({
        success: true,
        status: HttpStatus.CREATED,
        data: "success",
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}
