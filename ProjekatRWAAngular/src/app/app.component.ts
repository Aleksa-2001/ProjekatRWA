import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { ToastComponent } from "./shared/components/toast/toast.component";
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
    ToastComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  windowScroll: number = 0

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => this.windowScroll = window.pageYOffset)

    const auth = localStorage.getItem('auth')
    if (auth) {
      const token = JSON.parse(auth).token as string | null
      if (token)
        this.store.dispatch(AuthActions.validateToken())
    }

    const cart = localStorage.getItem('cart')
    if (cart) {
      const artikli = JSON.parse(cart).artikli
      if (artikli.length)
        this.store.dispatch(CartActions.loadItems())
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

}
