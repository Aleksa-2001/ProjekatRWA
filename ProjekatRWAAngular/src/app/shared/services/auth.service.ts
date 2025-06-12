import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { User } from '../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

    login(username: string, password: string) {
        return this.httpClient
            .post<string>("http://localhost:3000/" + "auth/login", { username, password })
            .pipe(catchError(errorHandler))
    }

    validateToken() {
        return this.httpClient
            .get<User>("http://localhost:3000/" + "auth/validate")
            .pipe(catchError(errorHandler))
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

}

const errorHandler = (error: HttpErrorResponse) => {
    const errorMessage =
        error.status === 0
            ? `Can't connect to API ${error.error}`
            : `Backend returned code ${error.status}`

    return throwError(errorMessage)
}
