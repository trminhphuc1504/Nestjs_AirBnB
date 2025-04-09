import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { ViTriModule } from './vi-tri/vi-tri.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';

@Module({
  imports: [AuthModule, BinhLuanModule, ViTriModule, NguoiDungModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
