import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { isAuthenticated } from '../../store/auth/auth.selectors';

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