import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProizvodiController } from './proizvodi.controller';
import { Proizvod } from './entities/proizvod.entity';
import { ProizvodiService } from './proizvodi.service';
import { ProdavniceService } from 'src/prodavnice/prodavnice.service';
import { ProdavniceModule } from 'src/prodavnice/prodavnice.module';
import { CPU } from './entities/komponente/cpu.entity';
import { GPU } from './entities/komponente/gpu.entity';
import { RacunarskaKomponenta } from './entities/racunarska-komponenta.entity';
import { RAM } from './entities/komponente/ram.entity';

@Module({
  imports: [ProdavniceModule, TypeOrmModule.forFeature([Proizvod, RacunarskaKomponenta, CPU, GPU, RAM])],
  controllers: [ProizvodiController],
  providers: [ProizvodiService, ProdavniceService]
})
export class ProizvodiModule {}
