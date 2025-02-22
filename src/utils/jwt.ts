import { EncryptJWT, jwtDecrypt } from "jose";
import { type Tokens, type UserParamDTO, IUserToken } from "@dtos";
import { Messages, statusCodes } from "@constants";
import { ENV } from "@config";

// Assuming ENV is already defined and populated
const code: string = ENV.JWT.SECRET; // Use ENV to access the secret
const encHeader = { alg: "dir", enc: "A256GCM" };

export const createTokens = async (user: IUserToken): Promise<Tokens> => {
  const expiryTime: string = ENV.JWT.ACCESSTOKENTIME ?? "10m"; // Use ENV to access the expiration time
  const refreshTime: string = ENV.JWT.REFRESHTOKENTIME ?? "1d"; // Use ENV to access the refresh token time
  const secret = new TextEncoder().encode(code);

  const token = new EncryptJWT({ user })
    .setProtectedHeader(encHeader)
    .setIssuedAt()
    .setIssuer(user.id.toString());

  const accessToken: string = await token
    .setExpirationTime(expiryTime)
    .encrypt(secret);
  const refreshToken: string = await token
    .setExpirationTime(refreshTime)
    .encrypt(secret);

  return { accessToken, refreshToken };
};

export const jwtTokenVerifier = async (token: string): Promise<any> => {
  try {
    const secret = new TextEncoder().encode(code);
    const { payload } = await jwtDecrypt(token, secret, {
      contentEncryptionAlgorithms: ["A256GCM"],
      keyManagementAlgorithms: ["dir"],
    });
    if (!payload) {
      return {
        status: statusCodes.error_status,
        message: Messages.tokenError,
        success: false,
      };
    }
    return {
      payload,
      success: true,
    };
  } catch (error) {
    return {
      status: statusCodes.error_status,
      message: error.message,
      success: false,
    };
  }
};

// Refactor decodeToken to use ENV
// export const decodeToken = async (token: any) => {
//   const jwtToken = token;
//   try {
//     const decoded = await jwtTokenVerifier(jwtToken);
//     return decoded;
//   } catch (error) {
//     return {
//       status: statusCodes.error_status,
//       message: error.message,
//       success: false,
//     };
//   }
// };

export const emailJWTToken = async (user: UserParamDTO) => {
  // const expiryTime: string = ENV.JWT.RESETPASSWORDLINKEXP ?? "10m"; // Use ENV to access reset password link expiration
  // const secret = new TextEncoder().encode(code);

  // const token = await new EncryptJWT({ user })
  //   .setProtectedHeader(encHeader)
  //   .setIssuedAt()
  //   .setIssuer(user._id.toString())
  //   .setExpirationTime(expiryTime)
  //   .encrypt(secret);

  // return token;
};
