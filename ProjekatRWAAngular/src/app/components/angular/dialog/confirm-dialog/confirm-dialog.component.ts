import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { filter, take, tap } from 'rxjs';
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent { 

  @Input() title!: string

  constructor(private store: Store<AppState>) { }

  obrisi() {
    if (this.title.includes('prodavnicu')) {
      console.log('Brisanje prodavnice')
      this.store.select(selectSelectedProdavnica).pipe(
        filter(prodavnica => !!prodavnica),
        take(1),
        tap(prodavnica => console.log(prodavnica))
      ).subscribe()
    }

    if (this.title.includes('proizvod')) {
      console.log('Brisanje proizvoda')
      this.store.select(selectSelectedProizvod).pipe(
        filter(proizvod => !!proizvod),
        take(1),
        tap(proizvod => console.log(proizvod))
      ).subscribe()
    }
  }

}
