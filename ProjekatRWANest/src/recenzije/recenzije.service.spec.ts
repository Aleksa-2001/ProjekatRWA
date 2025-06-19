import { Test, TestingModule } from '@nestjs/testing';
import { RecenzijeService } from './recenzije.service';

describe('RecenzijeService', () => {
  let service: RecenzijeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecenzijeService],
    }).compile();

    service = module.get<RecenzijeService>(RecenzijeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
