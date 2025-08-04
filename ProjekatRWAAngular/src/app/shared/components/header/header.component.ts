import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { isLoggedIn, selectUser } from '../../../store/auth/auth.selectors';
import { CommonModule, NgIf } from '@angular/common';
import { User } from '../../../models/user';
import { selectItemCount } from '../../../store/cart/cart.selectors';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  isLoggedIn$: Observable<boolean> = of()
  user$: Observable<User | null> = of()

  cartItemCount$: Observable<number> = of(0)
  
  constructor(private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.select(isLoggedIn)
    this.user$ = this.store.select(selectUser)

    this.cartItemCount$ = this.store.select(selectItemCount)
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }

}
