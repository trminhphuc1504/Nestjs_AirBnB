import { Test, TestingModule } from '@nestjs/testing';
import { DatPhongService } from './dat-phong.service';

describe('DatPhongService', () => {
  let service: DatPhongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatPhongService],
    }).compile();

    service = module.get<DatPhongService>(DatPhongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
