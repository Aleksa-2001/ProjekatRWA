import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prodavnica } from '../../../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { ActivatedRoute } from '@angular/router';
import * as ProdavniceActions from '../../../../store/prodavnica/prodavnica.actions'
import { CommonModule, NgIf } from '@angular/common';
import { ProizvodiComponent } from "../../proizvodi/proizvodi.component";

@Component({
  selector: 'app-prodavnica-page',
  imports: [NgIf, CommonModule, ProizvodiComponent],
  templateUrl: './prodavnica-page.component.html',
  styleUrl: './prodavnica-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaPageComponent { 
  
  prodavnicaID!: number
  prodavnica$: Observable<Prodavnica | null> = of()

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.prodavnicaID = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(ProdavniceActions.setSelectedItemID({ prodavnicaID: this.prodavnicaID }))
    this.store.dispatch(ProdavniceActions.loadSelectedItem({ selectedProdavnicaID: this.prodavnicaID }))
    this.prodavnica$ = this.store.select(selectSelectedProdavnica)
  }

}
