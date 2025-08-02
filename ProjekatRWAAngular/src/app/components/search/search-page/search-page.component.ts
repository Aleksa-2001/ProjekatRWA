import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { loadItemsBySearch as loadProdavnice } from '../../../store/prodavnica/prodavnica.actions';
import { loadItemsBySearch as loadProizvodi } from '../../../store/proizvod/proizvod.actions';
import { SearchComponent } from '../search.component';
import { CommonModule, NgIf } from '@angular/common';
import { selectBrojProdavnica } from '../../../store/prodavnica/prodavnica.selectors';
import { selectBrojProizvoda } from '../../../store/proizvod/proizvod.selectors';
import { ItemListComponent } from "../../item-list/item-list.component";

@Component({
  selector: 'app-search-page',
  imports: [
    NgIf,
    CommonModule,
    SearchComponent,
    ItemListComponent
],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit { 

  query: string = ''
  
  data$: Observable<{ brojProdavnica: number, brojProizvoda: number }> = of()

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params) => {
        this.query = params['q']
        if (this.query) {
          this.title.setTitle(`Pretraga: \"${this.query}\" - ProjekatRWA`)
          this.store.dispatch(loadProdavnice({ search: this.query }))
          this.store.dispatch(loadProizvodi({ search: this.query }))

          this.data$ = combineLatest([
            this.store.select(selectBrojProdavnica), 
            this.store.select(selectBrojProizvoda)
          ]).pipe(
            map(([brojProdavnica, brojProizvoda]) => ({ brojProdavnica, brojProizvoda }))
          )
        }
        else {
          this.title.setTitle(`Pretraga - ProjekatRWA`)
        }
      })
    ).subscribe()
  }

}
