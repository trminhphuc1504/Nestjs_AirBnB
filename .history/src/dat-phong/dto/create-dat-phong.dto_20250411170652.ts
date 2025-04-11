import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateDatPhongDto {
    @ApiProperty({example: 0})
    @IsInt()
    ma_phong: number;

    @ApiProperty({example: '2025-04-11T09:51:43.971Z'})

}
