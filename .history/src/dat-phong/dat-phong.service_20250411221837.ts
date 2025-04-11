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

  function normalizeDate(date: Date, toEndOfDay = false): Date {
    const newDate = new Date(date);
    newDate.setHours(toEndOfDay ? 23 : 0, toEndOfDay ? 59 : 0, toEndOfDay ? 59 : 0, 0);
    return newDate;
  }
  

  async create(dto: CreateDatPhongDto) {
    const ngayDen = normalizeDate(dto.ngay_den); // bắt đầu từ 00:00:00
    const ngayDi = normalizeDate(dto.ngay_di, true); // kết thúc lúc 23:59:59
  
    const isOverlapped = await this.prisma.datPhong.findFirst({
      where: {
        ma_phong: dto.ma_phong,
        AND: [
          { ngay_den: { lte: ngayDi } },
          { ngay_di: { gte: ngayDen } },
        ],
      },
    });
  
    if (isOverlapped) {
      throw new BadRequestException('Phòng đã được đặt trong khoảng thời gian này!');
    }
  
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
