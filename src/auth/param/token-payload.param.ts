import { REQUEST_TOKEN_PAYLOAD_NAME } from '@/src/commons/contants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const TokenPayloadParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return request[REQUEST_TOKEN_PAYLOAD_NAME];
  },
);
