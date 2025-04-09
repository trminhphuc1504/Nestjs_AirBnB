import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
    // description: 'Email người dùng đã đăng ký',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123',
    // description: 'Mật khẩu của người dùng',
  })
  @IsNotEmpty()
  password: string;
}
