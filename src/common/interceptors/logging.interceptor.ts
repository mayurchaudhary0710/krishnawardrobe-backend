import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    console.info(
      `Request received at ${req.method} ${req.url}: ${new Date().toISOString()} `,
    );
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.info(
            `Response time for ${req.method} ${req.url}: ${Date.now() - now}ms status: ${res.statusCode}`,
          ),
        ),
      );
  }
}
