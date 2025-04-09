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
  @Expose()
  ma_nguoi_binh_luan: number;

  @ApiProperty()
  @Expose()
  ngay_binh_luan: Date;

  @ApiProperty()
  @Expose()
  noi_dung: string;

  @ApiProperty()
  @Expose()
  sao_binh_luan: number;
}
