import { Test, TestingModule } from '@nestjs/testing';
import { ViTriController } from './vi-tri.controller';
import { ViTriService } from './vi-tri.service';

describe('ViTriController', () => {
  let controller: ViTriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViTriController],
      providers: [ViTriService],
    }).compile();

    controller = module.get<ViTriController>(ViTriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
