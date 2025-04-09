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
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('phan-trang-tim-kiem')
  phanTrangVaTimKiem(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return this.nguoiDungService.phanTrangTimKiem(
      +pageIndex,
      +pageSize,
      keyword,
    );
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateNguoiDungDto) {
    return this.nguoiDungService.update(+id, body);
  }

  @Get('search/:TenNguoiDung')
  search(@Param('TenNguoiDung') ten: string) {
    return this.nguoiDungService.searchByName(ten);
  }

  @Post('upload-avatar/:id')
  @UseInterceptors(
    FileInterceptor('formFile', {
      storage: diskStorage({
        destination: './public/img/avatar',
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
      },
    },
  })
  uploadAvatar(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.nguoiDungService.uploadAvatar(+id, file.filename);
  }
}
