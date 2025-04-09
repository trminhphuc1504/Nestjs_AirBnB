import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ViTri')
@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  @Get()
  getAll() {
    return this.viTriService.getAll();
  }

  @Post()
  create(@Body body: CreateViTriDto) {
    return this.viTriService.create(body);
  }
}
