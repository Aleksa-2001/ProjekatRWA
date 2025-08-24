import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app-state";
import { filter, map, Observable, take } from "rxjs";
import { selectUser } from "../../store/auth/auth.selectors";

@Injectable({
    providedIn: 'root',
})
export class RolesGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.store.select(selectUser).pipe(
            filter(user => !!user),
            take(1),
            map((user) => 
                user.admin ? true : this.router.createUrlTree([''])
            )
        )
    }
}
