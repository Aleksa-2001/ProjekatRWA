import { Test, TestingModule } from '@nestjs/testing';
import { ProizvodiController } from './proizvodi.controller';

describe('ProizvodiController', () => {
  let controller: ProizvodiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProizvodiController],
    }).compile();

    controller = module.get<ProizvodiController>(ProizvodiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
