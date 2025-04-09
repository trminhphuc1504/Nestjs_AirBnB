import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('BinhLuan')
@ApiBearerAuth()
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.binhLuanService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBinhLuanDto, @Req() req: any) {
    return this.binhLuanService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: CreateBinhLuanDto,
    @Req() req: any,
  ) {
    return this.binhLuanService.update(id, dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @Req() req: any) {
    return this.binhLuanService.delete(id, req.user.id);
  }
}
