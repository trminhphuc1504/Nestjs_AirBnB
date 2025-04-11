import { Test, TestingModule } from '@nestjs/testing';
import { DatPhongController } from './dat-phong.controller';
import { DatPhongService } from './dat-phong.service';

describe('DatPhongController', () => {
  let controller: DatPhongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatPhongController],
      providers: [DatPhongService],
    }).compile();

    controller = module.get<DatPhongController>(DatPhongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
