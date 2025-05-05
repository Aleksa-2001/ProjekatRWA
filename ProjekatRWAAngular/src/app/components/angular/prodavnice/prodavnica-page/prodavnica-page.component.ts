import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, of, take, tap } from 'rxjs';
import { Prodavnica } from '../../../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { ActivatedRoute } from '@angular/router';
import * as ProdavniceActions from '../../../../store/prodavnica/prodavnica.actions'
import { CommonModule, NgIf } from '@angular/common';
import { ProizvodiComponent } from "../../proizvodi/proizvodi.component";
import { NotFoundComponent } from "../../../../shared/components/not-found/not-found.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-prodavnica-page',
  imports: [NgIf, CommonModule, ProizvodiComponent, NotFoundComponent],
  templateUrl: './prodavnica-page.component.html',
  styleUrl: './prodavnica-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaPageComponent implements OnInit, OnDestroy { 
  
  prodavnicaID!: number
  prodavnica$: Observable<Prodavnica | null> = of()

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.prodavnicaID = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(ProdavniceActions.setSelectedItemID({ prodavnicaID: this.prodavnicaID }))
    this.store.dispatch(ProdavniceActions.loadSelectedItem({ selectedProdavnicaID: this.prodavnicaID }))
    this.prodavnica$ = this.store.select(selectSelectedProdavnica)

    this.prodavnica$.pipe(
      filter(prodavnica => !!prodavnica),
      take(1),
      tap(prodavnica => this.title.setTitle(`${prodavnica.naziv} - ProjekatRWA`))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProdavniceActions.deselectSelectedItem())
  }

  protected loadBackground(prodavnica: Prodavnica) {
    return `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000 100%), url(${prodavnica.slika})`
  }

}
