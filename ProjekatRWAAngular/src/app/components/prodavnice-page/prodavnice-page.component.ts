import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProdavniceComponent } from "../prodavnice/prodavnice.component";
import { Title } from '@angular/platform-browser';
import { CommonModule, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { isAdmin } from '../../store/auth/auth.selectors';
import { ProdavnicaDialogComponent } from "../dialog/prodavnica-dialog/prodavnica-dialog.component";
import { FilterComponent } from "../filter/filter.component";
import * as ProdavniceActions from '../../store/prodavnica/prodavnica.actions';
import { selectBrojProdavnica, selectError, selectLoading } from '../../store/prodavnica/prodavnica.selectors';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-angular',
  imports: [
    CommonModule,
    NgIf,
    ProdavniceComponent,
    ProdavnicaDialogComponent,
    FilterComponent,
    LoadingComponent
],
  templateUrl: './prodavnice-page.component.html',
  styleUrl: './prodavnice-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicePageComponent implements OnInit {

  loading$: Observable<boolean> = of(true)
  error$: Observable<any> = of()

  @ViewChild('inputSearchProdavnice') inputSearchProdavnice!: ElementRef<HTMLInputElement>

  isAdmin$: Observable<boolean> = of(false)

  brojProdavnica$: Observable<number> = of(0)

  search: string = ''
  selectedNaziviProdavnica: string[] = []

  constructor(private title: Title, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.error$ = this.store.select(selectError)

    this.isAdmin$ = this.store.select(isAdmin)
    this.title.setTitle("Prodavnice - ProjekatRWA")

    this.store.dispatch(ProdavniceActions.loadItems())

    this.brojProdavnica$ = this.store.select(selectBrojProdavnica)
  }
  
  onChangeInput() {
    this.search = this.inputSearchProdavnice.nativeElement.value
  }

  //getBrojProdavnica(brojProdavnica: number) {
    //this.brojProdavnica = brojProdavnica
  //}

  getSelectedNaziviProdavnica(selectedNaziviProdavnica: string[]) {
    this.selectedNaziviProdavnica = selectedNaziviProdavnica
  }

}
