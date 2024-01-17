import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check for 'requireAuth' metadata
    const requireAuth = this.reflector.getAllAndOverride<boolean>(
      'requireAuth',
      [context.getHandler(), context.getClass()],
    );

    // early return cuz route doesnt require authentication
    if (!requireAuth) {
      return true;
    }

    // extract request from context
    const request = context.switchToHttp().getRequest();

    // extract token from header
    const token = this.extractTokenFromHeader(request);

    // return 'Unauthorized' cuz token doesnt exists
    if (!token) {
      throw new UnauthorizedException();
    }

    // verify jwt token
    try {
      const payload = await this.jwt.verifyAsync(token);
      request['user'] = payload;
    } catch {
      // return 'Unauthorized' cuz token is invalid
      throw new UnauthorizedException();
    }

    // allowed
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
