import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent { 

  constructor(private title: Title, private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { 
    this.route.queryParams.pipe(
      take(1),
      tap((params) => {
        const query = params['q']
        this.title.setTitle(`Pretraga: \"${query}\" - ProjekatRWA`)
      })
    ).subscribe()

  }

}
