import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as FastifyRequest;
    // if(request?.currentUser) {
    //   throw new UnauthorizedException(Messages.unauthorizeResourse)
    // }
    return request?.currentUser;
  },
);
