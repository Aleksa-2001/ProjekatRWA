import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ProdavnicaItemComponent } from "./prodavnica-item/prodavnica-item.component";
import { CommonModule, NgFor } from '@angular/common';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, Observable, of, startWith, tap } from 'rxjs';
import { Prodavnica } from '../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { selectLoading, selectProdavnice } from '../../store/prodavnica/prodavnica.selectors';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-prodavnice',
  imports: [NgFor, CommonModule, ProdavnicaItemComponent, LoadingComponent],
  templateUrl: './prodavnice.component.html',
  styleUrl: './prodavnice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavniceComponent implements OnInit, OnChanges { 

  loading$: Observable<boolean> = of(true)

  prodavnice$: Observable<readonly Prodavnica[]> = of([])
  selectedProdavnice$: Observable<readonly Prodavnica[]> = of([])

  paginationList: number[] = []
  itemsPerPage: number = 6
  currentPage: number = 1

  @Input() search: string = ''
  @Input() selectedNaziviProdavnica: string[] = []

  @Output() brojProdavnica = new EventEmitter<number>()

  @ViewChild('inputProdavnicaSort') inputProdavnicaSort!: ElementRef<HTMLSelectElement>
  @ViewChild('inputProdavnicaRedosledSortiranja') inputProdavnicaRedosledSortiranja!: ElementRef<HTMLSelectElement>
  @ViewChild('inputBrojProdavnicaPoStranici') inputBrojProdavnicaPoStranici!: ElementRef<HTMLSelectElement>

  sort: string = ""
  redosledSortiranja: number = 1

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)

    this.prodavnice$ = this.store.select(selectProdavnice)
    this.selectedProdavnice$ = this.prodavnice$

    this.selectedProdavnice$.pipe(
      filter(prodavnice => !!prodavnice),
      tap(prodavnice => {
        this.brojProdavnica.emit(prodavnice.length)

        const numberOfPages = Math.ceil(prodavnice.length / this.itemsPerPage)
        this.paginationList = []
        for (let i = 1; i <= numberOfPages; i++) {
          this.paginationList.push(i)
        }
      })
    ).subscribe()
  }

  ngOnChanges(): void {
    this.selectedProdavnice$ = combineLatest([
      this.prodavnice$,
      of(this.search),
      of(this.selectedNaziviProdavnica)
    ]).pipe(
      filter(([prodavnice]) => !!prodavnice),
      map(([prodavnice, search, selectedProdavnice]) => {
        const filteredProdavnice = prodavnice.filter(prodavnica => {
          const searchMatch = search.length ? prodavnica.naziv.toLowerCase().includes(search.toLowerCase().trim()) : prodavnice
          const nazivMatch = selectedProdavnice.length ? selectedProdavnice.includes(prodavnica.naziv) : prodavnice
          return searchMatch && nazivMatch
        })

        if (this.sort === "brojRecenzija") filteredProdavnice.sort((a, b) => (a as any).brojRecenzija > (b as any).brojRecenzija ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)
        if (this.sort === "prosecnaOcena") filteredProdavnice.sort((a, b) => (a as any).prosecnaOcena > (b as any).prosecnaOcena ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)
        
        //this.brojProdavnica.emit(filteredProdavnice.length)

        const numberOfPages = Math.ceil(filteredProdavnice.length / this.itemsPerPage)
        this.paginationList = []
        for (let i = 1; i <= numberOfPages; i++) {
          this.paginationList.push(i)
        }

        if (this.currentPage > this.paginationList.length) this.currentPage = this.paginationList.length ? this.paginationList.length : 1

        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        
        return filteredProdavnice.slice(start, end)
      })
    )
  }

  selectPage(page: number) {
    this.currentPage = page
    this.ngOnChanges()
  }

  onChangeSort() {
    this.sort = this.inputProdavnicaSort.nativeElement.value
    this.ngOnChanges()
  }

  onChangeRedosled() {
    this.redosledSortiranja = parseInt(this.inputProdavnicaRedosledSortiranja.nativeElement.value)
    this.ngOnChanges()
  }

  onChangeBrojProdavnicaPoStranici() {
    this.itemsPerPage = parseInt(this.inputBrojProdavnicaPoStranici.nativeElement.value)
    this.ngOnChanges()
  }

}
