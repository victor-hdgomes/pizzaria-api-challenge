import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  sub: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  iat?: number;

  @IsOptional()
  @IsNumber()
  exp?: number;
}
