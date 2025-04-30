import { Test, TestingModule } from '@nestjs/testing';
import { ProizvodiService } from './proizvodi.service';

describe('ProizvodiService', () => {
  let service: ProizvodiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProizvodiService],
    }).compile();

    service = module.get<ProizvodiService>(ProizvodiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
