import { IsString } from 'class-validator';

export class CreateNguoiDungDto {
  @IsString()
  name: string;
}
