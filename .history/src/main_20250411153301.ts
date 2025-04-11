import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const hash = await bcrypt.hash('123456', 10);
  console.log('Hash mật khẩu:', hash);

  // Bảo vệ dữ liệu đầu vào
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Swagger config hoàn chỉnh cho Bearer Token
  const config = new DocumentBuilder()
    .setTitle('Airbnb API')
    .setDescription('Swagger cho hệ thống đặt phòng')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // Tên này phải dùng trong controller
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
