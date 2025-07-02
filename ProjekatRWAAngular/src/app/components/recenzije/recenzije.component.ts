import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { combineLatest, filter, map, Observable, of } from 'rxjs';
import { Recenzija } from '../../models/recenzija';
import { RecenzijaItemComponent } from './recenzija-item/recenzija-item.component';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { selectRecenzije, selectUnetaRecenzija } from '../../store/recenzija/recenzija.selectors';
import { RecenzijaDialogComponent } from "../dialog/recenzija-dialog/recenzija-dialog.component";
import { ConfirmDialogComponent } from "../dialog/confirm-dialog/confirm-dialog.component";
import { User } from '../../models/user';
import { selectUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-recenzije',
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    RecenzijaItemComponent,
    RecenzijaDialogComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './recenzije.component.html',
  styleUrl: './recenzije.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecenzijeComponent implements OnInit, OnChanges { 

  user$: Observable<User | null> = of()
  recenzije$: Observable<readonly Recenzija[]> = of([])
  selectedRecenzije$: Observable<readonly Recenzija[]> = of([])
  unetaRecenzija$: Observable<boolean> = of()

  prosek: number = 0

  @Input() profileMode: boolean = false
  @Output() prosecnaOcena: EventEmitter<number> = new EventEmitter<number>()
  @Output() brojRecenzija: EventEmitter<number> = new EventEmitter<number>()

  @ViewChild('inputRecenzijaSort') inputRecenzijaSort!: ElementRef<HTMLSelectElement>
  @ViewChild('inputRecenzijaRedosledSortiranja') inputRecenzijaRedosledSortiranja!: ElementRef<HTMLSelectElement>

  sort: string = ""
  redosledSortiranja: number = 1

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser)
    this.recenzije$ = this.store.select(selectRecenzije)
    this.selectedRecenzije$ = this.recenzije$

    this.unetaRecenzija$ = this.store.select(selectUnetaRecenzija)

    this.selectedRecenzije$.pipe(
      filter(recenzije => !!recenzije),
      map(recenzije => {
        const ocene = recenzije.map(recenzija => recenzija.ocena)
        const sum = ocene.reduce((a, b) => a + b, 0)
        this.prosek = ocene.length ? sum / ocene.length : 0
        this.prosecnaOcena.emit(this.prosek)
        this.brojRecenzija.emit(ocene.length)
      })
    ).subscribe()
  }

  ngOnChanges(): void {
    this.selectedRecenzije$ = combineLatest([this.recenzije$]).pipe(
      filter(([recenzije]) => !!recenzije),
      map(([recenzije]) => {
        const filteredRecenzije = recenzije.filter(() => { return recenzije })

        if (this.sort === "ocena") filteredRecenzije.sort((a, b) => a.ocena > b.ocena ? 1 * this.redosledSortiranja : -1 * this.redosledSortiranja)
        return filteredRecenzije
      })
    )
  }

  onChangeSort() {
    this.sort = this.inputRecenzijaSort.nativeElement.value
    this.ngOnChanges()
  }

  onChangeRedosled() {
    this.redosledSortiranja = parseInt(this.inputRecenzijaRedosledSortiranja.nativeElement.value)
    this.ngOnChanges()
  }

}
