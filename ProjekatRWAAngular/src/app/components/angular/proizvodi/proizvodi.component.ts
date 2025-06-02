import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProizvodItemComponent } from './proizvod-item/proizvod-item.component';
import { filter, Observable, of, tap } from 'rxjs';
import { Proizvod } from '../../../models/proizvod';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectProizvodi } from '../../../store/proizvod/proizvod.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proizvodi',
  imports: [NgIf, NgFor, CommonModule, ProizvodItemComponent],
  templateUrl: './proizvodi.component.html',
  styleUrl: './proizvodi.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodiComponent { 

  prodavnicaID: number
  proizvodi$: Observable<readonly Proizvod[]> = of([])

  displayMode: number = 1;
  
  @Output() brojProizvoda = new EventEmitter<number>()
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { 
    this.prodavnicaID = Number(this.route.snapshot.paramMap.get('id'));
    this.proizvodi$ = this.store.select(selectProizvodi)
    this.proizvodi$.pipe(
      filter(proizvodi => !!proizvodi),
      tap(proizvodi => this.brojProizvoda.emit(proizvodi.length))
    ).subscribe()

    if (localStorage.getItem('proizvod_display_mode')) {
      this.displayMode = parseInt(localStorage.getItem('proizvod_display_mode')!)
    }
  }

  onDisplayModeChange(mode: number) {
    localStorage.setItem('proizvod_display_mode', mode.toString())
    this.displayMode = mode;
  }

}
