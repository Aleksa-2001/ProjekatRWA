import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { isLoggedIn, selectUser } from '../../../store/auth/auth.selectors';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { User } from '../../../models/user';
import { selectTotalItemCount } from '../../../store/cart/cart.selectors';
import { SearchComponent } from "../../../components/search/search.component";
import { environment } from '../../../../environments/environment';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink, 
    NgIf, 
    NgClass, 
    CommonModule, 
    SearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  appName = environment.appName

  isLoggedIn$: Observable<boolean> = of()
  user$: Observable<User | null> = of()

  cartItemCount$: Observable<number> = of(0)
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(isLoggedIn)
    this.user$ = this.store.select(selectUser)
    this.cartItemCount$ = this.store.select(selectTotalItemCount)
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }

}
