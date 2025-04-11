import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PhongService } from './phong.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';

@Controller('api/phong-thue')
@UseGuards(JwtAuthGuard)
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  getAll() {
    return this.phongService.getAll();
  }

  @Get('/lay-phong-theo-vi-tri')
  getByViTri(@Query('maViTri') maViTri: number) {
    return this.phongService.getByViTri(Number(maViTri));
  }

  @Get('/phan-trang-tim-kiem')
  searchPaging(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return this.phongService.searchPaging(+pageIndex, +pageSize, keyword);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.phongService.getById(Number(id));
  }

  @Post()
  create(@Body() dto: CreatePhongDto) {
    return this.phongService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePhongDto) {
    return this.phongService.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.phongService.delete(Number(id));
  }

  @Post('/upload-hinh-phong')
  @UseInterceptors(
    FileInterceptor('formFile', {
      storage: diskStorage({
        destination: './public/img/phong',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        formFile: {
          type: 'string',
          format: 'binary',
        },
        maPhong: {
          type: 'string',
        },
      },
    },
  })
  uploadImagePhong(
    @UploadedFile() file: Express.Multer.File,
    @Query('maPhong') maPhong: string,
  ) {
    return this.phongService.uploadImagePhong(+maPhong, file.filename);
  }
}
