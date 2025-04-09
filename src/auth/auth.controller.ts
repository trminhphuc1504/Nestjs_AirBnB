import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: CreateAuthDto })
  async signup(@Body() dto: CreateAuthDto) {
    const user = await this.authService.create(dto);
    return { message: 'Đăng ký thành công', user };
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);

    if (!token) {
      throw new HttpException(
        'Tài khoản hoặc mật khẩu không đúng',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      message: 'Đăng nhập thành công',
      accessToken: token,
    };
  }
}
