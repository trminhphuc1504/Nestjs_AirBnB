import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('NguoiDung')
@Controller('nguoi-dung')
@UseGuards(JwtAuthGuard)
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Get()
  getAll() {
    return this.nguoiDungService.getAll();
  }

  @Post()
  create(@Body() body: CreateNguoiDungDto) {
    return this.nguoiDungService.create(body);
  }

  @Delete()
  delete(@Query('id') id: number) {
    return this.nguoiDungService.delete(+id);
  }
}
