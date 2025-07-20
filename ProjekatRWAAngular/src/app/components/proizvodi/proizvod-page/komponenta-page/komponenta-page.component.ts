import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../models/racunarska-komponenta';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { CPUComponent } from './cpu/cpu.component';
import { GPUComponent } from "./gpu/gpu.component";
import { RAMComponent } from './ram/ram.component';
import { RAM } from '../../../../models/komponente/ram';
import { CPU } from '../../../../models/komponente/cpu';
import { GPU } from '../../../../models/komponente/gpu';
import { MaticnaPlocaComponent } from "./maticna-ploca/maticna-ploca.component";
import { MaticnaPloca } from '../../../../models/komponente/maticna-ploca';
import { Skladiste } from '../../../../models/komponente/skladiste';
import { Napajanje } from '../../../../models/komponente/napajanje';
import { SkladisteComponent } from "./skladiste/skladiste.component";
import { NapajanjeComponent } from "./napajanje/napajanje.component";
import { KucisteComponent } from "./kuciste/kuciste.component";
import { Kuciste } from '../../../../models/komponente/kuciste';

@Component({
  selector: 'app-komponenta-page',
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    CommonModule,
    CPUComponent,
    GPUComponent,
    RAMComponent,
    MaticnaPlocaComponent,
    SkladisteComponent,
    NapajanjeComponent,
    KucisteComponent
],
  templateUrl: './komponenta-page.component.html',
  styleUrl: './komponenta-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KomponentaPageComponent {
  
  @Input() komponenta!: RacunarskaKomponenta

  getCPU(): CPU {
    return this.komponenta as CPU
  }

  getGPU(): GPU {
    return this.komponenta as GPU
  }

  getRAM(): RAM {
    return this.komponenta as RAM
  }

  getMaticnaPloca(): MaticnaPloca {
    return this.komponenta as MaticnaPloca
  }

  getSkladiste(): Skladiste {
    return this.komponenta as Skladiste
  }

  getNapajanje(): Napajanje {
    return this.komponenta as Napajanje
  }

  getKuciste(): Kuciste {
    return this.komponenta as Kuciste
  }

}
