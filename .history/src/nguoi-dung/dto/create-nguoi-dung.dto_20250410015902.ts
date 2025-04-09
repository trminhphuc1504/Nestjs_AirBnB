import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNguoiDungDto {
  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'a@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  pass_word: string;

  @ApiPropertyOptional({ example: '0909123456' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '1995-05-10' })
  @IsOptional()
  @IsDateString()
  birth_day?: string;

  @ApiPropertyOptional({ example: 'nam' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 'user' })
  @IsOptional()
  @IsString()
  role?: string;
}
