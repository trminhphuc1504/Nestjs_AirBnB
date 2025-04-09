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

  async update(id: number, dto: CreateBinhLuanDto, userId: number) {
    // 1. Kiểm tra xem bình luận có tồn tại và thuộc về user hay không
    const binhLuan = await this.prisma.binhLuan.findFirst({
      where: {
        id,
        ma_nguoi_binh_luan: userId,
      },
    });

    if (!binhLuan) {
      throw new Error(
        'Bình luận không tồn tại hoặc bạn không có quyền cập nhật',
      );
    }

    // 2. Nếu tồn tại, cập nhật bằng update() (trả về dữ liệu luôn)
    return this.prisma.binhLuan.update({
      where: { id },
      data: {
        noi_dung: dto.noi_dung,
        sao_binh_luan: dto.sao_binh_luan,
        ngay_binh_luan: new Date(),
      },
    });
  }

  async delete(id: number, userId: number) {
    const comment = await this.prisma.binhLuan.findFirst({
      where: {
        id,
        ma_nguoi_binh_luan: userId,
      },
    });

    if (!comment) {
      throw new Error('Không tìm thấy bình luận để xóa');
    }

    await this.prisma.binhLuan.delete({
      where: {
        id: comment.id,
      },
    });

    return {
      message: 'Xóa bình luận thành công',
      deleted: comment,
    };
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
