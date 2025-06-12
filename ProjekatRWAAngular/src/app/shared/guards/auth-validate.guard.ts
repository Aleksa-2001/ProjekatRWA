import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app-state";
import { AuthService } from "../services/auth.service";
import { catchError, map, Observable, of } from "rxjs";
import * as AuthActions from "../../store/auth/auth.actions"

@Injectable({
    providedIn: 'root',
})
export class ValidateGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router, private authService: AuthService) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.authService.validateToken().pipe(
            map((user) => {
                if (user) return true
                else {
                    this.store.dispatch(AuthActions.tokenIsInvalid())
                    return this.router.createUrlTree(['/login'])
                }
            }),
            catchError(() => {
                this.store.dispatch(AuthActions.tokenIsInvalid())
                return of(this.router.createUrlTree(['/login']))
            })
        )
    }
}