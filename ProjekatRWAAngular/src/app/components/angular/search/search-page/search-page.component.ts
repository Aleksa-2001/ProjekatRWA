import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { Observable, of, tap } from 'rxjs';
import { ProizvodiComponent } from "../../proizvodi/proizvodi.component";
import { ProdavniceComponent } from "../../prodavnice/prodavnice.component";
import { loadItemsBySearch as loadProdavnice } from '../../../../store/prodavnica/prodavnica.actions';
import { loadItemsBySearch as loadProizvodi } from '../../../../store/proizvod/proizvod.actions';
import { SearchComponent } from '../search.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { selectNaziviProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { selectProizvodjaci, selectTipoviProizvoda, selectType } from '../../../../store/proizvod/proizvod.selectors';

@Component({
  selector: 'app-search-page',
  imports: [NgIf, NgFor, CommonModule, ProdavniceComponent, ProizvodiComponent, SearchComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit { 

  query: string = ''
  brojProdavnica: number = 0
  brojProizvoda: number = 0

  prikaziProdavnice: boolean = true
  prikaziProizvode: boolean = true

  naziviProdavnica$: Observable<string[]> = of([])

  tipoviProizvoda$: Observable<string[]> = of([])
  types$: Observable<string[]> = of([])
  proizvodjaci$: Observable<string[]> = of([])

  selectedNaziviProdavnica: string[] = []

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

          this.naziviProdavnica$ = this.store.select(selectNaziviProdavnica)

          this.tipoviProizvoda$ = this.store.select(selectTipoviProizvoda)
          this.types$ = this.store.select(selectType)
          this.proizvodjaci$ = this.store.select(selectProizvodjaci)
        }
        else {
          this.title.setTitle(`Pretraga - ProjekatRWA`)
        }
      })
    ).subscribe()
  }

  getBrojProdavnica(brojProdavnica: number) {
    this.brojProdavnica = brojProdavnica
  }

  getBrojProizvoda(brojProizvoda: number) {
    this.brojProizvoda = brojProizvoda
  }



  onSelectPrikaz(value: number) {
    switch (value) {
      case 1: 
        this.prikaziProdavnice = true
        this.prikaziProizvode = true
        break
      case 2: 
        this.prikaziProdavnice = true
        this.prikaziProizvode = false
        break
      case 3: 
        this.prikaziProdavnice = false
        this.prikaziProizvode = true
        break
    }
  }

  onSelectProdavnica(nazivProdavnice: string) {
    if (this.selectedNaziviProdavnica.includes(nazivProdavnice)) this.selectedNaziviProdavnica.splice(this.selectedNaziviProdavnica.indexOf(nazivProdavnice), 1)
    else this.selectedNaziviProdavnica.push(nazivProdavnice)
    this.selectedNaziviProdavnica = [...this.selectedNaziviProdavnica]
  }

  onSelectTipProizvoda(tipProizvoda: string) {
    if (this.selectedTipoviProizvoda.includes(tipProizvoda)) this.selectedTipoviProizvoda.splice(this.selectedTipoviProizvoda.indexOf(tipProizvoda), 1)
    else this.selectedTipoviProizvoda.push(tipProizvoda)
    this.selectedTipoviProizvoda = [...this.selectedTipoviProizvoda]
  }

  onSelectType(type: string) {
    if (this.selectedTypes.includes(type)) this.selectedTypes.splice(this.selectedTypes.indexOf(type), 1)
    else this.selectedTypes.push(type)
    this.selectedTypes = [...this.selectedTypes]
  }

  onSelectProizvodjac(proizvodjac: string) {
    if (this.selectedProizvodjaci.includes(proizvodjac)) this.selectedProizvodjaci.splice(this.selectedProizvodjaci.indexOf(proizvodjac), 1)
    else this.selectedProizvodjaci.push(proizvodjac)
    this.selectedProizvodjaci = [...this.selectedProizvodjaci]
  }

}
