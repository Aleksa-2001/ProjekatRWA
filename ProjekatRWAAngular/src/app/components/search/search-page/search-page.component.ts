import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { loadItemsBySearch as loadProdavnice } from '../../../store/prodavnica/prodavnica.actions';
import { loadItemsBySearch as loadProizvodi } from '../../../store/proizvod/proizvod.actions';
import { SearchComponent } from '../search.component';
import { CommonModule, NgIf } from '@angular/common';
import { selectBrojProdavnica } from '../../../store/prodavnica/prodavnica.selectors';
import { selectBrojProizvoda } from '../../../store/proizvod/proizvod.selectors';
import { ItemListComponent } from "../../item-list/item-list.component";

@Component({
  selector: 'app-search-page',
  imports: [
    NgIf,
    CommonModule,
    SearchComponent,
    ItemListComponent
],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit { 

  query: string = ''
  
  brojProdavnica$: Observable<number> = of(0)
  brojProizvoda$: Observable<number> = of(0)
  data$: Observable<{ brojProdavnica: number, brojProizvoda: number }> = of()

  cenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  minCena: number = 0
  maxCena: number = Infinity

  prikaziProdavnice: boolean = true
  prikaziProizvode: boolean = true

  selectedNaziviProdavnica: string[] = []

  selectedCenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  selectedTipoviProizvoda: string[] = []
  selectedTypes: string[] = []
  selectedProizvodjaci: string[] = []

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params) => {
        this.query = params['q']
        if (this.query) {
          this.title.setTitle(`Pretraga: \"${this.query}\" - ProjekatRWA`)
          this.store.dispatch(loadProdavnice({ search: this.query }))
          this.store.dispatch(loadProizvodi({ search: this.query }))

          this.brojProdavnica$ = this.store.select(selectBrojProdavnica)
          this.brojProizvoda$ = this.store.select(selectBrojProizvoda)

          this.data$ = combineLatest([this.brojProdavnica$, this.brojProizvoda$]).pipe(
            map(([brojProdavnica, brojProizvoda]) => ({ brojProdavnica, brojProizvoda }))
          )
        }
        else {
          this.title.setTitle(`Pretraga - ProjekatRWA`)
        }
      })
    ).subscribe()
  }

  getCenaRange(cenaRange: { min: number, max: number }) {
    this.cenaRange = cenaRange
    this.selectedCenaRange = this.cenaRange
    this.minCena = cenaRange.min
    this.maxCena = cenaRange.max
  }

  getPrikaziProdavnice(prikaziProdavnice: boolean) {
    this.prikaziProdavnice = prikaziProdavnice
  }

  getPrikaziProizvode(prikaziProizvode: boolean) {
    this.prikaziProizvode = prikaziProizvode
  }

  getSelectedNaziviProdavnica(selectedNaziviProdavnica: string[]) {
    this.selectedNaziviProdavnica = selectedNaziviProdavnica
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
