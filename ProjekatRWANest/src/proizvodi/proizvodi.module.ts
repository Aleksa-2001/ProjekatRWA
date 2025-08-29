import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProizvodiController } from './proizvodi.controller';
import { ProizvodiService } from './proizvodi.service';
import { ProdavniceModule } from 'src/prodavnice/prodavnice.module';

import { Proizvod } from '../models/proizvod.entity';

import { Racunar } from 'src/models/racunar.entity';

import { RacunarskaKomponenta } from '../models/racunarska-komponenta.entity';
import { CPU } from '../models/komponente/cpu.entity';
import { GPU } from '../models/komponente/gpu.entity';
import { RAM } from '../models/komponente/ram.entity';
import { MaticnaPloca } from 'src/models/komponente/maticna-ploca.entity';
import { Skladiste } from 'src/models/komponente/skladiste.entity';
import { Napajanje } from 'src/models/komponente/napajanje.entity';
import { Kuciste } from 'src/models/komponente/kuciste.entity';

import { RacunarskaOprema } from 'src/models/racunarska-oprema';
import { Monitor } from 'src/models/oprema/monitor.entity';
import { Tastatura } from 'src/models/oprema/tastatura.entity';
import { Mis } from 'src/models/oprema/mis.entity';
import { Slusalice } from 'src/models/oprema/slusalice.entity';
import { Zvucnik } from 'src/models/oprema/zvucnik.entity';
import { Stampac } from 'src/models/oprema/stampac.entity';

@Module({
  imports: [
    forwardRef(() => ProdavniceModule), 
    TypeOrmModule.forFeature(
      [
        Proizvod, 
        Racunar, 
        RacunarskaKomponenta, 
        CPU, 
        GPU, 
        RAM, 
        MaticnaPloca, 
        Skladiste, 
        Napajanje, 
        Kuciste, 
        RacunarskaOprema, 
        Monitor, 
        Tastatura, 
        Mis, 
        Slusalice, 
        Zvucnik, 
        Stampac
      ]
    )
  ],
  controllers: [ProizvodiController],
  providers: [ProizvodiService],
  exports: [ProizvodiService]
})
export class ProizvodiModule {}
