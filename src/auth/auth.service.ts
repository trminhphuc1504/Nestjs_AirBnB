import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateAuthDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '3h',
    });
  }

  createRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '7d',
    });
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (err) {
      return null;
    }
  }

  async create(dto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.nguoiDung.create({
      data: {
        email: dto.email,
        name: dto.name,
        pass_word: hashedPassword,
      },
    });
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.nguoiDung.findFirst({
      where: { email: dto.email },
    });

    if (!user) return null;

    const isMatch = await bcrypt.compare(dto.password, user.pass_word || '');
    if (!isMatch) return null;

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return this.createAccessToken(payload);
  }
}
