import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { hideToast, showToast } from '../toast/toast.actions';
import * as AuthActions from './auth.actions';

interface JwtPayload {
    sub: number
    admin: boolean
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
                        localStorage.setItem('auth', JSON.stringify({ token }))
                        this.router.navigate(['/'])
                        return AuthActions.loginSuccess({ token })
                    }),
                    catchError((error) => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    })

    loginSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            map(({ token }) => {
                const payload: JwtPayload = jwtDecode(token)
                return showToast({ poruka: `Uspešno ste se prijavili! ${payload.admin ? 'Prijavljeni ste kao Administrator': ''}`, tipPoruke: 'success' })
            })
        )
    })

    loginRegisterFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginFailure, AuthActions.registerFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return hideToast()
            })
        )
    })

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            mergeMap(({ token }) => {
                const payload: JwtPayload = jwtDecode(token)
                return this.userService.getUserByID(payload.sub).pipe(
                    map((user) => (AuthActions.getUserSuccess({ user }))),
                    catchError((error) => of(AuthActions.getUserFailure({ error })))
                )
            })
        )
    })

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.register),
            mergeMap(({ user }) => this.userService.addUser(user).pipe(
                map((user) => {
                    this.router.navigate(['/login'])
                    return AuthActions.registerSuccess()
                }),
                catchError((error) => of(AuthActions.registerFailure({ error })))
            ))
        )
    })

    registerSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.registerSuccess),
            map(() => showToast({ poruka: 'Uspešno ste se registrovali!', tipPoruke: 'success' }))
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
            map(({ type }) => {
                this.authService.logout()
                this.router.navigate(['/'])
                if (type.includes("Token")) return showToast({ poruka: "Vaša sesija je istekla! Molimo Vas da se ponovo prijavite", tipPoruke: 'warning' })
                else return showToast({ poruka: "Više niste prijavljeni!", tipPoruke: 'warning' })
            })
        )
    })

    updateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.updateUser),
            mergeMap(({ userID, user }) => this.userService.updateUser(userID, user).pipe(
                map((user) => AuthActions.updateUserSuccess({ user: { id: user.userID, changes: user }})),
                catchError((error) => of(AuthActions.updateUserFailure({ error })))
            ))
        )
    })
    
    updateUserSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.updateUserSuccess),
            map(() => showToast({ poruka: 'Podaci su uspešno izmenjeni!', tipPoruke: 'success' }))
        )
    })

    updateUserFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.updateUserFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri izmeni podataka', tipPoruke: 'danger' })
            })
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
                catchError((error) => of(AuthActions.changePasswordFailure({ error })))
            ))
        )
    })

    changePasswordSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.changePasswordSuccess),
            map(() => showToast({ poruka: 'Lozinka je uspešno promenjena! Molimo Vas da se ponovo prijavite', tipPoruke: 'warning' }))
        )
    })

    changePasswordFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.changePasswordFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('401')) return showToast({ poruka: 'Pogrešna lozinka', tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri promeni lozinke', tipPoruke: 'danger' })
            })
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
                catchError((error) => of(AuthActions.deleteUserFailure({ error })))
            ))
        )
    })

    deleteUserSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.deleteUserSuccess),
            map(() => showToast({ poruka: 'Nalog je uspešno obrisan', tipPoruke: 'warning' }))
        )
    })
    
    deleteUserFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.deleteUserFailure),
            map(({ error }) => {
                if ((error as string).includes('API')) return showToast({ poruka: `Nije uspelo povezivanje sa serverom - ${error}`, tipPoruke: 'danger' })
                else if ((error as string).includes('500')) return showToast({ poruka: `Serverska greška - ${error}`, tipPoruke: 'danger' })
                else return showToast({ poruka: 'Greška pri brisanju naloga', tipPoruke: 'danger' })
            })
        )
    })
    
}
