import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../models/komponente/racunarska-komponenta';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

import { CPUComponent } from "../cpu/cpu.component";
import { GPUComponent } from '../gpu/gpu.component';
import { MaticnaPlocaComponent } from "../maticna-ploca/maticna-ploca.component";
import { RAMComponent } from "../ram/ram.component";
import { NapajanjeComponent } from '../napajanje/napajanje.component';

import { CPU } from '../../../../models/komponente/cpu';
import { GPU } from '../../../../models/komponente/gpu';
import { MaticnaPloca } from '../../../../models/komponente/maticna-ploca';
import { RAM } from '../../../../models/komponente/ram';
import { Napajanje } from '../../../../models/komponente/napajanje';

@Component({
  selector: 'app-komponenta',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    CPUComponent,
    GPUComponent,
    MaticnaPlocaComponent,
    RAMComponent,
    NapajanjeComponent
  ],
  templateUrl: './komponenta.component.html',
  styleUrl: './komponenta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KomponentaComponent {

  @Input() rk!: RacunarskaKomponenta

  isCPU(rk: RacunarskaKomponenta) {
    return rk.tip === 1 ? rk as CPU : undefined;
  }
  
  isGPU(rk: RacunarskaKomponenta) {
    return rk.tip === 2 ? rk as GPU : undefined;
  }

  isMaticnaPloca(rk: RacunarskaKomponenta) {
    return rk.tip === 3 ? rk as MaticnaPloca : undefined
  }

  isRAM(rk: RacunarskaKomponenta) {
    return rk.tip === 4 ? rk as RAM : undefined
  }

  isNapajanje(rk: RacunarskaKomponenta) {
    return rk.tip === 5 ? rk as Napajanje : undefined
  }

}
