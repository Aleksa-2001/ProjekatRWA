import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProizvodiController } from './proizvodi.controller';
import { Proizvod } from './entities/proizvod.entity';
import { ProizvodiService } from './proizvodi.service';
import { ProdavniceService } from 'src/prodavnice/prodavnice.service';
import { ProdavniceModule } from 'src/prodavnice/prodavnice.module';
import { Prodavnica } from 'src/prodavnice/entities/prodavnica.entity';

@Module({
  imports: [ProdavniceModule, TypeOrmModule.forFeature([Proizvod])],
  controllers: [ProizvodiController],
  providers: [ProizvodiService, ProdavniceService]
})
export class ProizvodiModule {}
