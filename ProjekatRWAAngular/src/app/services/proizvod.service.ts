import { Injectable } from '@angular/core';
import { Proizvod } from '../models/proizvod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { Racunar } from '../models/racunar';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProizvodService {

    constructor(private httpClient: HttpClient) { }

    // getProizvodi() {
    //   return this.httpClient
    //     .get<Proizvod[]>(environment.apiUrl + "proizvodi")
    //     .pipe(catchError(errorHandler))
    // }

    getProizvodi(prodavnicaID: number, type?: string) {
        return this.httpClient
            .get<Proizvod[]>(environment.apiUrl + `proizvodi/${prodavnicaID}` + (type ? `?type=${type}` : ''))
            .pipe(catchError(errorHandler))
    }

    getProizvodiBySearch(query: string) {
        return this.httpClient
            .get<Proizvod[]>(environment.apiUrl + `proizvodiSearch?query=${query}`)
            .pipe(catchError(errorHandler))
    }


    getProizvodByID(proizvodID: number) {
        return this.httpClient
            .get<Proizvod>(environment.apiUrl + `proizvod/${proizvodID}`)
            .pipe(catchError(errorHandler))
    }

    addProizvod(proizvod: Proizvod) {
        const { id, ...proizvodDto } = proizvod
        return this.httpClient
            .post<Proizvod>(environment.apiUrl + "proizvod", proizvodDto)
            .pipe(catchError(errorHandler))
    }

    updateProizvod(proizvodID: number, proizvod: Partial<Proizvod>) {
        const { id, ...proizvodDto } = proizvod
        return this.httpClient
            .put<Proizvod>(environment.apiUrl + `proizvod/${proizvodID}`, proizvodDto)
            .pipe(catchError(errorHandler))
    }

    updateRacunar(racunarID: number, racunar: Partial<Racunar>) {
        const { id, ...racunarDto } = racunar
        return this.httpClient
            .put<Racunar>(environment.apiUrl + `proizvodRacunar/${racunarID}`, racunarDto)
            .pipe(catchError(errorHandler))
    }

    deleteProizvod(proizvodID: number) {
        return this.httpClient
            .delete<{ proizvodID: number, prodavnicaID: number }>(environment.apiUrl + `proizvod/${proizvodID}`)
            .pipe(catchError(errorHandler))
    }

    deleteProizvodi(prodavnicaID: number) {
        return this.httpClient
            .delete<Proizvod[]>(environment.apiUrl + `proizvodi/${prodavnicaID}`)
            .pipe(catchError(errorHandler))
    }

    uploadImage(proizvodID: number, file?: FormData) {
        if (file) {
            return this.httpClient
                .post<{ proizvodID: number, path: string }>(environment.apiUrl + `proizvod/upload/${proizvodID}`, file)
                .pipe(catchError(errorHandler))
        }
        else {
            return of("Slika nije prosledjena")
        }
    }

}

const errorHandler = (error: HttpErrorResponse) => {
    const errorMessage =
        error.status === 0
            ? `Can't connect to API ${error.error}`
            : `Backend returned code ${error.status}`

    return throwError(errorMessage)
}
