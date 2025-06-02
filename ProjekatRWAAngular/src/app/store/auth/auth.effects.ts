import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../shared/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, filter, map, mergeMap, of, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { selectToken } from './auth.selectors';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { User } from './auth.reducer';

interface JwtPayload {
  sub: number;
  //admin: boolean;
  //firstName: string;
  //lastName: string;
  //email: string;
  //username: string;
}

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private store = inject(Store<AppState>)
  private router = inject(Router)

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) => 
        this.authService.login(username, password).pipe(
          switchMap((res) => {
            const payload: JwtPayload = jwtDecode(res.token)
            return this.authService.getUserByID(payload.sub).pipe(
              filter(user => !!user),
              take(1),
              map(user => 
                AuthActions.loginSuccess({
                  token: res.token,
                  expiresAt: res.expiresIn,
                  user: {
                    userID: user.userID,
                    admin: user.admin,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username
                  }
                })
              )
            )
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  )

  validateToken$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.validateToken),
      switchMap(({ token }) => {
        if (this.authService.isLoggedIn()) {
          const payload: JwtPayload = jwtDecode(token)
          return this.authService.getUserByID(payload.sub).pipe(
            filter(user => !!user),
            take(1),
            map(user => 
              AuthActions.tokenIsValid({
                user: {
                  userID: user.userID,
                  admin: user.admin,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  username: user.username
                }
              })
            ),
            catchError(() => {
              this.authService.logout();
              return of(AuthActions.tokenIsInvalid({ error: "Token Is Invalid" }));
            })
          )
        }
        else {
          this.authService.logout()
          return of(AuthActions.tokenIsInvalid({ error: "Token Is Invalid" }))
        }
      })
    )
  )

  storeToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token }) => {
          localStorage.setItem('token', token);
          this.router.navigate(["/"]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout()
          this.router.navigate(["/"]);
        })
      ),
    { dispatch: false }
  );

  getUserInfo$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(AuthActions.getUser),
        mergeMap(({ token }) => 
          this.authService.getProfile(token).pipe(
            map((user) => AuthActions.getUserSuccess({
              user: {
                userID: user.userID, 
                admin: user.admin, 
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username
              }
            })),
            catchError(() => of({ type: "[Auth] Get User Error" }))
          )
        )
      )
  )
}
