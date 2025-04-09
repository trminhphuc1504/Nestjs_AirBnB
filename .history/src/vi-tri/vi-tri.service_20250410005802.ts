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
}
