import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { Store } from '@ngrx/store';
import { AppState } from './store/app-state';
import { map, Observable, of } from 'rxjs';
import { selectToken, selectUser } from './store/auth/auth.selectors';
import * as AuthActions from './store/auth/auth.actions'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProjekatRWA';

  token$: Observable<string | null> = of()
  user$: Observable<any | null> = of()

  constructor(private store: Store<AppState>) {
    this.token$ = this.store.select(selectToken)
    this.token$.pipe(
      map((token) => {
        if (token) {
          this.store.dispatch(AuthActions.getUser({ token: token }))
          this.user$ = this.store.select(selectUser)
          console.log(this.user$)
        }
      })
    ).subscribe()
    //this.token$.subscribe(token => {
    //  if (token) {
    //    this.store.dispatch(AuthActions.getUser({ token: token }))
    //    console.log(token)
    //  }
    //  else console.log("Niste prijavljeni!")
    //})
  }
}
