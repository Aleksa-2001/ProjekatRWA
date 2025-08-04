import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    login(username: string, password: string) {
        return this.httpClient
            .post<string>(environment.apiUrl + "auth/login", { username, password })
            .pipe(catchError(errorHandler))
    }

    validateToken() {
        return this.httpClient
            .get<User>(environment.apiUrl + "auth/validate")
            .pipe(catchError(errorHandler))
    }

    logout() {
        localStorage.removeItem('auth')
    }

}

const errorHandler = (error: HttpErrorResponse) => {
    const errorMessage =
        error.status === 0
            ? `Can't connect to API ${error.error}`
            : `Backend returned code ${error.status}`

    return throwError(errorMessage)
}
