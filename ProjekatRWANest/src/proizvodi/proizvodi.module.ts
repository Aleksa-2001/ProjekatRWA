import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProizvodiController } from './proizvodi.controller';
import { ProizvodiService } from './proizvodi.service';
import { ProdavniceModule } from 'src/prodavnice/prodavnice.module';
import { Proizvod } from './entities/proizvod.entity';
import { RacunarskaKomponenta } from './entities/racunarska-komponenta.entity';
import { CPU } from './entities/komponente/cpu.entity';
import { GPU } from './entities/komponente/gpu.entity';
import { RAM } from './entities/komponente/ram.entity';

@Module({
  imports: [
    forwardRef(() => ProdavniceModule), 
    TypeOrmModule.forFeature(
      [
        Proizvod, 
        RacunarskaKomponenta, 
        CPU, 
        GPU, 
        RAM
      ]
    )
  ],
  controllers: [ProizvodiController],
  providers: [ProizvodiService],
  exports: [ProizvodiService]
})
export class ProizvodiModule {}
