import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions'
import { Observable, of } from 'rxjs';
import { isLoggedIn, selectUser } from '../../../store/auth/auth.selectors';
import { CommonModule, NgIf } from '@angular/common';
import { User } from '../../../models/user';

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
  
  constructor(private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.select(isLoggedIn)
    this.user$ = this.store.select(selectUser)
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }

}
