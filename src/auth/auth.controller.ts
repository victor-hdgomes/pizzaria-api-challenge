import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@/src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { RequestWithUser } from '@/src/types/express';
import { plainToInstance } from 'class-transformer';

import { validateOrReject } from 'class-validator';
import type { Response } from 'express';
import { AuthTokenGuard } from '@/src/auth/guard/auth-token.guard';
import { JwtPayloadDto } from '@/src/auth/dtos/jwt-payload.dto';
import { AuthUser } from '@/src/auth/decorators/auth-user.decorator';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const validatedDto = plainToInstance(AuthDto, req.user);

    await validateOrReject(validatedDto);

    const token = await this.authService.signInOrCreate(validatedDto);

    res.cookie('authToken', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/panel`);
  }

  @Get('me')
  @UseGuards(AuthTokenGuard)
  getUser(@AuthUser() authUser: JwtPayloadDto) {
    return this.authService.findUserById(authUser);
  }

  @Post('signout')
  @UseGuards(AuthTokenGuard)
  signOut(@Res() res: Response) {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(200).json({ message: 'Usuário deslogado com sucesso' });
  }
}
