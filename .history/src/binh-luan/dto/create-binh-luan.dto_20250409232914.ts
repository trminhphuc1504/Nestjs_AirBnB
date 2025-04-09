import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBinhLuanDto {
  @ApiProperty({
    example: 1,
    description: 'ID phòng cần bình luận (ma_cong_viec)',
  })
  @IsInt()
  ma_cong_viec: number;

  @ApiProperty({
    example: 'Phòng sạch sẽ, chủ nhà thân thiện',
    description: 'Nội dung bình luận',
  })
  @IsString()
  @IsNotEmpty()
  noi_dung: string;

  @ApiProperty({ example: 4, description: 'Số sao đánh giá (1–5)' })
  @IsInt()
  @IsNotEmpty()
  sao_binh_luan: number;
}
