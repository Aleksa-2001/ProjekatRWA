import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, of, take, tap } from 'rxjs';
import { Proizvod } from '../../../models/proizvod';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { selectSelectedProizvod } from '../../../store/proizvod/proizvod.selectors';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { KomponentaPageComponent } from "./komponenta-page/komponenta-page.component";
import { StarsComponent } from "../../stars/stars.component";
import { Title } from '@angular/platform-browser';
import { isAdmin } from '../../../store/auth/auth.selectors';
import { ProizvodDialogComponent } from "../../dialog/proizvod-dialog/proizvod-dialog.component";
import { ConfirmDialogComponent } from "../../dialog/confirm-dialog/confirm-dialog.component";
import { RecenzijeComponent } from "../../recenzije/recenzije.component";
import * as ProizvodiActions from '../../../store/proizvod/proizvod.actions'
import * as RecenzijeActions from '../../../store/recenzija/recenzija.actions'

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
    StarsComponent
],
  templateUrl: './proizvod-page.component.html',
  styleUrl: './proizvod-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodPageComponent implements OnInit, OnDestroy { 

  isAdmin$: Observable<boolean> = of(false)

  proizvodID!: number
  proizvod$: Observable<Proizvod | null> = of()

  image: string = ""

  prosek: number = 0
  brojRecenzija: number = 0

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(isAdmin)

    this.proizvodID = Number(this.route.snapshot.paramMap.get('id'))
    this.store.dispatch(ProizvodiActions.setSelectedItemID({ proizvodID: this.proizvodID }))
    this.store.dispatch(ProizvodiActions.loadSelectedItem({ selectedProizvodID: this.proizvodID }))
    this.proizvod$ = this.store.select(selectSelectedProizvod)

    this.proizvod$.pipe(
      filter(proizvod => !!proizvod),
      tap(proizvod => {
        this.title.setTitle(`${proizvod.naziv} - ProjekatRWA`)
        this.setImage('http://localhost:3000/' + proizvod.slika)
      })
    ).subscribe()

    this.proizvod$.pipe(
      filter(proizvod => !!proizvod),
      take(1),
      tap(proizvod => {
        this.store.dispatch(RecenzijeActions.loadItemsProizvod({ proizvodID: proizvod.id }))
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProizvodiActions.deselectSelectedItem())
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
  
}
