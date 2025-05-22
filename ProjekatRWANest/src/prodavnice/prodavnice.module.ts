import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prodavnica } from './entities/prodavnica.entity';
import { ProdavniceService } from './prodavnice.service';
import { ProdavniceController } from './prodavnice.controller';
import { Proizvod } from 'src/proizvodi/entities/proizvod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prodavnica])],
  controllers: [ProdavniceController],
  providers: [ProdavniceService],
  exports: [TypeOrmModule, ProdavniceService]
})
export class ProdavniceModule {}
