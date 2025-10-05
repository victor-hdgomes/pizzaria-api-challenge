import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwtConfig from '@/src/auth/config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import type { ConfigType } from '@nestjs/config';
import { REQUEST_TOKEN_PAYLOAD_NAME } from '@/src/commons/contants';
import { JwtPayloadDto } from '@/src/auth/dtos/jwt-payload.dto';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayloadDto>(token, {
        secret: this.jwtConfiguration.secret,
      });

      request[REQUEST_TOKEN_PAYLOAD_NAME] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  extractTokenHeader(request: Request): string | null {
    const authHeader = request.headers?.authorization;
    const { authToken } = request.cookies as { authToken?: string };

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }

    if (authToken) {
      return authToken;
    }

    return null;
  }
}
