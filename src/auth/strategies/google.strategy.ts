import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthDto } from '@/src/auth/dtos/auth.dto';
import { AuthProvider } from '@prisma/client';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, emails, displayName, photos } = profile;

    const user: AuthDto = {
      googleId: id,
      email: emails?.[0].value ?? '',
      name: displayName ?? '',
      avatarUrl: photos?.[0].value ?? '',
      provider: AuthProvider.GOOGLE,
    };

    return user;
  }
}
