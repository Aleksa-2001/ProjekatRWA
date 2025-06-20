import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Recenzija } from '../../../../models/recenzija';
import { CommonModule, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { isAdmin, selectUser } from '../../../../store/auth/auth.selectors';
import { User } from '../../../../models/user';
import * as RecenzijeActions from '../../../../store/recenzija/recenzija.actions'

@Component({
  selector: 'app-recenzija-item',
  imports: [NgIf, CommonModule],
  templateUrl: './recenzija-item.component.html',
  styleUrl: './recenzija-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecenzijaItemComponent implements OnInit {
  
  user$: Observable<User | null> = of()
  isAdmin$: Observable<boolean> = of(false)

  @Input() recenzija!: Recenzija

  rating: readonly any[] = Array(5).fill(0)

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser)
    this.isAdmin$ = this.store.select(isAdmin)
  }

  selectRecenzija(recenzijaID: number) {
    this.store.dispatch(RecenzijeActions.setSelectedItemID({ recenzijaID: recenzijaID }))
    this.store.dispatch(RecenzijeActions.loadSelectedItem({ selectedRecenzijaID: recenzijaID }))
  }

}
