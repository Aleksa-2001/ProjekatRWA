import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ProizvodItemComponent } from './proizvod-item/proizvod-item.component';
import { combineLatest, filter, map, Observable, of, Subscription, tap } from 'rxjs';
import { Proizvod } from '../../models/proizvod';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { selectProizvodi, selectLoading, selectError } from '../../store/proizvod/proizvod.selectors';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-proizvodi',
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    ProizvodItemComponent,
    LoadingComponent
  ],
  templateUrl: './proizvodi.component.html',
  styleUrl: './proizvodi.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodiComponent implements OnInit, OnChanges, OnDestroy { 

  loading$: Observable<boolean> = of(true)
  error$: Observable<any> = of()

  prodavnicaID: number = -1
  proizvodi$: Observable<readonly Proizvod[]> = of([])
  selectedProizvodi$: Observable<readonly Proizvod[]> = of([])
  proizvodiSub!: Subscription

  displayMode: number = 1

  search: string = ''
  
  paginationList: number[] = []
  itemsPerPage: number = 12
  currentPage: number = 1

  @Input() selectMode: boolean = false
  @Input() editItemID: number = -1
  @Input() selectedCenaRange: { min: number, max: number } = { min: 0, max: Infinity }
  @Input() selectedTypes: string[] = []
  @Input() selectedTipoviProizvoda: string[] = []
  @Input() selectedProizvodjaci: string[] = []

  @Output() cenaRange = new EventEmitter<{ min: number, max: number }>()

  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>

  @ViewChild('inputProizvodSort') inputProizvodSort!: ElementRef<HTMLSelectElement>
  @ViewChild('inputProizvodRedosledSortiranja') inputProizvodRedosledSortiranja!: ElementRef<HTMLSelectElement>
  @ViewChild('inputBrojProizvodaPoStranici') inputBrojProizvodaPoStranici!: ElementRef<HTMLSelectElement>

  sort: string = ""
  redosledSortiranja: number = 1
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }
  
  ngOnInit(): void { 
    this.loading$ = this.store.select(selectLoading)
    this.error$ = this.store.select(selectError)
  
    this.prodavnicaID = Number(this.route.snapshot.paramMap.get('id'))
    this.proizvodi$ = this.store.select(selectProizvodi)
    this.selectedProizvodi$ = this.proizvodi$

    this.proizvodiSub = this.selectedProizvodi$.pipe(
      filter(proizvodi => !!proizvodi),
      tap(proizvodi => {
        const cene = proizvodi.map(proizvod => proizvod.cena)
        this.selectedCenaRange = { min: Math.min(...cene), max: Math.max(...cene) }
        this.cenaRange.emit(this.selectedCenaRange)
        
        // const numberOfPages = Math.ceil(proizvodi.length / this.itemsPerPage)
        // this.paginationList = []
        // for (let i = 1; i <= numberOfPages; i++) {
        //   this.paginationList.push(i)
        // }

        this.ngOnChanges()
      })
    ).subscribe()

    if (localStorage.getItem('proizvod_display_mode')) {
      this.displayMode = parseInt(localStorage.getItem('proizvod_display_mode')!)
    }
  }

  ngOnChanges(): void {
    this.selectedProizvodi$ = combineLatest([
      this.proizvodi$,
      of(this.search),
      of(this.selectedCenaRange),
      of(this.selectedTipoviProizvoda),
      of(this.selectedTypes),
      of(this.selectedProizvodjaci),
    ]).pipe(
      filter(([proizvodi]) => !!proizvodi),
      map(([proizvodi, search, selectedCenaRange, selectedTipoviProizvoda, selectedTypes, selectedProizvodjaci]) => {
        const filteredProizvodi = proizvodi.filter(proizvod => {
          const searchMatch = search.length ? proizvod.naziv.toLowerCase().includes(search.toLowerCase().trim()) : proizvodi
          const tipProizvodaMatch = selectedTipoviProizvoda.length ? selectedTipoviProizvoda.includes(proizvod.tipProizvoda) : proizvodi
          const typeMatch = selectedTypes.length ? selectedTypes.includes(proizvod.type) : proizvodi
          const proizvodjacMatch = selectedProizvodjaci.length ? selectedProizvodjaci.includes(proizvod.proizvodjac) : proizvodi
          return searchMatch && tipProizvodaMatch && typeMatch && proizvodjacMatch
        }).filter(proizvod => proizvod.cena >= selectedCenaRange.min && proizvod.cena <= selectedCenaRange.max)
        
        if (this.sort === "cena") filteredProizvodi.sort((a, b) => a.cena > b.cena ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)
        if (this.sort === "brojRecenzija") filteredProizvodi.sort((a, b) => ((a as any).brojRecenzija > (b as any).brojRecenzija) || ((a as any).brojRecenzija === (b as any).brojRecenzija && (a as any).prosecnaOcena > (b as any).prosecnaOcena) ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)
        if (this.sort === "prosecnaOcena") filteredProizvodi.sort((a, b) => ((a as any).prosecnaOcena > (b as any).prosecnaOcena) || ((a as any).prosecnaOcena === (b as any).prosecnaOcena && (a as any).brojRecenzija > (b as any).brojRecenzija) ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)

        const numberOfPages = Math.ceil(filteredProizvodi.length / this.itemsPerPage)
        this.paginationList = []
        for (let i = 1; i <= numberOfPages; i++) {
          this.paginationList.push(i)
        }

        if (this.currentPage > this.paginationList.length) this.currentPage = this.paginationList.length ? this.paginationList.length : 1

        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        
        return filteredProizvodi.slice(start, end)
      })
    )
  }

  ngOnDestroy(): void {
    this.proizvodiSub.unsubscribe()
  }

  onChangeInput() {
    this.search = this.inputSearch.nativeElement.value
    this.ngOnChanges()
  }

  onDisplayModeChange(mode: number) {
    localStorage.setItem('proizvod_display_mode', mode.toString())
    this.displayMode = mode;
  }

  selectPage(page: number) {
    this.currentPage = page
    this.ngOnChanges()
  }

  onChangeSort() {
    this.sort = this.inputProizvodSort.nativeElement.value
    this.ngOnChanges()
  }

  onChangeRedosled() {
    this.redosledSortiranja = parseInt(this.inputProizvodRedosledSortiranja.nativeElement.value)
    this.ngOnChanges()
  }

  onChangeBrojProizvodaPoStranici() {
    this.itemsPerPage = parseInt(this.inputBrojProizvodaPoStranici.nativeElement.value)
    this.ngOnChanges()
  }

}
