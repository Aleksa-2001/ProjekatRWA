import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, of, tap } from 'rxjs';
import { Prodavnica } from '../../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectError, selectLoading, selectSelectedProdavnica } from '../../../store/prodavnica/prodavnica.selectors';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { Title } from '@angular/platform-browser';
import { isAdmin } from '../../../store/auth/auth.selectors';
import { ProdavnicaDialogComponent } from "../../dialog/prodavnica-dialog/prodavnica-dialog.component";
import { ConfirmDialogComponent } from "../../dialog/confirm-dialog/confirm-dialog.component";
import { ProizvodDialogComponent } from "../../dialog/proizvod-dialog/proizvod-dialog.component";
import { RecenzijeComponent } from "../../recenzije/recenzije.component";
import { StarsComponent } from "../../stars/stars.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { selectBrojProizvoda } from '../../../store/proizvod/proizvod.selectors';
import { environment } from '../../../../environments/environment';
import { selectLoading as selectLoadingProizvodi } from '../../../store/proizvod/proizvod.selectors';
import { ItemListComponent } from "../../item-list/item-list.component";
import * as ProdavniceActions from '../../../store/prodavnica/prodavnica.actions'
import * as ProizvodiActions from '../../../store/proizvod/proizvod.actions'
import * as RecenzijeActions from '../../../store/recenzija/recenzija.actions'

@Component({
  selector: 'app-prodavnica-page',
  imports: [
    NgIf,
    NgStyle,
    CommonModule,
    NotFoundComponent,
    ProdavnicaDialogComponent,
    ConfirmDialogComponent,
    ProizvodDialogComponent,
    RecenzijeComponent,
    StarsComponent,
    LoadingComponent,
    ItemListComponent
],
  templateUrl: './prodavnica-page.component.html',
  styleUrl: './prodavnica-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaPageComponent implements OnInit, OnDestroy { 

  loading$: Observable<boolean> = of(true)
  loadingProizvodi$: Observable<boolean> = of(true)
  error$: Observable<any> = of()

  prodavnicaID!: number
  prodavnica$: Observable<Prodavnica | null> = of()
  isAdmin$: Observable<boolean> = of(false)

  backgroundStyle: { [key: string]: string } = { }
  
  brojProizvoda$: Observable<number> = of(0)
  prosek: number = 0
  brojRecenzija: number = 0

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.loadingProizvodi$ = this.store.select(selectLoadingProizvodi)
    this.error$ = this.store.select(selectError)

    this.prodavnica$ = this.store.select(selectSelectedProdavnica)
    let firstLoad = true

    this.isAdmin$ = this.store.select(isAdmin)

    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      tap(prodavnicaID => {
        this.store.dispatch(ProdavniceActions.setSelectedItemID({ prodavnicaID: prodavnicaID }))
        this.store.dispatch(ProdavniceActions.loadSelectedItem({ selectedProdavnicaID: prodavnicaID }))
        firstLoad = true
      })
    ).subscribe()

    this.prodavnica$.pipe(
      filter(prodavnica => !!prodavnica),
      tap(prodavnica => {
        this.title.setTitle(`${prodavnica.naziv} - ProjekatRWA`)
        this.setBackground(environment.apiUrl + prodavnica.slika)

        if (firstLoad) {
          this.store.dispatch(ProizvodiActions.loadItems({ prodavnicaID: prodavnica.id }))
          this.store.dispatch(RecenzijeActions.loadItemsProdavnica({ prodavnicaID: prodavnica.id }))
          firstLoad = false
        }
      })
    ).subscribe()

    this.brojProizvoda$ = this.store.select(selectBrojProizvoda)
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
  
  getProsek(prosek: number) {
    this.prosek = prosek
  }

  getBrojRecenzija(brojRecenzija: number) {
    this.brojRecenzija = brojRecenzija
  }

}
