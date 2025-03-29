import { Messages, ROLE, statusCodes, USERSTATUS } from '@constants';
import { EmailDTO, IUserToken, SendOTPDTO, Tokens, VerifyOTP } from '@dtos';
import { SecurityTokens, User } from '@models';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  generateOTP,
  CustomError,
  createTokens,
  jwtTokenVerifier,
  comparePassword,
  encryptData,
  emailSender,
  decryptData,
  hashGenerator,
} from '@utils';
import moment from 'moment';
import { ENV } from '@config';
import { Response } from 'express';
import {
  ACCESS_TOKEN,
  accessTokenExpire,
  cookiesConfig,
  REFRESH_TOKEN,
  refresTokenExpire,
} from '@constants';
import { IAdminLoginDTO } from '@validators';
import { forgetPasswordUrl } from 'src/constants/auth.constant';

@Injectable()
export class AuthService {
  private forgetPasswordMinutes = ENV.FORGOT_PASSWORD_EXPIRES_IN_MINUTES ?? 10;
  private maxResetPasswordRequest = 3;
  constructor() {}
  async verifyAdminAndLogin({ email, password }: IAdminLoginDTO) {
    const user = await User.findOne({
      where: {
        isDeleted: false,
        roleName: ROLE.ADMIN,
        email,
      },
    });
    if (!user) {
      throw new CustomError(HttpStatus.BAD_REQUEST, Messages.userNotFound);
    }

    //TODO: add active user check

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        Messages.invalidCredentials,
      );
    }

    const token = await createTokens({
      id: user.id,
      email: user?.email || '',
      roleName: user.roleName,
      phoneNumber: user.phoneNumber,
    });
    const userData = {
      id: user.id,
      email: user?.email || '',
      roleName: user.roleName,
      name: user.name,
    };
    return { token, userData };
  }

  getActiveUser(id: string) {
    return User.findOne({
      where: {
        id,
        isDeleted: false,
        isActive: true,
      },
    });
  }

  async getRefreshTokens(refreshToken: string) {
    const { payload } = await jwtTokenVerifier(refreshToken);

    if (!payload) {
      throw new CustomError(HttpStatus.BAD_REQUEST, Messages.invalidToken);
    }

    const { user }: { user: IUserToken } = payload;
    if (!user) {
      throw new CustomError(HttpStatus.BAD_REQUEST, Messages.invalidToken);
    }

    const dbUser = await User.findOne({
      where: {
        id: user.id,
        isDeleted: false,
        isActive: true,
      },
    });

    if (!dbUser) {
      throw new CustomError(HttpStatus.BAD_REQUEST, Messages.userNotFound);
    }

    const token = await createTokens({
      id: dbUser.id,
      email: dbUser?.email || '',
      roleName: dbUser.roleName,
      phoneNumber: dbUser.phoneNumber,
    });

    return token;
  }

  async setCookiesToken(res: Response, tokens: Tokens) {
    res
      .cookie(ACCESS_TOKEN, tokens.accessToken, {
        ...cookiesConfig,
        maxAge: accessTokenExpire,
      })
      .cookie(REFRESH_TOKEN, tokens.refreshToken, {
        ...cookiesConfig,
        maxAge: refresTokenExpire,
      });
  }

  async requestResetPassword(email: string) {
    const user = await User.findOne({
      where: { email, isActive: true, isDeleted: false },
    });
    if (!user) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        Messages.recordNotFound('User'),
      );
    }

    let token: string = '';
    const tokenExpireTime = moment()
      .add(this.forgetPasswordMinutes, 'm')
      .toDate();
    token = encryptData(
      {
        userId: user.id,
      },
      this.forgetPasswordMinutes + 'm',
    );

    const securityToken = new SecurityTokens({
      userId: user.id,
      expiresAt: tokenExpireTime,
      count: 1,
      token,
    });
    await securityToken.save();
    const link = forgetPasswordUrl(token);
    const emailData: EmailDTO = {
      to: [user.email],
      content: {
        html: `here is password reset link : ${link}`,
        subject: `Reset your password`,
      },
    };
    emailSender(emailData);
  }

  async verifyResetPasswordToken(token: string, password: string) {
    const data = decryptData<{ userId: string }>(token);
    if (!data) {
      throw new CustomError(HttpStatus.BAD_REQUEST, Messages.linkExpired);
    }

    await this.modifyPassword(data.userId, password);
    await SecurityTokens.destroy({
      where: {
        userId: data.userId,
      },
      force: true,
    });
  }

  async modifyPassword(userId: string, password: string, updatedBy?: string) {
    const user = await User.findByPk(userId);
    user.password = await hashGenerator(password);
    user.updatedBy = updatedBy ?? userId;
    user.save();
    return user;
  }
}
