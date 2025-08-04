import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { Store } from '@ngrx/store';
import { AppState } from './store/app-state';
import { CommonModule } from '@angular/common';
import * as AuthActions from './store/auth/auth.actions'
import * as CartActions from "./store/cart/cart.actions"

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CommonModule, 
    HeaderComponent, 
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  windowScroll: number = 0

  constructor(private store: Store<AppState>) {
    this.store.dispatch(AuthActions.validateToken())
    this.store.dispatch(CartActions.loadItems())

    window.addEventListener('scroll', () => this.windowScroll = window.pageYOffset)
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

}
