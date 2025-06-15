import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ProdavnicaItemComponent } from "./prodavnica-item/prodavnica-item.component";
import { CommonModule, NgFor } from '@angular/common';
import { combineLatest, filter, map, Observable, of, tap } from 'rxjs';
import { Prodavnica } from '../../../models/prodavnica';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectProdavnice } from '../../../store/prodavnica/prodavnica.selectors';

@Component({
  selector: 'app-prodavnice',
  imports: [NgFor, CommonModule, ProdavnicaItemComponent],
  templateUrl: './prodavnice.component.html',
  styleUrl: './prodavnice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavniceComponent implements OnChanges { 

  prodavnice$: Observable<readonly Prodavnica[]> = of([])
  selectedProdavnice$: Observable<readonly Prodavnica[]> = of([])

  @Input() selectedNazivi: string[] = []
  @Output() brojProdavnica = new EventEmitter<number>()

  constructor(private store: Store<AppState>) { 
    this.prodavnice$ = this.store.select(selectProdavnice)
    this.selectedProdavnice$ = this.prodavnice$

    this.selectedProdavnice$.pipe(
      filter(prodavnice => !!prodavnice),
      tap(prodavnice => this.brojProdavnica.emit(prodavnice.length))
    ).subscribe()
  }

  ngOnChanges(): void {
    this.selectedProdavnice$ = combineLatest([
      this.prodavnice$,
      of(this.selectedNazivi)
    ]).pipe(
      filter(([prodavnice, _]) => !!prodavnice),
      map(([prodavnice, selectedProdavnice]) => {
        const filteredProdavnice = prodavnice.filter(prodavnica => {
          const nazivMatch = selectedProdavnice.length ? selectedProdavnice.includes(prodavnica.naziv) : prodavnice
          return nazivMatch
        })

        //this.brojProdavnica.emit(filteredProdavnice.length)
        return filteredProdavnice
      })
    )
  }

}
