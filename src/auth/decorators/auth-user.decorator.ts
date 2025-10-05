import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_TOKEN_PAYLOAD_NAME } from '@/src/commons/contants';
import { JwtPayloadDto } from '@/src/auth/dtos/jwt-payload.dto';
import type { Request } from 'express';

interface RequestWithTokenPayload extends Request {
  [REQUEST_TOKEN_PAYLOAD_NAME]?: JwtPayloadDto;
}

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayloadDto => {
    const request = ctx.switchToHttp().getRequest<RequestWithTokenPayload>();

    if (!request[REQUEST_TOKEN_PAYLOAD_NAME]) {
      throw new Error('Token payload not found in request');
    }

    return request[REQUEST_TOKEN_PAYLOAD_NAME];
  },
);
