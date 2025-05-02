import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Proizvod } from '../../../../models/proizvod';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { CommonModule, NgIf } from '@angular/common';
import * as ProizvodiActions from '../../../../store/proizvod/proizvod.actions'
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';
import { NotFoundComponent } from "../../../../shared/components/not-found/not-found.component";

@Component({
  selector: 'app-proizvod-page',
  imports: [NgIf, CommonModule, RouterModule, NotFoundComponent],
  templateUrl: './proizvod-page.component.html',
  styleUrl: './proizvod-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodPageComponent { 

  proizvodID!: number
  proizvod$: Observable<Proizvod | null> = of()

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.proizvodID = Number(this.route.snapshot.paramMap.get('id'))
    this.store.dispatch(ProizvodiActions.setSelectedItemID({ proizvodID: this.proizvodID }))
    this.store.dispatch(ProizvodiActions.loadSelectedItem({ selectedProizvodID: this.proizvodID }))
    this.proizvod$ = this.store.select(selectSelectedProizvod)
  }

}
