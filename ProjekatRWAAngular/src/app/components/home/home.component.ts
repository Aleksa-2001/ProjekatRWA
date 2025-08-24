import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SearchComponent } from "../search/search.component";
import { ProdavniceComponent } from "../prodavnice/prodavnice.component";
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { loadRecommendedItems } from '../../store/prodavnica/prodavnica.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [SearchComponent, ProdavniceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  appName = environment.appName

  constructor(private title: Title, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.title.setTitle(`Početna strana - ${this.appName}`)
    this.store.dispatch(loadRecommendedItems())
  }

}
