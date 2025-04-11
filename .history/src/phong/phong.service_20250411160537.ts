import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PhongService {
  prisma = new PrismaClient();

  getAll() {
    return this.prisma.phong.findMany();
  }

  getById(id: number) {
    return this.prisma.phong.findUnique({ where: { id } });
  }

  getByViTri(vi_tri_id: number) {
    return this.prisma.phong.findMany({ where: { vi_tri_id } });
  }

  searchPaging(pageIndex: number, pageSize: number, keyword: string) {
    const skip = (pageIndex - 1) * pageSize;
    return this.prisma.phong.findMany({
      skip,
      take: pageSize,
      where: {
        ten_phong: {
          contains: keyword,
        },
      },
    });
  }

  create(dto: CreatePhongDto) {
    return this.prisma.phong.create({ data: dto });
  }

  update(id: number, dto: UpdatePhongDto) {
    return this.prisma.phong.update({ where: { id }, data: dto });
  }

  delete(id: number) {
    return this.prisma.phong.delete({ where: { id } });
  }

  async uploadImagePhong(id: number, fileName: string) {
    const phong = await this.prisma.phong.findUnique({ where: { id } });
    if (!phong) throw new NotFoundException('Không tìm thấy phòng');
    return this.prisma.phong.update({
      where: { id },
      data: { hinh_anh: fileName },
    });
  }
}
