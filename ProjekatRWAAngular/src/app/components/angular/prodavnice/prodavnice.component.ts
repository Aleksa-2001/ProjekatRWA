import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProdavnicaItemComponent } from "./prodavnica-item/prodavnica-item.component";
import { CommonModule, NgFor } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Prodavnica } from '../../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectProdavnice } from '../../../store/prodavnica/prodavnica.selectors';

@Component({
  selector: 'app-prodavnice',
  imports: [NgFor, CommonModule, ProdavnicaItemComponent],
  templateUrl: './prodavnice.component.html',
  styleUrl: './prodavnice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavniceComponent { 

  prodavnice: Observable<readonly Prodavnica[]> = of([])

  constructor(private store: Store<AppState>) { 
    this.prodavnice = this.store.select(selectProdavnice)
  }

}
