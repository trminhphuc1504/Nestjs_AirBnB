import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateViTriDto {
  @ApiProperty({ example: 'Hà Nội', description: 'Tên vị trí' })
  @IsString()
  @IsOptional()
  ten_vi_tri?: string;

  @ApiProperty({ example: 'Hà Nội', description: 'Tỉnh thành' })
  @IsString()
  @IsOptional()
  tinh_thanh?: string;

  @ApiProperty({ example: 'Việt Nam', description: 'Quốc gia' })
  @IsString()
  @IsOptional()
  quoc_gia?: string;

  @ApiProperty({ example: 'hanoi.jpg', description: 'Hình ảnh đại diện' })
  @IsString()
  @IsOptional()
  hinh_anh?: string;
}
