import { SetMetadata, applyDecorators } from '@nestjs/common';

export function RequireAuth() {
  return applyDecorators(SetMetadata('requireAuth', true));
}
