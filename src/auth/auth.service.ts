import { PrismaService } from '@/src/prisma/prisma.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from '@/src/auth/dtos';
import jwtConfig from '@/src/auth/config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { userBasicSelect } from '@/src/auth/const';
import { JwtPayloadDto } from '@/src/auth/dtos/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async signInOrCreate(authDto: AuthDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: authDto.email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          googleId: authDto.googleId,
          email: authDto.email,
          name: authDto.name,
          avatarUrl: authDto.avatarUrl,
          provider: authDto.provider,
        },
      });
    }

    return await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.signOptions?.expiresIn,
      },
    );
  }

  async findUserById(authUser: JwtPayloadDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: authUser.sub },
      select: userBasicSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id "${authUser.sub}" not found`);
    }

    return user;
  }
}
