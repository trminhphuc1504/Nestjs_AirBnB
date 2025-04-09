import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NguoiDungService {
  prisma = new PrismaClient();

  getAll() {
    return this.prisma.nguoiDung.findMany();
  }

  create(dto: CreateNguoiDungDto) {
    return this.prisma.nguoiDung.create({ data: dto });
  }

  delete(id: number) {
    return this.prisma.nguoiDung.delete({ where: { id } });
  }

  getById(id: number) {
    return this.prisma.nguoiDung.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateNguoiDungDto) {
    return this.prisma.nguoiDung.update({ where: { id }, data: dto });
  }

  searchByName(name: string) {
    return this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  phanTrangTimKiem(pageIndex: number, pageSize: number, keyword: string) {
    const skip = (pageIndex - 1) * pageSize;
    return this.prisma.nguoiDung.findMany({
      skip,
      take: pageSize,
      where: {
        name: {
          contains: keyword,
        },
      },
    });
  }

  async uploadAvatar(id: number, fileName: string) {
    const user = await this.prisma.nguoiDung.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    return this.prisma.nguoiDung.update({
      where: { id },
      data: { avatar: fileName },
    });
  }
}
