import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomError, handleError } from '@utils';
import { Tokens } from '@dtos';
import { Response } from 'express';
import { ZodValidationPipe } from '@pipes';
import { Messages } from '@constants';
import {
  adminAuthValidator,
  IAdminLoginDTO,
  IPasswordResetDTO,
  passwordResetValidator,
  refreshTokensValidator,
} from '@validators';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/constants/cookies.constants';
import { ENV } from '@config';
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async verifyOtp(
    @Body(new ZodValidationPipe(adminAuthValidator))
    loginData: IAdminLoginDTO,
    @Res() res: Response,
  ) {
    try {
      const loginResponse =
        await this.authService.verifyAdminAndLogin(loginData);

      this.authService.setCookiesToken(res, loginResponse.token);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.loginSuccessMessage,
        data: loginResponse,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  @Post('/refresh')
  @UsePipes(new ZodValidationPipe(refreshTokensValidator))
  async refreshTokens(
    @Body()
    tokens: Tokens,
    @Res() res: Response,
  ) {
    try {
      const { refreshToken } = tokens;
      const refreshTokenData =
        await this.authService.getRefreshTokens(refreshToken);

      this.authService.setCookiesToken(res, refreshTokenData);

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.successMessage,
        data: refreshTokenData,
      });
    } catch (error) {
      console.log("error Controller ", error)
      handleError(res, error);
    }
  }
  @Post('/logout')
  async logout(@Res() res: Response) {
    try {
      res
        .clearCookie(ACCESS_TOKEN)
        .clearCookie(REFRESH_TOKEN)
        .status(HttpStatus.OK)
        .redirect(HttpStatus.OK, ENV.URLS.ADMIN_PORTAL_URL!);
    } catch (error) {
      handleError(res, error);
    }
  }

  @Post('/request-password-reset')
  async requestPasswordReset(
    @Body('email') email: string,
    @Res() res: Response,
  ) {
    try {
      if (!email) {
        throw new CustomError(
          HttpStatus.BAD_REQUEST,
          Messages.isRequired('Email'),
        );
      }
      await this.authService.requestResetPassword(email);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.resetLinkSuccessFull,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
  @Post('/password-reset')
  async passwordReset(
    @Body(new ZodValidationPipe(passwordResetValidator))
    { token, password }: IPasswordResetDTO,
    @Res() res: Response,
  ) {
    try {
      await this.authService.verifyResetPasswordToken(token, password);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.resetSuccessful,
        data: null,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}
