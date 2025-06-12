import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { isAuthenticated } from '../../store/auth/auth.selectors';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.store.select(isAuthenticated).pipe(
            map((auth) => auth ? true : this.router.createUrlTree(['/login']))
        )
    }
}

@Injectable({
    providedIn: 'root',
})
export class AuthRedirectGuard implements CanActivate {
    constructor(private store: Store, private router: Router) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.store.select(isAuthenticated).pipe(
            map((auth) => auth ? this.router.createUrlTree(['/login']) : true)
        )
    }
}
