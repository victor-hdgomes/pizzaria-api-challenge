import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AuthProvider } from '@prisma/client';

export class AuthDto {
  @IsString()
  googleId: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  name?: string;

  @IsString()
  avatarUrl?: string;

  @IsEnum(AuthProvider as object)
  provider: AuthProvider;
}
