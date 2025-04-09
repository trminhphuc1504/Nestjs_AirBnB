import { Injectable } from '@nestjs/common';
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
}
