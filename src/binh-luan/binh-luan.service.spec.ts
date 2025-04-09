import { Test, TestingModule } from '@nestjs/testing';
import { BinhLuanService } from './binh-luan.service';

describe('BinhLuanService', () => {
  let service: BinhLuanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinhLuanService],
    }).compile();

    service = module.get<BinhLuanService>(BinhLuanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
