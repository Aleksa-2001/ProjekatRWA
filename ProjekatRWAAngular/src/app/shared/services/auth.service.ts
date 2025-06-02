import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { User } from '../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

    login(username: string, password: string) {
        return this.httpClient
            .post<{ token: string, expiresIn: number }>("http://localhost:3000/" + "auth/login", { username, password })
            .pipe(
                tap(res => this.setSession(res)),
                catchError(errorHandler)
            )
    }

    private setSession(authResult: any) {
        const expiresAt = moment().add(authResult.expiresIn, 'second')

        localStorage.setItem('token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration!);
        return moment(expiresAt);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    


    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getProfile(token: string) {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return this.httpClient
            .get<User>("http://localhost:3000/" + "profile", requestOptions)
            .pipe(catchError(errorHandler))
    }

    getUserByID(userID: number) {
        return this.httpClient
            .get<User>("http://localhost:3000/" + `user/${userID}`)
            .pipe(catchError(errorHandler))
    }


}

const errorHandler = (error: HttpErrorResponse) => {
    const errorMessage =
        error.status === 0
            ? `Can't connect to API ${error.error}`
            : `Backend returned code ${error.status}`

    return throwError(errorMessage)
}
