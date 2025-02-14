import { Test, TestingModule } from '@nestjs/testing';
import { AdopcionsController } from './adopcions.controller';
import { AdopcionsService } from './adopcions.service';

describe('AdopcionsController', () => {
  let controller: AdopcionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdopcionsController],
      providers: [AdopcionsService],
    }).compile();

    controller = module.get<AdopcionsController>(AdopcionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
