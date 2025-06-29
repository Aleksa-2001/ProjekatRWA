import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProdavniceComponent } from "./prodavnice/prodavnice.component";
import { Title } from '@angular/platform-browser';
import { CommonModule, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { isAdmin } from '../../store/auth/auth.selectors';
import { SearchComponent } from "./search/search.component";
import { ProdavnicaDialogComponent } from "./dialog/prodavnica-dialog/prodavnica-dialog.component";
import { FilterComponent } from "./filter/filter.component";

import * as ProdavniceActions from '../../store/prodavnica/prodavnica.actions'
@Component({
  selector: 'app-angular',
  imports: [
    CommonModule,
    NgIf,
    ProdavniceComponent,
    SearchComponent,
    ProdavnicaDialogComponent,
    FilterComponent
  ],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent {

  isAdmin$: Observable<boolean> = of(false)

  brojProdavnica: number = 0

  selectedNaziviProdavnica: string[] = []

  constructor(private title: Title, private store: Store<AppState>) {
    this.isAdmin$ = this.store.select(isAdmin)
    this.title.setTitle("Angular - ProjekatRWA")

    this.store.dispatch(ProdavniceActions.loadItems())
  }
  
  getBrojProdavnica(brojProdavnica: number) {
    this.brojProdavnica = brojProdavnica
  }

  getSelectedNaziviProdavnica(selectedNaziviProdavnica: string[]) {
    this.selectedNaziviProdavnica = selectedNaziviProdavnica
  }

}
