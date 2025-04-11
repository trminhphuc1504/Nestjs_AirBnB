import { Injectable } from '@nestjs/common';
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
}
