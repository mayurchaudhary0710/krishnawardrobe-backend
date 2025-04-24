import {
  Controller,
  Get,
  Body,
  Res,
  Put,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SyetemsettingsService } from './syetemsettings.service';
import { handleError } from '@utils';
import { Response } from 'express';
import { ZodValidationPipe } from '@pipes';
import { UpdateSystemSettingDto, updateSystemSettingSchema } from '@validators';
import { Messages, ROLE } from '@constants';
import { AuthGuard, RolesGuard } from '@guards';

@Controller('syetem-settings')
export class SyetemsettingsController {
  constructor(private readonly syetemsettingsService: SyetemsettingsService) {}

  @Get()
  async findOne(@Res() res: Response) {
    try {
      const data = await this.syetemsettingsService.getSytemSettings();
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.successMessage,
        data,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  @Put()
  @UseGuards(AuthGuard, new RolesGuard([ROLE.ADMIN]))
  async update(
    @Res() res: Response,
    @Body(new ZodValidationPipe(updateSystemSettingSchema))
    settings: UpdateSystemSettingDto,
  ) {
    try {
      const data =
        await this.syetemsettingsService.updateOrCreateSettings(settings);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.successMessage,
        data,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}
