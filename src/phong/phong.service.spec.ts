import { Test, TestingModule } from '@nestjs/testing';
import { PhongService } from './phong.service';

describe('PhongService', () => {
  let service: PhongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhongService],
    }).compile();

    service = module.get<PhongService>(PhongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
