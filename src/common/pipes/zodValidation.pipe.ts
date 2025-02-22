import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) { }

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') return value;

    try {
      // Zod will automatically strip unknown keys if you've used `.strip()`
      // in your schema definition
      return this.schema.parse(value);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);

        const formattedErrors = err.errors.map((error) => {
          // error.path is an array of keys leading to the error
          const field = error.path.join('.');
          return `${field ? field + ' ' : ''}${error.message}`;
        });
        throw new BadRequestException(formattedErrors.join('; '));
      }
      throw new BadRequestException('Validation failed');
    }
  }
}

