import { Messages, statusCodes } from '@constants';

export class CustomError extends Error {
  status = statusCodes.internal_server;
  message = Messages.internalServerError;
  data = null;
  constructor(
    status: number = statusCodes.internal_server,
    message: string = Messages.internalServerError,
    data = null,
  ) {
    super();
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
