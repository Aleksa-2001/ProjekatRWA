import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions'
import { Observable, of, switchMap } from 'rxjs';
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
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null> = of(null);
  userID: number = -1;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    //this.user$ = this.store.select(selectUser)
  }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.userID = Number(localStorage.getItem('userID'))
        return this.store.select(selectUser)
      })
    )
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }

}
