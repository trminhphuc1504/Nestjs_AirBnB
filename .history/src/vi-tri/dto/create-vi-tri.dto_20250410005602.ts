import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateViTriDto {
  @ApiProperty({ example: 'Hà Nội', description: 'Tên vị trí' })
  @IsString()
  @IsOptional()
  ten_vi_tri?: string;

  @ApiProperty({})
}
