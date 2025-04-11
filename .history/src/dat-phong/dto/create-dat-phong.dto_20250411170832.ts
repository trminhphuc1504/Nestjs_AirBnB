import { IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDatPhongDto {
  @ApiProperty({ example: 0 })
  @IsInt()
  ma_phong: number;

  @ApiProperty({ example: '2025-04-11T09:51:43.971Z' })
  @IsDateString()
  ngay_den: Date;

  @ApiProperty({ example: '2025-04-11T09:51:43.972Z' })
  @IsDateString()
  ngay_di: Date;

  @ApiProperty({ example: 0 })
  @IsInt()
  so_luong_khach: number;

  @ApiProperty({ example: 0 })
  @IsInt()
  ma_nguoi_dat: number;
}
