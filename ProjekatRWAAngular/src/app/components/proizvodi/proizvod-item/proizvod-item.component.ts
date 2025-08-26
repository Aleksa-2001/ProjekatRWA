import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Proizvod } from '../../../models/proizvod';
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { StarsComponent } from "../../stars/stars.component";
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectSelectedProizvod } from '../../../store/proizvod/proizvod.selectors';
import { filter, take, tap } from 'rxjs';
import { Racunar } from '../../../models/racunar';
import { MaticnaPloca } from '../../../models/komponente/maticna-ploca';
import { CPU } from '../../../models/komponente/cpu';
import { RAM } from '../../../models/komponente/ram';
import { GPU } from '../../../models/komponente/gpu';
import { Napajanje } from '../../../models/komponente/napajanje';
import { Kuciste } from '../../../models/komponente/kuciste';
import { environment } from '../../../../environments/environment';
import * as ProizvodiActions from '../../../store/proizvod/proizvod.actions'
import * as CartActions from "../../../store/cart/cart.actions"

@Component({
  selector: 'app-proizvod-item',
  imports: [NgIf, CommonModule, RouterModule, StarsComponent],
  templateUrl: './proizvod-item.component.html',
  styleUrl: './proizvod-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodItemComponent { 

  apiUrl = environment.apiUrl

  @Input() proizvod!: Proizvod
  @Input() displayMode!: number
  @Input() selectMode!: boolean
  @Input() editItemID: number = -1

  prosek: number = 0
  brojRecenzija: number = 0

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.prosek = (this.proizvod as any).prosecnaOcena ?? 0
    this.brojRecenzija = (this.proizvod as any).brojRecenzija ?? 0
  }

  addToCart(proizvod: Proizvod) {
    this.store.dispatch(CartActions.addToCart({ proizvod }))
  }

  updateRacunar(type: string) {
    this.store.select(selectSelectedProizvod).pipe(
      filter(proizvod => !!proizvod),
      take(1),
      tap(proizvod => {
        const racunar = { ...proizvod } as Racunar
        const data: any = { }

        switch (type) {
          case 'MaticnaPloca':
            data.maticnaPloca = this.proizvod as MaticnaPloca
            break
          case 'CPU':
            data.cpu = this.proizvod as CPU
            break
          case 'RAM':
            data.ram = this.proizvod as RAM
            break
          case 'Skladiste':
            data.skladiste = []
            racunar.skladiste.forEach(item => data.skladiste.push(item.id))
            if (this.editItemID !== -1) {
              const index = data.skladiste.indexOf(this.editItemID)
              if (!data.skladiste.includes(this.proizvod.id)) data.skladiste[index] = this.proizvod.id
            }
            else {
              data.skladiste.push(this.proizvod.id)
            }
            break
          case 'GPU':
            data.gpu = this.proizvod as GPU
            break
          case 'Napajanje':
            data.napajanje = this.proizvod as Napajanje
            break
          case 'Kuciste':
            data.kuciste = this.proizvod as Kuciste
            break
        }

        this.store.dispatch(ProizvodiActions.updateRacunar({ selectedProizvodID: proizvod.id, selectedProizvod: data }))
      })
    ).subscribe()
  }

}
