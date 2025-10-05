import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@/src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '@/src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthTokenGuard } from '@/src/auth/guard/auth-token.guard';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '@/src/auth/strategies/google.strategy';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forFeature(jwtConfig),
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenGuard, GoogleStrategy],
  exports: [AuthTokenGuard, JwtModule, ConfigModule],
})
export class AuthModule {}
