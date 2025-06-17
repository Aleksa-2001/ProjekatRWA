import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: number;
}

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions)
    private authService = inject(AuthService)
    private userService = inject(UserService)
    private router = inject(Router)

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(({ username, password }) =>
                this.authService.login(username, password).pipe(
                    map((token) => {
                        localStorage.setItem('token', token)
                        this.router.navigate(['/'])
                        return AuthActions.loginSuccess({ token })
                    }),
                    catchError((error) => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    })

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            mergeMap(({ token }) => {
                const payload: JwtPayload = jwtDecode(token)
                return this.userService.getUserByID(payload.sub).pipe(
                    map((user) => (AuthActions.getUserSuccess({ user }))),
                    catchError(() => of({ type: "[Auth] Get User Error" }))
                )
            })
        )
    })

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.register),
            mergeMap(({ user }) => this.userService.addUser(user).pipe(
                map((user) => {
                    console.log(user)
                    this.router.navigate(['/login'])
                    return AuthActions.registerSuccess()
                }),
                catchError((error) => of(AuthActions.registerFailure({ error })))
            ))
        )
    })

    validateToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.validateToken),
            mergeMap(() => this.authService.validateToken().pipe(
                map((user) =>
                    user ? AuthActions.tokenIsValid({ user }) : AuthActions.tokenIsInvalid()
                ),
                catchError(() => of(AuthActions.tokenIsInvalid()))
            ))
        )
    })

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logout, AuthActions.tokenIsInvalid),
            mergeMap(() => {
                this.authService.logout()
                this.router.navigate(['/'])
                return of({ type: "[Auth] Logout Completed" })
            })
        )
    })

    updateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.updateUser),
            mergeMap(({ userID, user }) => this.userService.updateUser(userID, user).pipe(
                map((user) => AuthActions.updateUserSuccess({ user: { id: user.userID, changes: user }})),
                catchError(() => of({ type: "[Auth] Update User Error" }))
            ))
        )
    })

    changePassword$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.changePassword),
            mergeMap(({ userID, data }) => this.userService.changePassword(userID, data).pipe(
                map(() => {
                    this.authService.logout()
                    this.router.navigate(['/login'])
                    return AuthActions.changePasswordSuccess()
                }),
                catchError(() => of({ type: "[Auth] Change Password Error" }))
            ))
        )
    })

    deleteUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.deleteUser),
            mergeMap(({ userID }) => this.userService.deleteUser(userID).pipe(
                map((userID) => {
                    this.authService.logout()
                    this.router.navigate(['/'])
                    return AuthActions.deleteUserSuccess({ userID })
                }),
                catchError(() => of({ type: "[Auth] Delete User Error" }))
            ))
        )
    })

}
