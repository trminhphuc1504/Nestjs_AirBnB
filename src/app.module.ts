import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { ViTriModule } from './vi-tri/vi-tri.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { PhongModule } from './phong/phong.module';
import { DatPhongModule } from './dat-phong/dat-phong.module';

@Module({
  imports: [AuthModule, BinhLuanModule, ViTriModule, NguoiDungModule, PhongModule, DatPhongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
