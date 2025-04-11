import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BinhLuanResponseDto } from './dto/binhluan-response.dto';

@ApiTags('BinhLuan')
@ApiBearerAuth('access-token')
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
  @ApiBody({ type: CreateBinhLuanDto }) //
  @ApiResponse({
    status: 201,
    description: 'Tạo bình luận thành công',
    type: BinhLuanResponseDto,
  })
  create(@Body() dto: CreateBinhLuanDto, @Req() req: any) {
    return this.binhLuanService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateBinhLuanDto,
    @Req() req: any,
  ) {
    return this.binhLuanService.update(Number(id), dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: any) {
    return this.binhLuanService.delete(Number(id), req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('lay-binh-luan-theo-phong/:maPhong')
  getByPhong(@Param('maPhong') maPhong: number) {
    return this.binhLuanService.getByPhong(Number(maPhong));
  }
}
