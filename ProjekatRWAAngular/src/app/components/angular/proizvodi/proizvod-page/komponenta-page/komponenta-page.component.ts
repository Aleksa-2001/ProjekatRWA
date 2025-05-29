import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../../models/racunarska-komponenta';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { CPUComponent } from './cpu/cpu.component';
import { GPUComponent } from "./gpu/gpu.component";
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/app-state';
import { selectSelectedProizvod } from '../../../../../store/proizvod/proizvod.selectors';
import { Observable, of } from 'rxjs';
import { RAMComponent } from './ram/ram.component';

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
export class KomponentaPageComponent implements OnInit {
  
  komponenta$: Observable<RacunarskaKomponenta | null> = of()

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.komponenta$ = this.store.select(selectSelectedProizvod)
  }

}
