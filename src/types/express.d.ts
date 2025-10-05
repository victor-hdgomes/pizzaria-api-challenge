import { Request } from 'express';
import { AuthDto } from '@/auth/dtos';

export interface RequestWithUser extends Request {
  user: AuthDto;
}
