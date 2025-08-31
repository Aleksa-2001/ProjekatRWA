import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

import { RacunarskaOprema } from '../../../../models/racunarska-oprema';
import { Monitor } from '../../../../models/oprema/monitor';
import { Tastatura } from '../../../../models/oprema/tastatura';
import { Mis } from '../../../../models/oprema/mis';
import { Slusalice } from '../../../../models/oprema/slusalice';
import { Zvucnik } from '../../../../models/oprema/zvucnik';
import { Stampac } from '../../../../models/oprema/stampac';

import { MonitorComponent } from "./monitor/monitor.component";
import { TastaturaComponent } from "./tastatura/tastatura.component";
import { ZvucnikComponent } from "./zvucnik/zvucnik.component";
import { MisComponent } from './mis/mis.component';
import { SlusaliceComponent } from './slusalice/slusalice.component';
import { StampacComponent } from './stampac/stampac.component';

@Component({
  selector: 'app-oprema-page',
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    CommonModule,
    MonitorComponent,
    TastaturaComponent,
    MisComponent,
    SlusaliceComponent,
    ZvucnikComponent,
    StampacComponent
  ],
  templateUrl: './oprema-page.component.html',
  styleUrl: './oprema-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpremaPageComponent {

  @Input() oprema!: RacunarskaOprema

  getMonitor(): Monitor {
    return this.oprema as Monitor
  }

  getTastatura(): Tastatura {
    return this.oprema as Tastatura
  }

  getMis(): Mis {
    return this.oprema as Mis
  }

  getSlusalice(): Slusalice {
    return this.oprema as Slusalice
  }

  getZvucnik(): Zvucnik {
    return this.oprema as Zvucnik
  }

  getStampac(): Stampac {
    return this.oprema as Stampac
  }

}
