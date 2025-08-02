import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, of, take, tap } from 'rxjs';
import { Proizvod } from '../../models/proizvod';
import * as ProizvodiActions from '../../store/proizvod/proizvod.actions'
import { selectBrojProizvoda, selectCenaRange, selectError, selectLoading, selectSelectedProizvod } from '../../store/proizvod/proizvod.selectors';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ItemListComponent } from "../item-list/item-list.component";

@Component({
  selector: 'app-select-item',
  imports: [
    NgIf,
    CommonModule,
    LoadingComponent,
    ItemListComponent
],
  templateUrl: './select-item.component.html',
  styleUrl: './select-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectItemComponent implements OnInit { 

  loading$: Observable<boolean> = of(true)
  error$: Observable<any> = of()

  proizvodID: number = -1
  type: string = ''

  proizvod$: Observable<Proizvod | null> = of()
  brojProizvoda$: Observable<number> = of(0)
  
  isAdmin$: Observable<boolean> = of(false)

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.error$ = this.store.select(selectError)

    this.title.setTitle("Izaberi - ProjekatRWA")

    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))), 
      distinctUntilChanged(), 
      tap(proizvodID => {
        this.store.dispatch(ProizvodiActions.setSelectedItemID({ proizvodID: proizvodID }))
        this.store.dispatch(ProizvodiActions.loadSelectedItem({ selectedProizvodID: proizvodID }))
      })
    ).subscribe()
    
    this.type = this.route.snapshot.queryParamMap.get('type') ?? ''
    
    this.proizvod$ = this.store.select(selectSelectedProizvod)

    this.proizvod$.pipe(
      filter(proizvod => !!proizvod),
      take(1),
      tap(proizvod => {
        this.store.dispatch(ProizvodiActions.loadItems({ prodavnicaID: proizvod.prodavnica.id, tip: this.type }))
      })
    ).subscribe()

    this.brojProizvoda$ = this.store.select(selectBrojProizvoda)
  }

}
