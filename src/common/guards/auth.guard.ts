import { Messages, ROLE } from "@constants";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { jwtTokenVerifier } from "@utils";
import { FastifyRequest } from "fastify";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest() as FastifyRequest;
      const { authorization }: any = req.headers;
      if (!authorization || !authorization.includes("Bearer"))
        throw new UnauthorizedException(Messages.noAccessTokenProvided);
      const authToken = authorization.replace(/bearer/gim, "").trim();
      const decoded = await jwtTokenVerifier(authToken);
      if (!decoded?.payload?.user)
        throw new UnauthorizedException(Messages.invalidAccessToken);
      req.currentUser = decoded?.payload?.user;
      req.currentUser = {
        ...req.currentUser,
        ...this.getRoleBoolean(req.currentUser.roleName),
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  getRoleBoolean(roleName: string) {
    return {
      isAdmin: roleName === ROLE.ADMIN,
      isTherapist: roleName === ROLE.THERAPIST,
      isUser: roleName === ROLE.USER,
    };
  }
}
