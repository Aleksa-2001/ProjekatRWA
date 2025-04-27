import { Test, TestingModule } from '@nestjs/testing';
import { ProdavniceController } from './prodavnice.controller';

describe('ProdavniceController', () => {
  let controller: ProdavniceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdavniceController],
    }).compile();

    controller = module.get<ProdavniceController>(ProdavniceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
