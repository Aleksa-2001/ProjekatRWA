import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AppState } from '../../store/app-state';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { concatMap, distinctUntilChanged, filter, map, Observable, of, Subscription, take, tap } from 'rxjs';
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
export class SelectItemComponent implements OnInit, OnDestroy { 

  loading$: Observable<boolean> = of(true)
  error$: Observable<any> = of()

  proizvodID: number = -1
  type: string = ''
  tipKomponenteTitle: string = ''
  routeSub!: Subscription

  proizvod$: Observable<Proizvod | null> = of()
  brojProizvoda$: Observable<number> = of(0)
  
  isAdmin$: Observable<boolean> = of(false)

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.error$ = this.store.select(selectError)

    this.proizvod$ = this.store.select(selectSelectedProizvod)
    this.type = this.route.snapshot.queryParamMap.get('type') ?? ''

    switch (this.type) {
      case "CPU":
        this.tipKomponenteTitle = "procesor"
        break
      case "GPU":
        this.tipKomponenteTitle = "grafičku kartu"
        break
      case "MaticnaPloca":
        this.tipKomponenteTitle = "matičnu ploču"
        break
      case "RAM":
        this.tipKomponenteTitle = "RAM memoriju"
        break
      case "Skladiste":
        this.tipKomponenteTitle = "skladišnu memoriju"
        break
      case "Napajanje":
        this.tipKomponenteTitle = "napajanje"
        break
      case "Kuciste":
        this.tipKomponenteTitle = "kućište"
        break
      default:
        this.loading$ = of(false)
        this.error$ = of("Greska: Tip komponente nije ispravan")
        this.title.setTitle(`Izaberi - ProjekatRWA`)
        return
    }

    const proizvodiPipe$ = this.proizvod$.pipe(
      filter(proizvod => !!proizvod),
      take(1),
      tap(proizvod => {
        if (proizvod.type === "Racunar") {
          this.store.dispatch(ProizvodiActions.loadItems({ prodavnicaID: proizvod.prodavnica.id, tip: this.type }))
          this.title.setTitle(`Izaberi ${this.tipKomponenteTitle} - ProjekatRWA`)
        }
        else {
          this.loading$ = of(false)
          this.error$ = of("Greska: Proizvod nije racunar")
          this.title.setTitle(`Izaberi - ProjekatRWA`)
        }
      })
    )

    this.routeSub = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))), 
      tap(proizvodID => {
        this.store.dispatch(ProizvodiActions.setSelectedItemID({ proizvodID: proizvodID }))
        this.store.dispatch(ProizvodiActions.loadSelectedItem({ selectedProizvodID: proizvodID }))
      }),
      concatMap(proizvodID => proizvodID > 0 ? proizvodiPipe$ : of(null))
    ).subscribe()

    this.brojProizvoda$ = this.store.select(selectBrojProizvoda)
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
  }

}
