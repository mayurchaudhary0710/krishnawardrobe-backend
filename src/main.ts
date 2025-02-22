import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "@interceptors";
import { ExceptionHandler } from "@filters";
import { initFirebase } from "@utils";
import { umzug } from "./libs/uzmug";
import { ENV } from "@config";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static"
import multipart from '@fastify/multipart'
import { join, resolve } from "path";
require("ts-node/register");

async function main() {
  // Create a Fastify-based NestJS application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true
    }),
  );

  // Register Fastify CORS plugin with Fastify-specific options
  await app.register(fastifyCors, {
    origin: true,
    credentials: true,
  });
  console.log(resolve(__dirname, '../../', 'public'))
  app.register(fastifyStatic, {
    root: resolve(__dirname, '../../', 'public'),
    prefix: '/public/',
  });
  app.register(multipart, {
    limits: {
      fileSize: 10000000
    }
  })
  // Register Fastify Cookie plugin
  await app.register(fastifyCookie, {
    secret: ENV.COOKIE_SECRET,
  });

  // Set global filters, interceptors, and pipes
  app.useGlobalFilters(new ExceptionHandler());
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Initialize Firebase
  initFirebase();

  // Run database migrations
  try {
    await umzug.up();
    console.info("Migrations applied successfully.");
  } catch (err) {
    console.error("Error running migrations:", err);
  }

  // Start the server
  const port = ENV.PORT || 3000;
  await app.listen(port);
  console.info(`🚀 Server started on http://localhost:${port}`);
}

main();
