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

@Component({
  selector: 'app-angular',
  imports: [
    CommonModule,
    NgIf,
    ProdavniceComponent,
    ProdavnicaDialogComponent,
    FilterComponent
  ],
  templateUrl: './prodavnice-page.component.html',
  styleUrl: './prodavnice-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicePageComponent implements OnInit {

  @ViewChild('inputSearchProdavnice') inputSearchProdavnice!: ElementRef<HTMLInputElement>

  isAdmin$: Observable<boolean> = of(false)

  brojProdavnica: number = 0

  search: string = ''
  selectedNaziviProdavnica: string[] = []

  constructor(private title: Title, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(isAdmin)
    this.title.setTitle("Prodavnice - ProjekatRWA")

    this.store.dispatch(ProdavniceActions.loadItems())
  }
  
  onChangeInput() {
    this.search = this.inputSearchProdavnice.nativeElement.value
  }

  getBrojProdavnica(brojProdavnica: number) {
    this.brojProdavnica = brojProdavnica
  }

  getSelectedNaziviProdavnica(selectedNaziviProdavnica: string[]) {
    this.selectedNaziviProdavnica = selectedNaziviProdavnica
  }

}
