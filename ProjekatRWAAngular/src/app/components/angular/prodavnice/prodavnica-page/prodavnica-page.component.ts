import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, of, take, tap } from 'rxjs';
import { Prodavnica } from '../../../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { ProizvodiComponent } from "../../proizvodi/proizvodi.component";
import { NotFoundComponent } from "../../../../shared/components/not-found/not-found.component";
import { Title } from '@angular/platform-browser';
import { isAdmin } from '../../../../store/auth/auth.selectors';
import { ProdavnicaDialogComponent } from "../../dialog/prodavnica-dialog/prodavnica-dialog.component";
import { ConfirmDialogComponent } from "../../dialog/confirm-dialog/confirm-dialog.component";
import { ProizvodDialogComponent } from "../../dialog/proizvod-dialog/proizvod-dialog.component";
import { RecenzijeComponent } from "../../recenzije/recenzije.component";
import * as ProdavniceActions from '../../../../store/prodavnica/prodavnica.actions'
import * as ProizvodiActions from '../../../../store/proizvod/proizvod.actions'
import * as RecenzijeActions from '../../../../store/recenzija/recenzija.actions'

@Component({
  selector: 'app-prodavnica-page',
  imports: [
    NgIf,
    NgStyle,
    CommonModule,
    ProizvodiComponent,
    NotFoundComponent,
    ProdavnicaDialogComponent,
    ConfirmDialogComponent,
    ProizvodDialogComponent,
    RecenzijeComponent
],
  templateUrl: './prodavnica-page.component.html',
  styleUrl: './prodavnica-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaPageComponent implements OnInit, OnDestroy { 
  
  prodavnicaID!: number
  prodavnica$: Observable<Prodavnica | null> = of()
  isAdmin$: Observable<boolean> = of(false)

  backgroundStyle: { [key: string]: string } = { }
  
  brojProizvoda: number = 0
  
  rating: any = Array(5).fill(0)
  prosek: number = 0

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(isAdmin)
    
    this.prodavnicaID = Number(this.route.snapshot.paramMap.get('id'))
    this.store.dispatch(ProdavniceActions.setSelectedItemID({ prodavnicaID: this.prodavnicaID }))
    this.store.dispatch(ProdavniceActions.loadSelectedItem({ selectedProdavnicaID: this.prodavnicaID }))
    this.prodavnica$ = this.store.select(selectSelectedProdavnica)

    this.prodavnica$.pipe(
      filter(prodavnica => !!prodavnica),
      tap(prodavnica => {
        this.title.setTitle(`${prodavnica.naziv} - ProjekatRWA`)
        this.setBackground('http://localhost:3000/' + prodavnica.slika)
      })
    ).subscribe()

    this.prodavnica$.pipe(
      filter(prodavnica => !!prodavnica),
      take(1),
      tap(prodavnica => {
        this.store.dispatch(ProizvodiActions.loadItems({ prodavnicaID: prodavnica.id }))
        this.store.dispatch(RecenzijeActions.loadItemsProdavnica({ prodavnicaID: prodavnica.id }))
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProdavniceActions.deselectSelectedItem())
  }

  setBackground(slika: string) {
    const timestamp = new Date().getTime()
    const url = `${slika}?t=${timestamp}`
    this.backgroundStyle = {
      "background-image": `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000 100%), url(${url})`,
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-color": "#6c757d"
    }
  }

  getBrojProizvoda(brojProizvoda: number) {
    this.brojProizvoda = brojProizvoda
  }

  getProsek(prosek: number) {
    this.prosek = prosek
  }

  starHalf(i: number) {
    return Math.floor(this.prosek) === i && this.prosek - Math.floor(this.prosek) >= 0.5
  }

  starEmpty(i: number) {
    return Math.floor(this.prosek) === i && this.prosek - Math.floor(this.prosek) < 0.5
  }

}
