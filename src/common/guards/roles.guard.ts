import { Messages, ROLE } from "@constants";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Request } from "express";
import { FastifyRequest } from "fastify";

@Injectable()
export class RolesGuard implements CanActivate {
  allowedRoles: ROLE[] = [];
  constructor(roles: ROLE[]) {
    this.allowedRoles = roles;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as FastifyRequest;
    if (!this.allowedRoles.includes(req.currentUser.roleName)) {
      throw new ForbiddenException(Messages.unauthorizeResourse);
    }
    return true;
  }
}
