import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('ViTri')
@Controller('api/vi-tri')
@UseGuards(JwtAuthGuard)
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  // GET /api/vi-tri
  @Get()
  getAll() {
    return this.viTriService.getAll();
  }

  // POST /api/vi-tri
  @Post()
  create(@Body() body: CreateViTriDto) {
    return this.viTriService.create(body);
  }

  // GET /api/vi-tri/phan-trang-tim-kiem
  @Get('phan-trang-tim-kiem')
  phanTrangVaTimKiem(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return this.viTriService.phanTrangTimKiem(+pageIndex, +pageSize, keyword);
  }

  // GET /api/vi-tri/:id
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.viTriService.getById(+id);
  }

  // PUT /api/vi-tri/:id
  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateViTriDto) {
    return this.viTriService.update(+id, body);
  }

  // DELETE /api/vi-tri/:id
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.viTriService.delete(+id);
  }

  // POST /api/vi-tri/upload-hinh-vitri
  @Post('upload-hinh-vitri')
  @UseInterceptors(
    FileInterceptor('formFile', {
      storage: diskStorage({
        destination: './public/img/vi-tri',
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
        maViTri: { type: 'string' },
        formFile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(
    @Body('maViTri') maViTri: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.viTriService.uploadImage(+maViTri, file.filename);
  }
}
