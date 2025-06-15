import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { Store } from '@ngrx/store';
import { AppState } from './store/app-state';
import * as AuthActions from './store/auth/auth.actions'
import { CommonModule } from '@angular/common';

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
    const token = localStorage.getItem('token')
    if (token)
      this.store.dispatch(AuthActions.validateToken())

    window.addEventListener('scroll', () => this.windowScroll = window.pageYOffset)
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

}
