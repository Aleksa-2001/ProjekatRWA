import { Test, TestingModule } from '@nestjs/testing';
import { KomponenteService } from './komponente.service';

describe('KomponenteService', () => {
  let service: KomponenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KomponenteService],
    }).compile();

    service = module.get<KomponenteService>(KomponenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
