import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Racunar } from '../../../../models/racunar';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import * as ProizvodiActions from '../../../../store/proizvod/proizvod.actions'
import * as RecenzijeActions from '../../../../store/recenzija/recenzija.actions'
import { filter, Observable, of, take, tap } from 'rxjs';
import { isAdmin } from '../../../../store/auth/auth.selectors';
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';

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

  deleteComponent(type: string) {
    this.store.select(selectSelectedProizvod).pipe(
      filter(proizvod => !!proizvod),
      take(1),
      tap(proizvod => {
        const racunar = { ...proizvod } as Racunar
        const data: any = { }

        switch (type) {
          case 'MaticnaPloca':
            data.maticnaPloca = null
            break
          case 'CPU':
            data.cpu = null
            break
          case 'RAM':
            data.ram = null
            break
          case 'Skladiste':
            //data.skladiste = []
            //racunar.skladiste.forEach(item => data.skladiste.push(item.id))
            //data.skladiste.push(this.proizvod.id)
            break
          case 'GPU':
            data.gpu = null
            break
          case 'Napajanje':
            data.napajanje = null
            break
          case 'Kuciste':
            data.kuciste = null
            break
        }

        this.store.dispatch(ProizvodiActions.updateRacunar({ selectedProizvodID: racunar.id, selectedProizvod: data }))
      })
    ).subscribe()
  }
}
