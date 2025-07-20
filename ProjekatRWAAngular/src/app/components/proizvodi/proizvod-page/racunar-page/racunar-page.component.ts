import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Racunar } from '../../../../models/racunar';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import * as ProizvodiActions from '../../../../store/proizvod/proizvod.actions'
import * as RecenzijeActions from '../../../../store/recenzija/recenzija.actions'
import { Observable, of } from 'rxjs';
import { isAdmin } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-racunar-page',
  imports: [
    NgIf, 
    NgFor, 
    CommonModule,
    RouterModule
  ],
  templateUrl: './racunar-page.component.html',
  styleUrl: './racunar-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RacunarPageComponent implements OnInit { 

  isAdmin$: Observable<boolean> = of(false)

  @Input() racunar!: Racunar

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(isAdmin)
  }

  navigate(proizvodID: number) {
    this.store.dispatch(ProizvodiActions.setSelectedItemID({ proizvodID: proizvodID }))
    this.store.dispatch(ProizvodiActions.loadSelectedItem({ selectedProizvodID: proizvodID }))
    this.store.dispatch(RecenzijeActions.loadItemsProizvod({ proizvodID: proizvodID }))
  }

}
