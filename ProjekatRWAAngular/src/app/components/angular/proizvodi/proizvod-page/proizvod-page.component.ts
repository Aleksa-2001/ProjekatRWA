import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, of, tap } from 'rxjs';
import { Proizvod } from '../../../../models/proizvod';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import * as ProizvodiActions from '../../../../store/proizvod/proizvod.actions'
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';
import { NotFoundComponent } from "../../../../shared/components/not-found/not-found.component";
import { KomponentaPageComponent } from "./komponenta-page/komponenta-page.component";
import { Title } from '@angular/platform-browser';
import { DialogComponent } from "../../dialog/dialog.component";
import { isAdmin } from '../../../../store/auth/auth.selectors';

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
    DialogComponent,
    NotFoundComponent
  ],
  templateUrl: './proizvod-page.component.html',
  styleUrl: './proizvod-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodPageComponent implements OnInit, OnDestroy { 

  isAdmin$: Observable<boolean> = of(false)

  proizvodID!: number
  proizvod$: Observable<Proizvod | null> = of()

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(isAdmin)

    this.proizvodID = Number(this.route.snapshot.paramMap.get('id'))
    this.store.dispatch(ProizvodiActions.setSelectedItemID({ proizvodID: this.proizvodID }))
    this.store.dispatch(ProizvodiActions.loadSelectedItem({ selectedProizvodID: this.proizvodID }))
    this.proizvod$ = this.store.select(selectSelectedProizvod)

    this.proizvod$.pipe(
      filter(proizvod => !!proizvod),
      tap(proizvod => this.title.setTitle(`${proizvod.naziv} - ProjekatRWA`))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.store.dispatch(ProizvodiActions.deselectSelectedItem())
  }

}
