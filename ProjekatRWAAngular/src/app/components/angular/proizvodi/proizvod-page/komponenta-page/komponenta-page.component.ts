import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../../models/racunarska-komponenta';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { CPUComponent } from './cpu/cpu.component';
import { GPUComponent } from "./gpu/gpu.component";
import { RAMComponent } from './ram/ram.component';
import { RAM } from '../../../../../models/komponente/ram';
import { CPU } from '../../../../../models/komponente/cpu';
import { GPU } from '../../../../../models/komponente/gpu';

@Component({
  selector: 'app-komponenta-page',
  imports: [
    NgIf, 
    NgSwitch, 
    NgSwitchCase, 
    CommonModule, 
    CPUComponent, 
    GPUComponent, 
    RAMComponent
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

}
