import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../models/komponente/racunarska-komponenta';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { CPUComponent } from "../cpu/cpu.component";
import { GPUComponent } from '../gpu/gpu.component';
import { CPU } from '../../../../models/komponente/cpu';
import { GPU } from '../../../../models/komponente/gpu';

@Component({
  selector: 'app-komponenta',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, CPUComponent, GPUComponent],
  templateUrl: './komponenta.component.html',
  styleUrl: './komponenta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KomponentaComponent implements OnInit {

  @Input() rk!: RacunarskaKomponenta

  ngOnInit(): void {
    //console.log(this.rk)
  }

  isCPU(rk: RacunarskaKomponenta) {
    return rk.tip === 1 ? rk as CPU : undefined;
  }
  
  isGPU(rk: RacunarskaKomponenta) {
    return rk.tip === 2 ? rk as GPU : undefined;
  }
}
