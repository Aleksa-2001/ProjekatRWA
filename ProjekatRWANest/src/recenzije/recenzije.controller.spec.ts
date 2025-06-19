import { Test, TestingModule } from '@nestjs/testing';
import { RecenzijeController } from './recenzije.controller';

describe('RecenzijeController', () => {
  let controller: RecenzijeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecenzijeController],
    }).compile();

    controller = module.get<RecenzijeController>(RecenzijeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
