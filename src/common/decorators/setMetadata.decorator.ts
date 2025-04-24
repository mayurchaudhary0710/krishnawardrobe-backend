import { SetMetadata } from '@nestjs/common';

export const SetModuleName = (moduleName: string) =>
  SetMetadata('module', moduleName);

export const SetPermit = (permit: string) => SetMetadata('permit', permit);
