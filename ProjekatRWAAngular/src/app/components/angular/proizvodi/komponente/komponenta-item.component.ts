import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../models/komponente/racunarska-komponenta';
import { KomponentaComponent } from "./komponenta/komponenta.component";
import { CommonModule, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { Observable, of } from 'rxjs';
import * as KomponenteActions from '../../../../store/komponenta/komponenta.actions';
import { selectAllComponents } from '../../../../store/komponenta/komponenta.selectors';

@Component({
  selector: 'app-komponenta-item',
  imports: [NgFor, CommonModule, KomponentaComponent],
  templateUrl: './komponenta-item.component.html',
  styleUrl: './komponenta-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KomponentaItemComponent implements OnInit {

  komponente: Observable<readonly RacunarskaKomponenta[]> = of([])

  constructor(private store: Store<AppState>) { 
    this.store.dispatch(KomponenteActions.loadItems())
    this.komponente = this.store.select(selectAllComponents)
  }

  ngOnInit(): void { 
    
  }

}
