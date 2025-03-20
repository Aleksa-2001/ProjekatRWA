import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../models/racunarskaKomponenta';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { CPUComponent } from "../CPU/CPU.component";
import { GPUComponent } from "../GPU/GPU.component";
import { CPU } from '../../../../models/cpu';
import { GPU } from '../../../../models/gpu';

@Component({
  selector: 'app-racunarska-komponenta',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, CPUComponent, GPUComponent],
  templateUrl: './RacunarskaKomponenta.component.html',
  styleUrl: './RacunarskaKomponenta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RacunarskaKomponentaComponent implements OnInit {

  @Input() rk!: RacunarskaKomponenta

  ngOnInit(): void {
    console.log(this.rk)
  }

  isCPU(rk: RacunarskaKomponenta) {
    return rk.tip === 1 ? rk as CPU : undefined;
  }
  
  isGPU(rk: RacunarskaKomponenta) {
    return rk.tip === 2 ? rk as GPU : undefined;
  }
}
