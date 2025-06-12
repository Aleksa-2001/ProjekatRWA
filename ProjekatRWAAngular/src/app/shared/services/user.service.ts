import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { User } from "../../models/user";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getUserByID(userID: number) {
        return this.httpClient
            .get<User>("http://localhost:3000/" + `user/${userID}`)
            .pipe(catchError(errorHandler))
    }

    addUser(user: User) {
        const { userID, ...userDto } = user
        return this.httpClient
            .post<User>("http://localhost:3000/" + "user", userDto)
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
