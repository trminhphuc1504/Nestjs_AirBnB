import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhongDto {
  @ApiProperty({ example: 'Phòng VIP hướng biển' })
  @IsString()
  ten_phong: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  khach: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  phong_ngu: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  giuong: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  phong_tam: number;

  @ApiProperty({ example: 'Có view biển, rộng rãi và đầy đủ tiện nghi' })
  @IsString()
  mo_ta: string;

  @ApiProperty({ example: 500000 })
  @IsInt()
  gia_tien: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  may_giat: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  ban_la: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  tivi: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  dieu_hoa: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  wifi: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  bep: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  do_xe: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  ho_boi: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  ban_ui: boolean;

  @ApiProperty({
    example: 'https://example.com/hinh.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  hinh_anh?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  vi_tri_id: number;
}
