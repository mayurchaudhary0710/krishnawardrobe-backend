import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import * as Yup from "yup";

@Catch(HttpException)
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    let message = exception.message;
    if (exception instanceof Yup.ValidationError) {
      message = (exception as any)?.response?.message?.join(", ");
    }
    response.status(status).send({
      status,
      data: null,
      message,
    });
  }
}
