import { Test, TestingModule } from '@nestjs/testing';
import { ProdavniceService } from './prodavnice.service';

describe('ProdavniceService', () => {
  let service: ProdavniceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdavniceService],
    }).compile();

    service = module.get<ProdavniceService>(ProdavniceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
