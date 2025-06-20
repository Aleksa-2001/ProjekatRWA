import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { filter, Observable, of } from 'rxjs';
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

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser)
    this.recenzije$ = this.store.select(selectRecenzije)

    this.recenzije$.pipe(
      filter(recenzije => !!recenzije)
    ).subscribe()
  }

}
