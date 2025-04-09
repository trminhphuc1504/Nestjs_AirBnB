import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

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

  @Get('phan-trang-tim-kiem')
  phanTrangVaTimKiem(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword:: string,
  ){
    return this.viTriService.phanTrangTimKiem(+pageIndex,+pageSize,keyword)
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.viTriService.getById(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateViTriDto) {
    return this.viTriService.update(+id, body);
  }

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
