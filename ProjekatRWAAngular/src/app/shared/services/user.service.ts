import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { User } from "../../models/user";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getUserByID(korisnikID: number) {
        return this.httpClient
            .get<User>("http://localhost:3000/" + `user/${korisnikID}`)
            .pipe(catchError(errorHandler))
    }

    addUser(user: User) {
        const { userID, ...userDto } = user
        return this.httpClient
            .post<User>("http://localhost:3000/" + "user", userDto)
            .pipe(catchError(errorHandler))
    }

    updateUser(korisnikID: number, user: Partial<User>) {
        const { userID, ...userDto } = user
        return this.httpClient
            .put<User>("http://localhost:3000/" + `user/${korisnikID}`, userDto)
            .pipe(catchError(errorHandler))
    }

    changePassword(korisnikID: number, data: { password: string, newPassword: string }) {
        return this.httpClient
            .put<User>("http://localhost:3000/" + `changePassword/${korisnikID}`, data)
            .pipe(catchError(errorHandler))
    }

    deleteUser(korisnikID: number) {
        return this.httpClient
            .delete<number>("http://localhost:3000/" + `user/${korisnikID}`)
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
