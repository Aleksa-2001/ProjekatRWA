import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../shared/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { selectToken } from './auth.selectors';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';

interface JwtPayload {
  sub: number;
  admin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(UsersService);
  private store = inject(Store<AppState>)
  private router = inject(Router)

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((res) => {
            const payload: JwtPayload = jwtDecode(res.access_token)
            return AuthActions.loginSuccess({ 
              token: res.access_token, 
              user: { 
                userID: payload.sub, 
                admin: payload.admin, 
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                username: payload.username 
              } 
            })
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  validateToken$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.validateToken),
      map(({ token }) => {
        if (this.authService.isValid(token)) {
          const payload: JwtPayload = jwtDecode(token)
          return AuthActions.tokenIsValid({
            user: { 
              userID: payload.sub, 
              admin: payload.admin, 
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
              username: payload.username 
            }
        })}
        else {
          localStorage.removeItem('token')
          return AuthActions.tokenIsInvalid({
            error: "Token Is Invalid"
          })
        }
      }),
      catchError(() => of({ type: "Validate Token Error" }))
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
          localStorage.removeItem('token');
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
            catchError(() => of({ type: "Get User Error" }))
          )
        )
      )
  )
}
