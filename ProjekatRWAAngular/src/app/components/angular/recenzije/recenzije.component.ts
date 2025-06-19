import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, Observable, of } from 'rxjs';
import { Recenzija } from '../../../models/recenzija';
import { RecenzijaItemComponent } from './recenzija-item/recenzija-item.component';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { selectRecenzije } from '../../../store/recenzija/recenzija.selectors';

@Component({
  selector: 'app-recenzije',
  imports: [NgIf, NgFor, CommonModule, RecenzijaItemComponent],
  templateUrl: './recenzije.component.html',
  styleUrl: './recenzije.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecenzijeComponent { 

  recenzije$: Observable<readonly Recenzija[]> = of([])

  constructor(private store: Store<AppState>) {
    this.recenzije$ = this.store.select(selectRecenzije)

    this.recenzije$.pipe(
      filter(recenzije => !!recenzije)
    ).subscribe()
  }

}
