import { Messages } from "@constants";
import { HttpStatus } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { Transaction } from "sequelize";
export async function handleError(
  res: FastifyReply,
  error: any,
  transaction?: Transaction,
) {
  let message = [error.message];
  if (error.name === "ValidationError") {
    message = Object.values(error.errors).map((err: any) => err.message || err);
  } else if (error?.code && error?.code === 11000) {
    message = [Messages.recordAlreadyExist];
  } else if (error.name === "CastError" && error.kind === "ObjectId") {
    error.status = HttpStatus.BAD_REQUEST;
    message = [Messages.invalidId];
  } else if (
    error.code === "ERR_OSSL_BAD_DECRYPT" ||
    error.code === "ERR_INVALID_ARG_VALUE"
  ) {
    error.status = HttpStatus.BAD_REQUEST;
    message = [Messages.tokenError];
  }
  if (transaction) {
    await transaction.rollback();
  }
  res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).send({
    status: error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
    success: false,
    data: null,
    message: message.join(", "),
  });
}
