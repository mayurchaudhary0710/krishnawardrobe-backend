import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from '@interceptors';
import { ExceptionHandler } from '@filters';
import { initFirebase } from '@utils';
import { umzug } from './libs/uzmug';
import { ENV } from '@config';
import { join, resolve } from 'path';
import * as cookieParser from 'cookie-parser';
require('ts-node/register');

async function main() {
  // Create a Fastify-based NestJS application
  const app = await NestFactory.create(AppModule);

  // Register Fastify CORS plugin with Fastify-specific options
  console.log(resolve(__dirname, '../../', 'public'));
  // Set global filters, interceptors, and pipes
  app.useGlobalFilters(new ExceptionHandler());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(cookieParser('your-secret-key'));
  // Initialize Firebase
  //  initFirebase();

  // Run database migrations
  try {
    await umzug.up();
    console.info('Migrations applied successfully.');
  } catch (err) {
    console.error('Error running migrations:', err);
  }

  // Start the server
  const port = ENV.PORT || 3000;
  await app.listen(port);
  console.info(`🚀 Server started on http://localhost:${port}`);
}

main();
