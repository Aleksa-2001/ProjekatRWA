import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../shared/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(UsersService);
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

  storeToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token, user }) => {
          localStorage.setItem('token', token);
          localStorage.setItem('userID', user.userID.toString());
          localStorage.setItem('firstName', user.firstName);
          localStorage.setItem('lastName', user.lastName);
          localStorage.setItem('email', user.email);
          localStorage.setItem('username', user.username);
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
          localStorage.removeItem('userID');
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
          localStorage.removeItem('email');
          localStorage.removeItem('username');
          this.router.navigate(["/"]);
        })
      ),
    { dispatch: false }
  );
}
