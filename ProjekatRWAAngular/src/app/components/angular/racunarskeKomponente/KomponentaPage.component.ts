import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../models/racunarskaKomponenta';
import { RacunarskaKomponentaComponent } from "../racunarskeKomponente/RacunarskaKomponenta/RacunarskaKomponenta.component";
import { CommonModule, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { Observable, of } from 'rxjs';
import * as KomponenteActions from '../../../store/komponente.actions';
import { selectAllComponents } from '../../../store/komponente.selectors';

@Component({
  selector: 'app-komponenta-page',
  imports: [NgFor, CommonModule, RacunarskaKomponentaComponent],
  templateUrl: './KomponentaPage.component.html',
  styleUrl: './KomponentaPage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KomponentaPageComponent implements OnInit {

  komponente: Observable<readonly RacunarskaKomponenta[]> = of([])

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { 
    this.store.dispatch(KomponenteActions.loadItems())
    this.komponente = this.store.select(selectAllComponents)
  }

}
