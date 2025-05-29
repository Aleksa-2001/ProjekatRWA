import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { tap } from 'rxjs';
import { ProizvodiComponent } from "../../proizvodi/proizvodi.component";
import { ProdavniceComponent } from "../../prodavnice/prodavnice.component";
import { loadItemsBySearch as loadProdavnice } from '../../../../store/prodavnica/prodavnica.actions';
import { loadItemsBySearch as loadProizvodi } from '../../../../store/proizvod/proizvod.actions';
import { SearchComponent } from '../search.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [NgIf, CommonModule, ProdavniceComponent, ProizvodiComponent, SearchComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit { 

  query: string = ''
  brojProdavnica: number = 0
  brojProizvoda: number = 0

  constructor(private title: Title, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params) => {
        this.query = params['q']
        if (this.query) {
          this.title.setTitle(`Pretraga: \"${this.query}\" - ProjekatRWA`)
          this.store.dispatch(loadProdavnice({ search: this.query }))
          this.store.dispatch(loadProizvodi({ search: this.query }))
        }
        else {
          this.title.setTitle(`Pretraga - ProjekatRWA`)
        }
      })
    ).subscribe()
  }

  getBrojProdavnica(brojProdavnica: number) {
    this.brojProdavnica = brojProdavnica
  }

  getBrojProizvoda(brojProizvoda: number) {
    this.brojProizvoda = brojProizvoda
  }
}
