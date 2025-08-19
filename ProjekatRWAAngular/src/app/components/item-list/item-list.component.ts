import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { CommonModule, NgIf } from '@angular/common';
import { FilterComponent } from "../filter/filter.component";
import { ProdavniceComponent } from "../prodavnice/prodavnice.component";
import { ProizvodiComponent } from "../proizvodi/proizvodi.component";
import { combineLatest, map, Observable, of } from 'rxjs';
import { selectBrojProdavnica, selectLoading as selectLoadingProdavnice } from '../../store/prodavnica/prodavnica.selectors';
import { selectBrojProizvoda, selectCenaRange, selectLoading as selectLoadingProizvodi } from '../../store/proizvod/proizvod.selectors';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-item-list',
  imports: [
    NgIf,
    CommonModule,
    FilterComponent,
    ProdavniceComponent,
    ProizvodiComponent,
    LoadingComponent
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit { 
  
  loadingProdavnice$: Observable<boolean> = of(false)
  loadingProizvodi$: Observable<boolean> = of(false)

  data$: Observable<any> = of()
  
  @ViewChild('inputSearchProdavnice') inputSearchProdavnice!: ElementRef<HTMLInputElement>
  @ViewChild('inputSearchProizvodi') inputSearchProizvodi!: ElementRef<HTMLInputElement>

  @Input() searchPage: boolean = false
  
  @Input() prodavnicePage: boolean = false

  @Input() selectMode: boolean = false
  @Input() selectedRacunarID: number = -1

  @Input() sakrijIzborPrikaza: boolean = false
  @Input() prikaziProdavnice: boolean = true
  @Input() prikaziProizvode: boolean = true

  selectedNaziviProdavnica: string[] = []

  selectedCenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  selectedTipoviProizvoda: string[] = []
  selectedTypes: string[] = []
  selectedProizvodjaci: string[] = []

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadingProdavnice$ = this.store.select(selectLoadingProdavnice)
    this.loadingProizvodi$ = this.store.select(selectLoadingProizvodi)
    
    this.data$ = combineLatest([
      this.store.select(selectBrojProdavnica),
      this.store.select(selectBrojProizvoda),
      this.store.select(selectCenaRange)
    ]).pipe(
      map(([brojProdavnica, brojProizvoda, cenaRange]) => {
        return {
          brojProdavnica: this.prikaziProdavnice ? brojProdavnica : 0, 
          brojProizvoda: this.prikaziProizvode ? brojProizvoda : 0, 
          cenaRange
        }
      })
    )
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
