import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { filter, take, tap } from 'rxjs';
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';
import { Router } from '@angular/router';
import * as ProdavniceActions from '../../../../store/prodavnica/prodavnica.actions'
import * as ProizvodiActions from '../../../../store/proizvod/proizvod.actions'

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent { 

  @Input() title!: string

  constructor(private router: Router, private store: Store<AppState>) { }

  onDelete() {
    if (this.title.includes('Obriši prodavnicu')) {
      console.log('Brisanje prodavnice')
      this.store.select(selectSelectedProdavnica).pipe(
        filter(prodavnica => !!prodavnica),
        take(1),
        tap(prodavnica => {
          console.log(prodavnica)
          this.store.dispatch(ProdavniceActions.deleteItem({ selectedProdavnicaID: prodavnica.id }))
          this.router.navigate(["ng"])
        })
      ).subscribe()
    }

    if (this.title.includes('Obriši proizvod')) {
      console.log('Brisanje proizvoda')
      this.store.select(selectSelectedProizvod).pipe(
        filter(proizvod => !!proizvod),
        take(1),
        tap(proizvod => {
          console.log(proizvod)
          this.store.dispatch(ProizvodiActions.deleteItem({ selectedProizvodID: proizvod.id }))
          this.router.navigate(["ng/prodavnica", proizvod.prodavnica.id])
        })
      ).subscribe()
    }
  }

}
