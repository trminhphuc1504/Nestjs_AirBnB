import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiBearerAuth('access-token')
@ApiTags('Phong')
@UseGuards(JwtAuthGuard)
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  getAll() {
    return this.phongService.getAll();
  }

  @Get('/lay-phong-theo-vi-tri')
  getByViTri(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return this.phongService.searchPaging(+pageIndex, +pageSize, keyword);
  }

  @Get(':/id')
  getById(@Param('id') id: number) {
    return this.phongService.getById(Number(id));
  }

  @Post()
  create(@Body() dto: CreatePhongDto) {
    return this.phongService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number) {
    return this.phongService.update(Number(id), dto);
  }

  @Delete(':id')
  Delete(@Param('id') id: number) {
    return this.phongService.delete(Number(id));
  }

  @Post('/upload-hinh-phong')
  @UseInterceptors(
    FileInterceptor('formFile',{
      storage: diskStorage({
        destination: './public/img/phong',
        filename: (req,file,callback) =>{
          const uniqueName = ${Date.now()}${extname(file.originalName)}
        }
      })
    })
  )
}
