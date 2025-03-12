import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { z } from 'zod';

@Catch(HttpException)
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message = exception.message;
    console.log('inside exception');
    console.log(exception);
    if (exception instanceof z.ZodError) {
      message = (exception as any)?.response?.message?.join(', ');
    }
    response.status(status).send({
      status,
      data: null,
      message,
    });
  }
}
