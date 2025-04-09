import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class BinhLuanResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  ma_cong_viec: number;

  @ApiProperty()
  ma_nguoi_binh_luan: number;

  @ApiProperty()
  @Expose()
  ngay_binh_luan: Date;

  @ApiProperty()
  noi_dung: string;

  @ApiProperty()
  sao_binh_luan: number;
}
