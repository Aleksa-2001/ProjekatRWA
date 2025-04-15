import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient
      .post<{ access_token: string }>("http://localhost:3000/" + "auth/login", { username, password })
      .pipe(catchError(errorHandler))
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

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
}

const errorHandler = (error: HttpErrorResponse) => {
  const errorMessage = 
    error.status === 0
      ? `Can't connect to API ${error.error}`
      : `Backend returned code ${error.status}` 
  
  return throwError(errorMessage)
}
