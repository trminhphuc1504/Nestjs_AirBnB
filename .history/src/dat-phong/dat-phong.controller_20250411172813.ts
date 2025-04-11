import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('DatPhong')
@Controller('dat-phong')
export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) {}

  @Get()
  getAll() {
    return this.datPhongService.getAll();
  }

  @Post()
  create(@Body() dto: CreateDatPhongDto) {
    return this.datPhongService.create(dto);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.datPhongService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDatPhongDto) {
    return this.datPhongService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.datPhongService.delete(id);
  }

  @Get('lay-theo-nguoi-dung/:MaNguoiDung')
  getByUserId(@Param('MaNguoiDung', ParseIntPipe) userId: number) {
    return this.datPhongService.getByNguoiDungId(userId);
  }
}
