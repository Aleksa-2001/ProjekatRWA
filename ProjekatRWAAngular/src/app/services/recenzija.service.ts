import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Recenzija } from "../models/recenzija";

@Injectable({
    providedIn: 'root'
})
export class RecenzijaService {

    constructor(private httpClient: HttpClient) { }

    getRecenzije() {
        return this.httpClient
            .get<Recenzija[]>("http://localhost:3000/" + "recenzije")
            .pipe(catchError(errorHandler))
    }

    getRecenzijeByUserID(userID: number) {
        return this.httpClient
            .get<Recenzija[]>("http://localhost:3000/" + `recenzijeKorisnika/${userID}`)
            .pipe(catchError(errorHandler))
    }

    getRecenzijeByProdavnicaID(prodavnicaID: number) {
        return this.httpClient
            .get<Recenzija[]>("http://localhost:3000/" + `recenzijeProdavnice/${prodavnicaID}`)
            .pipe(catchError(errorHandler))
    }

    getRecenzijeByProizvodID(proizvodID: number) {
        return this.httpClient
            .get<Recenzija[]>("http://localhost:3000/" + `recenzijeProizvoda/${proizvodID}`)
            .pipe(catchError(errorHandler))
    }

    getRecenzijaByID(recenzijaID: number) {
        return this.httpClient
            .get<Recenzija>("http://localhost:3000/" + `recenzija/${recenzijaID}`)
            .pipe(catchError(errorHandler))
    }

    addRecenzija(recenzija: Recenzija) {
        const { id, ...recenzijaDto } = recenzija
        return this.httpClient
            .post<Recenzija>("http://localhost:3000/" + "recenzija", recenzijaDto)
            .pipe(catchError(errorHandler))
    }

    updateRecenzija(recenzijaID: number, recenzija: Partial<Recenzija>) {
        const { id, ...recenzijaDto } = recenzija
        return this.httpClient
            .put<Recenzija>("http://localhost:3000/" + `recenzija/${recenzijaID}`, recenzijaDto)
            .pipe(catchError(errorHandler))
    }

    deleteRecenzija(recenzijaID: number) {
        return this.httpClient
            .delete<number>("http://localhost:3000/" + `recenzija/${recenzijaID}`)
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
