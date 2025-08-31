import { CommonModule, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { selectNaziviProdavnica } from '../../store/prodavnica/prodavnica.selectors';
import { selectProizvodjaci, selectTipoviProizvoda, selectType } from '../../store/proizvod/proizvod.selectors';

@Component({
  selector: 'app-filter',
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    CommonModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnChanges { 
  
  @ViewChild('inputMinCena') inputMinCena!: ElementRef<HTMLInputElement>
  @ViewChild('inputMaxCena') inputMaxCena!: ElementRef<HTMLInputElement>

  @ViewChild('rangeMinCena') rangeMinCena!: ElementRef<HTMLInputElement>
  @ViewChild('rangeMaxCena') rangeMaxCena!: ElementRef<HTMLInputElement>

  @Input() searchPage: boolean = false
  
  @Input() brojProdavnica: number = 0
  @Input() brojProizvoda: number = 0
  @Input() cenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  minCena: number = 0
  maxCena: number = Infinity

  naziviProdavnica$: Observable<string[]> = of([])

  tipoviProizvoda$: Observable<string[]> = of([])
  types$: Observable<string[]> = of([])
  proizvodjaci$: Observable<string[]> = of([])

  @Input() sakrijIzborPrikaza: boolean = false

  @Input() prikaziProdavnice: boolean = true
  @Input() prikaziProizvode: boolean = true

  @Input() selectMode: boolean = false

  selectedNaziviProdavnica: string[] = []

  selectedCenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  selectedTipoviProizvoda: string[] = []
  selectedTypes: string[] = []
  selectedProizvodjaci: string[] = []

  @Output() prikaziProdavniceOutput = new EventEmitter<boolean>()
  @Output() prikaziProizvodeOutput = new EventEmitter<boolean>()

  @Output() selectedNaziviProdavnicaOutput = new EventEmitter<string[]>()

  @Output() selectedCenaRangeOutput = new EventEmitter<{ min: number, max: number }>()
  @Output() selectedTipoviProizvodaOutput = new EventEmitter<string[]>()
  @Output() selectedTypesOutput = new EventEmitter<string[]>()
  @Output() selectedProizvodjaciOutput = new EventEmitter<string[]>()

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.naziviProdavnica$ = this.store.select(selectNaziviProdavnica)

    this.tipoviProizvoda$ = this.store.select(selectTipoviProizvoda)
    this.types$ = this.store.select(selectType)
    this.proizvodjaci$ = this.store.select(selectProizvodjaci)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prikaziProizvode'] && changes['prikaziProizvode'].currentValue === true) {
      this.selectedCenaRange = this.cenaRange
      this.minCena = this.cenaRange.min
      this.maxCena = this.cenaRange.max
      this.selectedCenaRangeOutput.emit(this.selectedCenaRange)
    }

    if (this.searchPage && changes['cenaRange']) {
      this.onSelectPrikaz(1)
    }
  }

  onChangeMinCena(event: Event) {
    const cena = parseInt((event.target as HTMLInputElement).value)
    
    if (cena < this.cenaRange.min) this.minCena = this.cenaRange.min
    else if (cena > this.cenaRange.max) this.minCena = this.cenaRange.max
    else this.minCena = Number.isNaN(cena) ? this.minCena : cena

    this.inputMinCena.nativeElement.value = this.minCena.toString()
    this.rangeMinCena.nativeElement.value = this.minCena.toString()

    if(cena >= this.maxCena) {
      this.maxCena = this.minCena
      this.inputMaxCena.nativeElement.value = this.maxCena.toString()
      this.rangeMaxCena.nativeElement.value = this.maxCena.toString()
    }

    this.selectedCenaRange = { min: this.minCena, max: this.maxCena }
    this.selectedCenaRangeOutput.emit(this.selectedCenaRange)
  }

  onChangeMaxCena(event: Event) {
    const cena = parseInt((event.target as HTMLInputElement).value)

    if (cena > this.cenaRange.max) this.maxCena = this.cenaRange.max
    else if (cena < this.cenaRange.min) this.maxCena = this.cenaRange.min
    else this.maxCena = Number.isNaN(cena) ? this.maxCena : cena

    this.inputMaxCena.nativeElement.value = this.maxCena.toString()
    this.rangeMaxCena.nativeElement.value = this.maxCena.toString()

    if(cena <= this.minCena) {
      this.minCena = this.maxCena
      this.inputMinCena.nativeElement.value = this.minCena.toString()
      this.rangeMinCena.nativeElement.value = this.minCena.toString()
    }

    this.selectedCenaRange = { min: this.minCena, max: this.maxCena }
    this.selectedCenaRangeOutput.emit(this.selectedCenaRange)
  }

  onSelectPrikaz(value: number) {
    switch (value) {
      case 1: 
        this.prikaziProdavnice = true
        this.prikaziProizvode = true

        this.prikaziProdavniceOutput.emit(this.prikaziProdavnice)
        this.prikaziProizvodeOutput.emit(this.prikaziProizvode)
        break
      case 2: 
        this.prikaziProdavnice = true
        this.prikaziProizvode = false
        this.selectedCenaRange = this.cenaRange
        this.minCena = this.cenaRange.min
        this.maxCena = this.cenaRange.max
        this.selectedTipoviProizvoda = []
        this.selectedTypes = []
        this.selectedProizvodjaci = []

        this.prikaziProdavniceOutput.emit(this.prikaziProdavnice)
        this.prikaziProizvodeOutput.emit(this.prikaziProizvode)
        this.selectedCenaRangeOutput.emit(this.cenaRange)
        this.selectedTipoviProizvodaOutput.emit(this.selectedTipoviProizvoda)
        this.selectedTypesOutput.emit(this.selectedTypes)
        this.selectedProizvodjaciOutput.emit(this.selectedProizvodjaci)
        break
      case 3: 
        this.prikaziProdavnice = false
        this.prikaziProizvode = true
        this.selectedNaziviProdavnica = []

        this.prikaziProdavniceOutput.emit(this.prikaziProdavnice)
        this.prikaziProizvodeOutput.emit(this.prikaziProizvode)
        this.selectedNaziviProdavnicaOutput.emit(this.selectedNaziviProdavnica)
        break
    }
  }

  onSelectProdavnica(nazivProdavnice: string) {
    if (this.selectedNaziviProdavnica.includes(nazivProdavnice)) this.selectedNaziviProdavnica.splice(this.selectedNaziviProdavnica.indexOf(nazivProdavnice), 1)
    else this.selectedNaziviProdavnica.push(nazivProdavnice)
    this.selectedNaziviProdavnica = [...this.selectedNaziviProdavnica]
    this.selectedNaziviProdavnicaOutput.emit(this.selectedNaziviProdavnica)
  }

  onSelectTipProizvoda(tipProizvoda: string) {
    if (this.selectedTipoviProizvoda.includes(tipProizvoda)) this.selectedTipoviProizvoda.splice(this.selectedTipoviProizvoda.indexOf(tipProizvoda), 1)
    else this.selectedTipoviProizvoda.push(tipProizvoda)
    this.selectedTipoviProizvoda = [...this.selectedTipoviProizvoda]
    this.selectedTipoviProizvodaOutput.emit(this.selectedTipoviProizvoda)
  }

  onSelectType(type: string) {
    if (this.selectedTypes.includes(type)) this.selectedTypes.splice(this.selectedTypes.indexOf(type), 1)
    else this.selectedTypes.push(type)
    this.selectedTypes = [...this.selectedTypes]
    this.selectedTypesOutput.emit(this.selectedTypes)
  }

  onSelectProizvodjac(proizvodjac: string) {
    if (this.selectedProizvodjaci.includes(proizvodjac)) this.selectedProizvodjaci.splice(this.selectedProizvodjaci.indexOf(proizvodjac), 1)
    else this.selectedProizvodjaci.push(proizvodjac)
    this.selectedProizvodjaci = [...this.selectedProizvodjaci]
    this.selectedProizvodjaciOutput.emit(this.selectedProizvodjaci)
  }

  getPercent(value: number) {
    const range = this.cenaRange.max - this.cenaRange.min;
    return ((value - this.cenaRange.min) / range) * 100;
  }

}
