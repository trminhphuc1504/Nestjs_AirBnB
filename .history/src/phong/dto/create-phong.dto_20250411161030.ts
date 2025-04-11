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
  giaTien: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  mayGiat: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  banLa: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  tivi: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  dieuHoa: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  wifi: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  bep: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  doXe: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  hoBoi: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  banUi: boolean;

  @ApiProperty({ example: 'https://example.com/hinh.jpg', required: false })
  @IsOptional()
  @IsString()
  hinhAnh?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  maViTri: number;
}
