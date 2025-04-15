import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../shared/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: number;
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
            return AuthActions.loginSuccess({ token: res.access_token, user: { id: payload.sub, username: payload.username } })
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
          localStorage.setItem('userID', user.id.toString());
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
          localStorage.removeItem('username');
          this.router.navigate(["/"]);
        })
      ),
    { dispatch: false }
  );
}
