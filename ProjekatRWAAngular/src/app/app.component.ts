import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { Store } from '@ngrx/store';
import { AppState } from './store/app-state';
import { map, Observable, of, take, takeUntil } from 'rxjs';
import { selectToken, selectUser } from './store/auth/auth.selectors';
import * as AuthActions from './store/auth/auth.actions'
import { CommonModule } from '@angular/common';
import { UsersService } from './shared/services/auth.service'

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
  title = 'ProjekatRWA';

  constructor(private store: Store<AppState>) {

    const token = localStorage.getItem('token')
    if (token)
      this.store.dispatch(AuthActions.validateToken({ token: token }))
    
  }
}
