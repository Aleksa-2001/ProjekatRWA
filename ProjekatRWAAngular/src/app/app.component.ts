import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { Store } from '@ngrx/store';
import { AppState } from './store/app-state';
import { selectAllComponents } from './store/komponente.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ProjekatRWA';

  constructor (private store: Store<AppState>) { }

  ngOnInit(): void {
    //this.store.select(selectAllComponents)
  }
}
