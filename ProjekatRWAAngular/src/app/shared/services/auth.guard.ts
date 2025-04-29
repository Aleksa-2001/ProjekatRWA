import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, of, take } from 'rxjs';
import { isAuthenticated, selectToken, selectUser } from '../../store/auth/auth.selectors';
import { UsersService } from './auth.service';
import { AppState } from '../../store/app-state';
import * as AuthActions from '../../store/auth/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      take(1),
      map((auth) => {
        if (auth) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      take(1),
      map((auth) => {
        if (auth) {
          return this.router.createUrlTree(['/']);
        }
        return true;
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        if (user.admin) {
          return true;
        }
        return this.router.createUrlTree(['/ng']);
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class ValidateGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router, private authService: UsersService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectToken).pipe(
      take(1),
      map((token) => {
        if (token) {
          if (this.authService.isValid(token))
            return this.authService.isValid(token)
          else {
            localStorage.removeItem('token')
            this.store.dispatch(AuthActions.tokenIsInvalid({ error: "Token Is Invalid" }))
            return this.router.createUrlTree(['/login']);
          } 
        }
        else {
          localStorage.removeItem('token')
          this.store.dispatch(AuthActions.tokenIsInvalid({ error: "Token Is Invalid" }))
          return this.router.createUrlTree(['/login']);
        } 
      })
    )
  }
}