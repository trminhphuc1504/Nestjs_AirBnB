import { IsString } from 'class-validator';

export class CreatePhongDto {
  @IsString() ten_phong: string;
}
