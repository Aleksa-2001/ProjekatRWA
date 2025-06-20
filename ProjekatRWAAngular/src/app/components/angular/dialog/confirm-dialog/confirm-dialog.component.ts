import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { filter, take, tap } from 'rxjs';
import { selectUser } from '../../../../store/auth/auth.selectors';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';
import { Router } from '@angular/router';
import * as AuthActions from '../../../../store/auth/auth.actions'
import * as ProdavniceActions from '../../../../store/prodavnica/prodavnica.actions'
import * as ProizvodiActions from '../../../../store/proizvod/proizvod.actions'
import { selectSelectedRecenzija } from '../../../../store/recenzija/recenzija.selectors';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit { 

  @Input() modalID!: string
  @Input() delete!: string
  title: string = ""

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    switch (this.delete) {
      case 'User':
        this.title = 'Obriši nalog'
        break
      case 'Prodavnica':
        this.title = 'Obriši prodavnicu'
        break
      case 'Proizvod':
        this.title = 'Obriši proizvod'
        break
      case 'Proizvodi':
        this.title = 'Obriši sve proizvode'
        break
      case 'Recenzija':
        this.title = 'Obriši recenziju'
        break
    }
  }

  onDelete() {
    if (this.title.includes('Obriši nalog')) {
      this.store.select(selectUser).pipe(
        filter(user => !!user),
        take(1),
        tap(user => {
          this.store.dispatch(AuthActions.deleteUser({ userID: user.userID }))
        })
      ).subscribe()
    }

    if (this.title.includes('Obriši prodavnicu')) {
      this.store.select(selectSelectedProdavnica).pipe(
        filter(prodavnica => !!prodavnica),
        take(1),
        tap(prodavnica => {
          this.store.dispatch(ProdavniceActions.deleteItem({ selectedProdavnicaID: prodavnica.id }))
        })
      ).subscribe()
    }

    if (this.title.includes('Obriši proizvod')) {
      this.store.select(selectSelectedProizvod).pipe(
        filter(proizvod => !!proizvod),
        take(1),
        tap(proizvod => {
          this.store.dispatch(ProizvodiActions.deleteItem({ selectedProizvodID: proizvod.id }))
          this.router.navigate(["ng/prodavnica", proizvod.prodavnica.id])
        })
      ).subscribe()
    }

    if (this.title.includes('Obriši sve proizvode')) {
      this.store.select(selectSelectedProdavnica).pipe(
        filter(prodavnica => !!prodavnica),
        take(1),
        tap(prodavnica => {
          this.store.dispatch(ProizvodiActions.deleteAllItems({ prodavnicaID: prodavnica.id }))
        })
      ).subscribe()
    }

    if (this.title.includes('Obriši recenziju')) {
      console.log("Brisanje recenzije")
      //this.store.select(selectSelectedRecenzija).pipe(
      //  filter(recenzija => !!recenzija),
      //  take(1),
      //  tap(recenzija => {
      //    //this.store.dispatch(ProizvodiActions.deleteItem({ recenzijaID: recenzija.id }))
      //    console.log("Brisanje recenzije sa ID-jem ", recenzija.id)
      //  })
      //).subscribe()
    }
  }

}
