// import { ROLES } from '@constants';
import { AuditFieldsDTO, BaseQueryParamsDTO } from "./common.dtos";
import {
  GENDER,
  REALTIONSTATUS,
  ROLE,
  USERSTATUS,
  WORKSTATUS,
} from "@constants";
export interface UserDTO extends AuditFieldsDTO {
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hash?: string;
  birthDate: Date;
  zipCode: string;
  specializationId: string;
  workArea: string;
  city: string;
  houseNumber: string;
  street: string;
  userSFId: string;
  sfContactId: string;
  businessId?: string;
  isProfessional?: boolean;
  agreeToMarketingContent?: boolean;
  appVersion?: string;
  loginDevice?: string;
  point?: number;
  profilePicture?: string;
  speciality?: string;
  workAreaName?: string;
  jwtTokendata?: IUserToken;
  pushNotificationToken?: string;
  lastSeen?: string;
  otp: string;
  isVerifiedOtp?: boolean;
  otpCreatedAt?: Date;
  roleName: string;
  gender: GENDER;
  realtionStatus: REALTIONSTATUS;
  provider: string;
  workStatus: WORKSTATUS;
}

export interface IUserToken {
  id: string;
  email?: string;
  roleName: string;
  phoneNumber: string;
}

export class SendOTPDTO {
  phoneNumber: string;
  deviceToken?: string;
}

export class VerifyOTP {
  phoneNumber: string;
  id?: string;
  otp: string;
}

export class UserLoginDTO {
  phone: string;
  email: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Payload {
  exp: number;
  iat: number;
  iss: string;
  user: UserDTO;
  _id: string;
}

export interface IOTP {
  userId?: string;
  otp: string;
  phoneNumber: string;
  email?: string;
  role?: string;
}

export interface UserParamDTO extends AuditFieldsDTO {
  phoneNumber?: string;
  email?: string;
  role?: string;
}

export interface UserQueryParamDTO extends BaseQueryParamsDTO {
  phoneNumber?: string;
  email?: string;
  role?: string;
}

export class ModifyPasswordDTO {
  token: string;
  password: string;
  userId: string;
  oldPassword: string;
  isResetLink: boolean;
}

export class UserOTPsDTO {
  userId: string;
  businessId: string;
  otp: string;
  isUsed: boolean;
}

export interface SFUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  speciality: string;
  specializationId: string;
  workAreaName: string;
  workArea: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  agreeToMarketingContent: boolean;
}

export interface ICurrentUser {
  id: string;
  roleName: ROLE;
  isAdmin: boolean;
  isTherapist: boolean;
  isUser: boolean;
}

export interface IUpdateUserProfileDTO {
  firstName?: string;
  profilePicture?: string;
  gender?: GENDER;
  birthDate?: string | Date;
  realtionStatus?: REALTIONSTATUS;
  updatedBy?: string;
  loginDevice?: string;
  appVersion?: string;
  workStatus?: WORKSTATUS;
  isProfileSetup?: boolean;
}

export interface ISocialMediaDTO {
  email: string;
  firstName: string;
  lastName: string;
  deviceToken?: string;
  loginToken?: string;
  appVersion?: string;
  provider?: string;
}

export interface MathmakingQueryParamsDTO extends BaseQueryParamsDTO {
  availabilityOnWeekends?: string[];
  therapistAge?: {
    from?: string;
    to?: string;
  };
  yearsOfExperience?: {
    from?: string;
    to?: string;
  };
}
