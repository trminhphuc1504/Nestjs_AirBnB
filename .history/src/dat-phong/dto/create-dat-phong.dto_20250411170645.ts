import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateDatPhongDto {
    @ApiProperty({example: 0})
    @IsInt()
    ma_phong: number;

    @ApiProperty({example:})

}
