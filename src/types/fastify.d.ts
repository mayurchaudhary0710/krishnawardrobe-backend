import { ICurrentUser } from "@dtos";

declare module 'fastify' {
  interface FastifyRequest {
    currentUser?: ICurrentUser;
  }
}
