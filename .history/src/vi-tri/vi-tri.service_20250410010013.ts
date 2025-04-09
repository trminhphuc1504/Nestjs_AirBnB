import { Injectable } from '@nestjs/common';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ViTriService {
  prisma = new PrismaClient();

  getAll() {
    return this.prisma.viTri.findMany();
  }

  create(dto: CreateViTriDto) {
    return this.prisma.viTri.create({ data: dto });
  }

  getById(id: number) {
    return this.prisma.viTri.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateViTriDto) {
    return this.prisma.viTri.update({ where: { id }, data: dto });
  }

  delete(id: number) {
    return this.prisma.viTri.delete({ where: { id } });
  }

  phanTrangTimKiem(pageIndex: number, pageSize: number, keyword: string) {
    return this.prisma.viTri.findMany({
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
      where: {
        OR: [
          { ten_vi_tri: { contains: keyword, mode: 'insensitive' } },
          { tinh_thanh: { contains: keyword, mode: 'insensitive' } },
          { quoc_gia: { contains: keyword, mode: 'insensitive' } },
        ],
      },
    });
  }

  async uploadImage(id: number, filename: string) {
    const viTri = await this.prisma.viTri.findUnique({ where: { id } });
    if (!viTri) throw new NotFoundException('Vị trí không tồn tại');

    return this.prisma.viTri.update({
      where: { id },
      data: { hinh_anh: filename },
    });
  }
}
