import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatPhongService {
  prisma = new PrismaClient();

  getAll() {
    return this.prisma.datPhong.findMany();
  }

  getById(id: number) {
    return this.prisma.datPhong.findUnique({ where: { id } });
  }

  getByNguoiDungId(ma_nguoi_dat: number) {
    return this.prisma.datPhong.findMany({ where: { ma_nguoi_dat } });
  }

  async create(dto: CreateDatPhongDto) {
    // ✅ Kiểm tra xem đã có lịch đặt trùng chưa
    const isOverlapped = await this.prisma.datPhong.findFirst({
      where: {
        ma_phong: dto.ma_phong,
        OR: [
          {
            ngay_den: { lte: dto.ngay_di },
            ngay_di: { gte: dto.ngay_den },
          },
        ],
      },
    });

    if (isOverlapped) {
      throw new BadRequestException(
        'Phòng đã được đặt trong khoảng thời gian này!',
      );
    }

    // ✅ Nếu không bị trùng thì tạo mới
    return this.prisma.datPhong.create({ data: dto });
  }

  async update(id: number, dto: UpdateDatPhongDto) {
    const datPhong = await this.prisma.datPhong.findUnique({ where: { id } });
    if (!datPhong) throw new NotFoundException('Không tìm thấy dữ liệu');

    return this.prisma.datPhong.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: number) {
    return this.prisma.datPhong.delete({ where: { id } });
  }
}
