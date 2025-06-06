import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BinhLuanResponseDto } from './dto/binhluan-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';

@Injectable()
export class BinhLuanService {
  prisma = new PrismaClient();

  getAll() {
    return this.prisma.binhLuan.findMany().then((data) =>
      plainToInstance(BinhLuanResponseDto, data, {
        excludeExtraneousValues: true,
      }),
    );
  }

  create(dto: CreateBinhLuanDto, userId: number) {
    return this.prisma.binhLuan
      .create({
        data: {
          ma_cong_viec: dto.ma_cong_viec,
          noi_dung: dto.noi_dung,
          sao_binh_luan: dto.sao_binh_luan,
          ma_nguoi_binh_luan: userId,
          ngay_binh_luan: new Date(),
        },
      })
      .then((data) =>
        plainToInstance(BinhLuanResponseDto, data, {
          excludeExtraneousValues: true,
        }),
      );
  }

  update(id: number, dto: CreateBinhLuanDto, userId: number) {
    return this.prisma.binhLuan.updateMany({
      where: {
        id,
        ma_nguoi_binh_luan: userId,
      },
      data: {
        noi_dung: dto.noi_dung,
        sao_binh_luan: dto.sao_binh_luan,
        ngay_binh_luan: new Date(),
      },
    });
  }

  delete(id: number, userId: number) {
    return this.prisma.binhLuan.deleteMany({
      where: {
        id,
        ma_nguoi_binh_luan: userId,
      },
    });
  }

  getByPhong(maPhong: number) {
    return this.prisma.binhLuan
      .findMany({
        where: { ma_cong_viec: maPhong },
      })
      .then((data) =>
        plainToInstance(BinhLuanResponseDto, data, {
          excludeExtraneousValues: true,
        }),
      );
  }
}
