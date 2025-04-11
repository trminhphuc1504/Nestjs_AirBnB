import { Test, TestingModule } from '@nestjs/testing';
import { PhongController } from './phong.controller';
import { PhongService } from './phong.service';

describe('PhongController', () => {
  let controller: PhongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhongController],
      providers: [PhongService],
    }).compile();

    controller = module.get<PhongController>(PhongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
