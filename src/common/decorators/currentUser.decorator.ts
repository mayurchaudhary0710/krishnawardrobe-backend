import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // if(request?.currentUser) {
    //   throw new UnauthorizedException(Messages.unauthorizeResourse)
    // }
    return request?.currentUser;
  },
);
