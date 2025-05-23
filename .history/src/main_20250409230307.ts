import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bảo vệ dữ liệu đầu vào
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('Airbnb API')
    .setDescription('Swagger cho hệ thống đặt phòng')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
