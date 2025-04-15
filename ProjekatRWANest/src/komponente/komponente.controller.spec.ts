import { Test, TestingModule } from '@nestjs/testing';
import { KomponenteController } from './komponente.controller';

describe('KomponenteController', () => {
  let controller: KomponenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KomponenteController],
    }).compile();

    controller = module.get<KomponenteController>(KomponenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
