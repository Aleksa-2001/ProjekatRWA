import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions'
import { Observable } from 'rxjs';
import { isAuthenticated, selectUser } from '../../../store/auth/auth.selectors';
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

  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }

}
