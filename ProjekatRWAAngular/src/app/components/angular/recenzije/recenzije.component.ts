import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, map, Observable, of, reduce, tap } from 'rxjs';
import { Recenzija } from '../../../models/recenzija';
import { RecenzijaItemComponent } from './recenzija-item/recenzija-item.component';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { selectRecenzije } from '../../../store/recenzija/recenzija.selectors';
import { RecenzijaDialogComponent } from "../dialog/recenzija-dialog/recenzija-dialog.component";
import { ConfirmDialogComponent } from "../dialog/confirm-dialog/confirm-dialog.component";
import { User } from '../../../models/user';
import { selectUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-recenzije',
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    RecenzijaItemComponent,
    RecenzijaDialogComponent,
    ConfirmDialogComponent
],
  templateUrl: './recenzije.component.html',
  styleUrl: './recenzije.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecenzijeComponent { 

  user$: Observable<User | null> = of()
  recenzije$: Observable<readonly Recenzija[]> = of([])

  prosek: number = 0

  @Input() profileMode: boolean = false
  @Output() prosecnaOcena: EventEmitter<number> = new EventEmitter<number>()

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser)
    this.recenzije$ = this.store.select(selectRecenzije)

    this.recenzije$.pipe(
      filter(recenzije => !!recenzije),
      map(recenzije => {
        const ocene = recenzije.map(recenzija => recenzija.ocena)
        const sum = ocene.reduce((a, b) => a + b, 0)
        this.prosek = ocene.length ? sum / ocene.length : 0
        this.prosecnaOcena.emit(this.prosek)
      })
    ).subscribe()
  }

}
