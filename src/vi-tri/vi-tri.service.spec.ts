import { Test, TestingModule } from '@nestjs/testing';
import { ViTriService } from './vi-tri.service';

describe('ViTriService', () => {
  let service: ViTriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViTriService],
    }).compile();

    service = module.get<ViTriService>(ViTriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
