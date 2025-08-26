import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, filter, map, Observable, of, Subscription, tap } from 'rxjs';
import { Proizvod } from '../../../models/proizvod';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { selectError, selectLoading, selectSelectedProizvod } from '../../../store/proizvod/proizvod.selectors';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { KomponentaPageComponent } from "./komponenta-page/komponenta-page.component";
import { RacunarPageComponent } from "./racunar-page/racunar-page.component";
import { StarsComponent } from "../../stars/stars.component";
import { Title } from '@angular/platform-browser';
import { isAdmin } from '../../../store/auth/auth.selectors';
import { ProizvodDialogComponent } from "../../dialog/proizvod-dialog/proizvod-dialog.component";
import { ConfirmDialogComponent } from "../../dialog/confirm-dialog/confirm-dialog.component";
import { RecenzijeComponent } from "../../recenzije/recenzije.component";
import { Racunar } from '../../../models/racunar';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { environment } from '../../../../environments/environment';
import * as ProizvodiActions from '../../../store/proizvod/proizvod.actions'
import * as RecenzijeActions from '../../../store/recenzija/recenzija.actions'
import * as CartActions from "../../../store/cart/cart.actions"

@Component({
  selector: 'app-proizvod-page',
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    CommonModule,
    RouterModule,
    KomponentaPageComponent,
    NotFoundComponent,
    ProizvodDialogComponent,
    ConfirmDialogComponent,
    RecenzijeComponent,
    StarsComponent,
    RacunarPageComponent,
    LoadingComponent
  ],
  templateUrl: './proizvod-page.component.html',
  styleUrl: './proizvod-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodPageComponent implements OnInit, OnDestroy { 

  loading$: Observable<boolean> = of(true)
  error$: Observable<any> = of()

  isAdmin$: Observable<boolean> = of(false)

  proizvodID!: number
  proizvod$: Observable<Proizvod | null> = of()
  routeSub!: Subscription

  image: string = ""

  prosek: number = 0
  brojRecenzija: number = 0

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.error$ = this.store.select(selectError)

    this.proizvod$ = this.store.select(selectSelectedProizvod)
    let firstLoad = true
    
    this.isAdmin$ = this.store.select(isAdmin)

    const proizvodPipe$ = this.proizvod$.pipe(
      filter(proizvod => !!proizvod),
      tap(proizvod => {
        this.title.setTitle(`${proizvod.naziv} - ${environment.appName}`)
        this.setImage(environment.apiUrl + proizvod.slika)

        if (firstLoad) {
          this.store.dispatch(RecenzijeActions.loadItemsProizvod({ proizvodID: proizvod.id }))
          firstLoad = false
        }
      })
    )

    this.routeSub = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      tap(proizvodID => {
        this.store.dispatch(ProizvodiActions.setSelectedItemID({ proizvodID }))
        this.store.dispatch(ProizvodiActions.loadSelectedItem({ selectedProizvodID: proizvodID }))
        firstLoad = true
      }),
      concatMap(proizvodID => proizvodID > 0 ? proizvodPipe$ : of(null))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProizvodiActions.deselectSelectedItem())
    this.routeSub.unsubscribe()
  }

  getRacunar(proizvod: Proizvod) {
    return proizvod as Racunar
  }

  setImage(slika: string) {
    const timestamp = new Date().getTime()
    this.image = `${slika}?t=${timestamp}`
  }

  getProsek(prosek: number) {
    this.prosek = prosek
  }

  getBrojRecenzija(brojRecenzija: number) {
    this.brojRecenzija = brojRecenzija
  }

  addToCart(proizvod: Proizvod) {
    this.store.dispatch(CartActions.addToCart({ proizvod: {
      ...proizvod,
      brojRecenzija: this.brojRecenzija,
      prosecnaOcena: this.prosek
    } as Proizvod }))
  }
  
}
