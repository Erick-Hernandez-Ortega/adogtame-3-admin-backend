import { Test, TestingModule } from '@nestjs/testing';
import { AdopcionsService } from './adopcions.service';

describe('AdopcionsService', () => {
  let service: AdopcionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdopcionsService],
    }).compile();

    service = module.get<AdopcionsService>(AdopcionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
