import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '0123456789' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  gender: boolean;

  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  role: string;
}
