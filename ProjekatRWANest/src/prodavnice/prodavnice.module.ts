import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prodavnica } from '../models/prodavnica.entity';
import { ProdavniceService } from './prodavnice.service';
import { ProdavniceController } from './prodavnice.controller';
import { ProizvodiModule } from 'src/proizvodi/proizvodi.module';

@Module({
  imports: [forwardRef(() => ProizvodiModule), TypeOrmModule.forFeature([Prodavnica])],
  controllers: [ProdavniceController],
  providers: [ProdavniceService],
  exports: [TypeOrmModule]
})
export class ProdavniceModule {}
