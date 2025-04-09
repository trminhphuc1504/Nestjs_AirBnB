import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BinhLuanService {
  prisma = new PrismaClient();

  getAll() {
    return this.prisma.binhLuan.findMany();
  }

  creat;
}
