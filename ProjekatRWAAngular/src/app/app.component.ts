import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { Store } from '@ngrx/store';
import { AppState } from './store/app-state';
import { selectProdavnice } from './store/prodavnica/prodavnica.selectors';
import * as ProdavniceActions from './store/prodavnica/prodavnica.actions'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProjekatRWA';

  constructor (private store: Store<AppState>) { 
    this.store.dispatch(ProdavniceActions.loadItems())
  }
}
