import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { body } = req;
    if (body) {
      const keys = Object.keys(body);
      while (keys.length) {
        const key = keys.pop() as string;
        const value = body[key];
        if (value === null) delete body[key];
      }
    }
    return next.handle().pipe(map((value) => (value === null ? '' : value)));
  }
}
