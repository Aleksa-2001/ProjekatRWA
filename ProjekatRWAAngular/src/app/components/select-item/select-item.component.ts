import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FilterComponent } from "../filter/filter.component";
import { ProizvodiComponent } from "../proizvodi/proizvodi.component";
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { filter, Observable, of, take, tap } from 'rxjs';
import { Prodavnica } from '../../models/prodavnica';
import { Proizvod } from '../../models/proizvod';
import * as ProdavniceActions from '../../store/prodavnica/prodavnica.actions'
import * as ProizvodiActions from '../../store/proizvod/proizvod.actions'
import { selectSelectedProizvod } from '../../store/proizvod/proizvod.selectors';

@Component({
  selector: 'app-select-item',
  imports: [
    NgIf, 
    CommonModule, 
    FilterComponent, 
    ProizvodiComponent
  ],
  templateUrl: './select-item.component.html',
  styleUrl: './select-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectItemComponent implements OnInit { 

  @ViewChild('inputSearchProizvodi') inputSearchProizvodi!: ElementRef<HTMLInputElement>

  proizvodID!: number
  type: string = ''

  proizvod$: Observable<Proizvod | null> = of()
  isAdmin$: Observable<boolean> = of(false)

  search: string = ''

  backgroundStyle: { [key: string]: string } = { }
  
  brojProizvoda: number = 0
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
    this.title.setTitle("Izaberi - ProjekatRWA")

    this.proizvodID = Number(this.route.snapshot.paramMap.get('id'))
    this.type = this.route.snapshot.queryParamMap.get('type') ?? ''
    
    this.store.dispatch(ProizvodiActions.setSelectedItemID({ proizvodID: this.proizvodID }))
    this.store.dispatch(ProizvodiActions.loadSelectedItem({ selectedProizvodID: this.proizvodID }))
    this.proizvod$ = this.store.select(selectSelectedProizvod)

    this.proizvod$.pipe(
      filter(proizvod => !!proizvod),
      take(1),
      tap(proizvod => {
        this.store.dispatch(ProizvodiActions.loadItems({ prodavnicaID: proizvod.prodavnica.id }))
      })
    ).subscribe()
  }

  onChangeInput() {
    this.search = this.inputSearchProizvodi.nativeElement.value
  }

  getBrojProizvoda(brojProizvoda: number) {
    this.brojProizvoda = brojProizvoda
  }

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
