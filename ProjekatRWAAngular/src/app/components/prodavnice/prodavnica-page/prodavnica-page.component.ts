import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, filter, map, Observable, of, take, tap } from 'rxjs';
import { Prodavnica } from '../../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectError, selectLoading, selectSelectedProdavnica } from '../../../store/prodavnica/prodavnica.selectors';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { ProizvodiComponent } from "../../proizvodi/proizvodi.component";
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { Title } from '@angular/platform-browser';
import { isAdmin } from '../../../store/auth/auth.selectors';
import { ProdavnicaDialogComponent } from "../../dialog/prodavnica-dialog/prodavnica-dialog.component";
import { ConfirmDialogComponent } from "../../dialog/confirm-dialog/confirm-dialog.component";
import { ProizvodDialogComponent } from "../../dialog/proizvod-dialog/proizvod-dialog.component";
import { RecenzijeComponent } from "../../recenzije/recenzije.component";
import { StarsComponent } from "../../stars/stars.component";
import { FilterComponent } from "../../filter/filter.component";
import * as ProdavniceActions from '../../../store/prodavnica/prodavnica.actions'
import * as ProizvodiActions from '../../../store/proizvod/proizvod.actions'
import * as RecenzijeActions from '../../../store/recenzija/recenzija.actions'
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { selectBrojProizvoda } from '../../../store/proizvod/proizvod.selectors';
import { environment } from '../../../../environments/environment';
import { selectLoading as selectLoadingProizvodi } from '../../../store/proizvod/proizvod.selectors';

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
    RecenzijeComponent,
    StarsComponent,
    FilterComponent,
    LoadingComponent
],
  templateUrl: './prodavnica-page.component.html',
  styleUrl: './prodavnica-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaPageComponent implements OnInit, OnDestroy { 

  loading$: Observable<boolean> = of(true)
  loadingProizvodi$: Observable<boolean> = of(true)
  error$: Observable<any> = of()
  
  @ViewChild('inputSearchProizvodi') inputSearchProizvodi!: ElementRef<HTMLInputElement>

  prodavnicaID!: number
  prodavnica$: Observable<Prodavnica | null> = of()
  isAdmin$: Observable<boolean> = of(false)

  search: string = ''

  backgroundStyle: { [key: string]: string } = { }
  
  brojProizvoda$: Observable<number> = of(0)
  prosek: number = 0
  brojRecenzija: number = 0
  
  cenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  minCena: number = 0
  maxCena: number = Infinity

  selectedCenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  selectedTipoviProizvoda: string[] = []
  selectedTypes: string[] = []
  selectedProizvodjaci: string[] = []

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
      distinctUntilChanged(),
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
  
  onChangeInput() {
    this.search = this.inputSearchProizvodi.nativeElement.value
  }

  //getBrojProizvoda(brojProizvoda: number) {
    //this.brojProizvoda = brojProizvoda
  //}

  getProsek(prosek: number) {
    this.prosek = prosek
  }

  getBrojRecenzija(brojRecenzija: number) {
    this.brojRecenzija = brojRecenzija
  }
  
  getCenaRange(cenaRange: { min: number, max: number }) {
    this.cenaRange = cenaRange
    this.selectedCenaRange = this.cenaRange
    this.minCena = cenaRange.min
    this.maxCena = cenaRange.max
  }

  getSelectedCenaRange(selectedCenaRange: { min: number, max: number }) {
    this.selectedCenaRange = selectedCenaRange
  }

  getSelectedTipoviProizvoda(selectedTipoviProizvoda: string[]) {
    this.selectedTipoviProizvoda = selectedTipoviProizvoda
  }

  getSelectedTypes(selectedTypes: string[]) {
    this.selectedTypes = selectedTypes
  }

  getSelectedProizvodjaci(selectedProizvodjaci: string[]) {
    this.selectedProizvodjaci = selectedProizvodjaci
  }

}
