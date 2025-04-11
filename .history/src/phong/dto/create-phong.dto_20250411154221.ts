import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePhongDto {
  @IsString() ten_phong: string;
  @IsInt() khach: number;
  @IsInt() phong_ngu: number;
  @IsInt() giuong: number;
  @IsInt() phong_tam: number;
  @IsString() mo_ta: string;
  @IsInt() gia_tien: number;

  @IsBoolean() may_giat: boolean;
  @IsBoolean() ban_la: boolean;
  @IsBoolean() tivi: boolean;
  @IsBoolean() dieu_hoa: boolean;
  @IsBoolean() wifi: boolean;
  @IsBoolean() bep: boolean;
  @IsBoolean() do_xe: boolean;
  @IsBoolean() ho_boi: boolean;
  @IsBoolean() ban_ui: boolean;

  @IsOptional()
  @IsString()
  hinh_anh?: string;

  @IsInt() vi_tri_id: number;
}
