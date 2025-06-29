import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ProizvodItemComponent } from './proizvod-item/proizvod-item.component';
import { combineLatest, filter, map, Observable, of, tap } from 'rxjs';
import { Proizvod } from '../../../models/proizvod';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectProizvodi } from '../../../store/proizvod/proizvod.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proizvodi',
  imports: [NgIf, NgFor, CommonModule, ProizvodItemComponent],
  templateUrl: './proizvodi.component.html',
  styleUrl: './proizvodi.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodiComponent implements OnInit, OnChanges { 

  prodavnicaID: number = -1
  proizvodi$: Observable<readonly Proizvod[]> = of([])
  selectedProizvodi$: Observable<readonly Proizvod[]> = of([])

  displayMode: number = 1;
  
  @Input() selectedCenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  @Input() selectedTypes: string[] = []
  @Input() selectedTipoviProizvoda: string[] = []
  @Input() selectedProizvodjaci: string[] = []

  @Output() brojProizvoda = new EventEmitter<number>()
  @Output() cenaRange = new EventEmitter<{ min: number, max: number }>()

  @ViewChild('inputProizvodSort') inputProizvodSort!: ElementRef<HTMLSelectElement>
  @ViewChild('inputProizvodRedosledSortiranja') inputProizvodRedosledSortiranja!: ElementRef<HTMLSelectElement>

  sort: string = ""
  redosledSortiranja: number = 1
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }
  
  ngOnInit(): void { 
    this.prodavnicaID = Number(this.route.snapshot.paramMap.get('id'))
    this.proizvodi$ = this.store.select(selectProizvodi)
    this.selectedProizvodi$ = this.proizvodi$

    this.selectedProizvodi$.pipe(
      filter(proizvodi => !!proizvodi),
      tap(proizvodi => {
        this.brojProizvoda.emit(proizvodi.length)
        const cene = proizvodi.map(proizvod => proizvod.cena)
        this.selectedCenaRange = { min: Math.min(...cene), max: Math.max(...cene) }
        this.cenaRange.emit(this.selectedCenaRange)
      })
    ).subscribe()

    if (localStorage.getItem('proizvod_display_mode')) {
      this.displayMode = parseInt(localStorage.getItem('proizvod_display_mode')!)
    }
  }

  ngOnChanges(): void {
    this.selectedProizvodi$ = combineLatest([
      this.proizvodi$,
      of(this.selectedCenaRange),
      of(this.selectedTipoviProizvoda),
      of(this.selectedTypes),
      of(this.selectedProizvodjaci),
    ]).pipe(
      filter(([proizvodi]) => !!proizvodi),
      map(([proizvodi, selectedCenaRange, selectedTipoviProizvoda, selectedTypes, selectedProizvodjaci]) => {        
        const filteredProizvodi = proizvodi.filter(proizvod => {
          const tipProizvodaMatch = selectedTipoviProizvoda.length ? selectedTipoviProizvoda.includes(proizvod.tipProizvoda) : proizvodi
          const typeMatch = selectedTypes.length ? selectedTypes.includes(proizvod.type) : proizvodi
          const proizvodjacMatch = selectedProizvodjaci.length ? selectedProizvodjaci.includes(proizvod.proizvodjac) : proizvodi
          return tipProizvodaMatch && typeMatch && proizvodjacMatch
        }).filter(proizvod => proizvod.cena >= selectedCenaRange.min && proizvod.cena <= selectedCenaRange.max)
        
        if (this.sort === "cena") filteredProizvodi.sort((a, b) => a.cena > b.cena ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)
        if (this.sort === "brojRecenzija") filteredProizvodi.sort((a, b) => (a as any).brojRecenzija > (b as any).brojRecenzija ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)
        if (this.sort === "prosecnaOcena") filteredProizvodi.sort((a, b) => (a as any).prosecnaOcena > (b as any).prosecnaOcena ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)

        //this.brojProizvoda.emit(filteredProizvodi.length)
        return filteredProizvodi
      })
    )
  }

  onDisplayModeChange(mode: number) {
    localStorage.setItem('proizvod_display_mode', mode.toString())
    this.displayMode = mode;
  }

  onChangeSort() {
    this.sort = this.inputProizvodSort.nativeElement.value
    this.ngOnChanges()
  }

  onChangeRedosled() {
    this.redosledSortiranja = parseInt(this.inputProizvodRedosledSortiranja.nativeElement.value)
    this.ngOnChanges()
  }

}
