import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProizvodiController } from './proizvodi.controller';
import { ProizvodiService } from './proizvodi.service';
import { ProdavniceModule } from 'src/prodavnice/prodavnice.module';
import { Proizvod } from '../models/proizvod.entity';
import { RacunarskaKomponenta } from '../models/racunarska-komponenta.entity';
import { CPU } from '../models/komponente/cpu.entity';
import { GPU } from '../models/komponente/gpu.entity';
import { RAM } from '../models/komponente/ram.entity';
import { MaticnaPloca } from 'src/models/komponente/maticna-ploca.entity';
import { Skladiste } from 'src/models/komponente/skladiste.entity';
import { Napajanje } from 'src/models/komponente/napajanje.entity';
import { Kuciste } from 'src/models/komponente/kuciste.entity';
import { Racunar } from 'src/models/racunar.entity';

@Module({
  imports: [
    forwardRef(() => ProdavniceModule), 
    TypeOrmModule.forFeature(
      [
        Proizvod, 
        RacunarskaKomponenta, 
        CPU, 
        GPU, 
        RAM,
        MaticnaPloca,
        Skladiste,
        Napajanje,
        Kuciste,
        Racunar
      ]
    )
  ],
  controllers: [ProizvodiController],
  providers: [ProizvodiService],
  exports: [ProizvodiService]
})
export class ProizvodiModule {}
