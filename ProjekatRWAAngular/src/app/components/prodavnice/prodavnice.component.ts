import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ProdavnicaItemComponent } from "./prodavnica-item/prodavnica-item.component";
import { CommonModule, NgFor } from '@angular/common';
import { combineLatest, filter, map, Observable, of, Subscription, tap } from 'rxjs';
import { Prodavnica } from '../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { selectError, selectLoading, selectProdavnice } from '../../store/prodavnica/prodavnica.selectors';
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
  error$: Observable<any> = of()

  prodavnice$: Observable<readonly Prodavnica[]> = of([])
  selectedProdavnice$: Observable<readonly Prodavnica[]> = of([])
  prodavniceSub!: Subscription

  search: string = ''

  paginationList: number[] = []
  itemsPerPage: number = 6
  currentPage: number = 1

  @Input() homePage: boolean = false
  @Input() prodavnicePage: boolean = false
  @Input() selectedNaziviProdavnica: string[] = []
  @Input() selectedGradovi: string[] = []

  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>

  @ViewChild('inputProdavnicaSort') inputProdavnicaSort!: ElementRef<HTMLSelectElement>
  @ViewChild('inputProdavnicaRedosledSortiranja') inputProdavnicaRedosledSortiranja!: ElementRef<HTMLSelectElement>
  @ViewChild('inputBrojProdavnicaPoStranici') inputBrojProdavnicaPoStranici!: ElementRef<HTMLSelectElement>

  sort: string = ""
  redosledSortiranja: number = 1

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.error$ = this.store.select(selectError)

    this.prodavnice$ = this.store.select(selectProdavnice)
    this.selectedProdavnice$ = this.prodavnice$

    this.prodavniceSub = this.selectedProdavnice$.pipe(
      filter(prodavnice => !!prodavnice),
      tap(() => {
        // const numberOfPages = Math.ceil(prodavnice.length / this.itemsPerPage)
        // this.paginationList = []
        // for (let i = 1; i <= numberOfPages; i++) {
        //   this.paginationList.push(i)
        // }
        this.ngOnChanges()
      })
    ).subscribe()
  }

  ngOnChanges(): void {
    this.selectedProdavnice$ = combineLatest([
      this.prodavnice$,
      of(this.search),
      of(this.selectedNaziviProdavnica),
      of(this.selectedGradovi)
    ]).pipe(
      filter(([prodavnice]) => !!prodavnice),
      map(([prodavnice, search, selectedProdavnice, selectedGradovi]) => {
        if (this.homePage) {
          return [...prodavnice].sort((a, b) => ((a as any).prosecnaOcena > (b as any).prosecnaOcena) || ((a as any).prosecnaOcena === (b as any).prosecnaOcena && (a as any).brojRecenzija > (b as any).brojRecenzija) ? -1 : 1)
        }
        else {
          const filteredProdavnice = prodavnice.filter(prodavnica => {
            const searchMatch = search.length 
              ? prodavnica.naziv.toLowerCase().includes(search.toLowerCase().trim()) 
              || prodavnica.adresa.toLowerCase().includes(search.toLowerCase().trim()) 
              || prodavnica.grad.toLowerCase().includes(search.toLowerCase().trim()) 
              : prodavnice
            const nazivMatch = selectedProdavnice.length ? selectedProdavnice.includes(prodavnica.naziv) : prodavnice
            const gradMatch = selectedGradovi.length ? selectedGradovi.includes(prodavnica.grad) : prodavnice
            return searchMatch && nazivMatch && gradMatch
          })

          if (this.sort === "brojRecenzija") filteredProdavnice.sort((a, b) => ((a as any).brojRecenzija > (b as any).brojRecenzija) || ((a as any).brojRecenzija === (b as any).brojRecenzija && (a as any).prosecnaOcena > (b as any).prosecnaOcena) ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)
          if (this.sort === "prosecnaOcena") filteredProdavnice.sort((a, b) => ((a as any).prosecnaOcena > (b as any).prosecnaOcena) || ((a as any).prosecnaOcena === (b as any).prosecnaOcena && (a as any).brojRecenzija > (b as any).brojRecenzija) ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)

          const numberOfPages = Math.ceil(filteredProdavnice.length / this.itemsPerPage)
          this.paginationList = []
          for (let i = 1; i <= numberOfPages; i++) {
            this.paginationList.push(i)
          }

          if (this.currentPage > this.paginationList.length) this.currentPage = this.paginationList.length ? this.paginationList.length : 1

          const start = (this.currentPage - 1) * this.itemsPerPage
          const end = start + this.itemsPerPage
          
          return filteredProdavnice.slice(start, end)
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.prodavniceSub.unsubscribe()
  }

  onChangeInput() {
    this.search = this.inputSearch.nativeElement.value
    this.ngOnChanges()
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
