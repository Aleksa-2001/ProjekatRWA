import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../models/racunarska-komponenta';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { CPUComponent } from "../cpu/cpu.component";
import { GPUComponent } from '../gpu/gpu.component';
import { CPU } from '../../../../models/cpu';
import { GPU } from '../../../../models/gpu';

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
