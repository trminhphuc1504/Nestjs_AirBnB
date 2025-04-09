import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateNguoiDungDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  pass_word: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @
}
