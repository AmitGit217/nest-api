import { ConfigService } from '@nestjs/config';
import { AuthInterface } from 'src/interfaces';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthInterface) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async login(dto: AuthInterface) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const passMatch = await argon.verify(user.password, dto.password);
    if (!passMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  private async signToken(
    userId: number,
    email: string,
  ): Promise<{ token: string }> {
    const payload = {
      id: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: this.config.get('JWT_SECRET'),
    });

    return { token };
  }
}
